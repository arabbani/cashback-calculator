package com.creatives.apsstr.cbcl.helper;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.stereotype.Component;

import com.creatives.apsstr.cbcl.domain.Offer;
import com.creatives.apsstr.cbcl.domain.OfferReturn;
import com.creatives.apsstr.cbcl.domain.ReturnInfo;
import com.creatives.apsstr.cbcl.helper.model.Benefit;
import com.creatives.apsstr.cbcl.helper.model.CashbackInfo;
import com.creatives.apsstr.cbcl.helper.model.CompoundBenefit;
import com.creatives.apsstr.cbcl.helper.model.OfferBenefit;

/**
 * @author Arif Rabbani
 *
 *         Cashback Calculator Algo
 */
@Component
public class CashbackCalculatorAlgo {

	private Map<Long, OfferBenefit> calculatedOfferBenefits;

	private List<CashbackInfo> cashbackInfos;

	private Integer applyPriceBound(Integer minimumReturn, Integer maximumReturn, Integer amount) {
		if (minimumReturn != null && amount < minimumReturn) {
			return minimumReturn;
		} else if (maximumReturn != null && amount > maximumReturn) {
			return maximumReturn;
		}
		return amount;
	}

	/**
	 * process offerReturn To generate benefit
	 *
	 * @return benefit corresponding to the offerReturn
	 */
	private Benefit calculateCashback(OfferReturn offerReturn, Integer expense) {
		Benefit benefit = new Benefit();
		benefit.setOfferReturnId(offerReturn.getId());
		String returnMode = offerReturn.getMode().getName();
		Integer amount = offerReturn.getAmount();
		Integer minimumReturn = offerReturn.getMinimumReturn();
		Integer maximumReturn = offerReturn.getMaximumReturn();
		Integer minimumReturnAmount = 0;
		Integer maximumReturnAmount = 0;

		if (returnMode.equalsIgnoreCase("FLAT")) {
			maximumReturnAmount = amount;
		} else {
			maximumReturnAmount = expense * amount / 100;
		}
		maximumReturnAmount = applyPriceBound(minimumReturn, maximumReturn, maximumReturnAmount);
		if (offerReturn.isExact()) {
			minimumReturnAmount = maximumReturnAmount;
		} else {
			minimumReturnAmount = minimumReturn != null ? minimumReturn : 0;
		}

		benefit.setMinimumReturn(minimumReturnAmount);
		benefit.setMaximumReturn(maximumReturnAmount);

		return benefit;
	}

	/**
	 * process returnInfos To calculate cashback
	 *
	 * @return offerBenefit corresponding to the returnInfos
	 */
	private OfferBenefit process(Set<ReturnInfo> returnInfos, Long offerId, Integer expense) {
		OfferBenefit offerBenefit = new OfferBenefit();
		offerBenefit.setOfferId(offerId);

		returnInfos.forEach(returnInfo -> {
			Set<OfferReturn> offerReturns = returnInfo.getOfferReturns();
			CompoundBenefit compoundBenefit = new CompoundBenefit();
			Map<Long, OfferBenefit> returnOfferBenefits = new HashMap<>();
			compoundBenefit.setReturnInfoId(returnInfo.getId());
			Integer minimumReturnAmount = 0;
			Integer maximumReturnAmount = 0;
			Iterator<OfferReturn> offerReturnsIterator = offerReturns.iterator();

			while (offerReturnsIterator.hasNext()) {
				OfferReturn offerReturn = offerReturnsIterator.next();
				String returnType = offerReturn.getType().getName();

				if (returnType.equalsIgnoreCase("CASHBACK") || returnType.equalsIgnoreCase("DISCOUNT")) {
					Benefit benefit = calculateCashback(offerReturn, expense);
					minimumReturnAmount += benefit.getMinimumReturn();
					maximumReturnAmount += benefit.getMaximumReturn();
					compoundBenefit.addBenefit(benefit);
				} else if (returnType.equalsIgnoreCase("OFFER")) {
					boolean calculated = false;
					Offer returnOffer = offerReturn.getReturnOffer();
					if (calculatedOfferBenefits.containsKey(returnOffer.getId())) {
						calculated = true;
						returnOfferBenefits.put(offerReturn.getId(), calculatedOfferBenefits.get(returnOffer.getId()));
					}
					if (!calculated) {
						returnOfferBenefits.put(offerReturn.getId(),
								process(returnOffer.getReturnInfos(), returnOffer.getId(), expense));
					}
				} else if (returnType.equalsIgnoreCase("RIDE")) {

				}
			}

			Integer minimumReturn = returnInfo.getMinimumReturn();
			Integer maximumReturn = returnInfo.getMaximumReturn();
			minimumReturnAmount = applyPriceBound(minimumReturn, maximumReturn, minimumReturnAmount);
			maximumReturnAmount = applyPriceBound(minimumReturn, maximumReturn, maximumReturnAmount);
			compoundBenefit.setMinimumReturn(minimumReturnAmount);
			compoundBenefit.setMaximumReturn(maximumReturnAmount);

			if (returnOfferBenefits.size() > 0) {
				List<CompoundBenefit> compoundBenefits = new LinkedList<>();
				compoundBenefits.add(compoundBenefit);

				returnOfferBenefits.forEach((offerReturnId, returnOfferBenefit) -> {
					List<CompoundBenefit> mergedCompoundBenefits = new LinkedList<>(compoundBenefits);
					compoundBenefits.clear();

					Set<CompoundBenefit> returnOfferCompoundBenefits = returnOfferBenefit.getCompoundBenefits();
					returnOfferCompoundBenefits.forEach(returnOfferCompoundBenefit -> {
						mergedCompoundBenefits.forEach(mergedCompoundBenefit -> {
							CompoundBenefit cB = mergedCompoundBenefit.copy();
							Integer minReturn = returnOfferCompoundBenefit.getMinimumReturn();
							Integer maxReturn = returnOfferCompoundBenefit.getMaximumReturn();
							Benefit benefit = new Benefit();
							benefit.setOfferReturnId(offerReturnId);
							benefit.setMinimumReturn(minReturn);
							benefit.setMaximumReturn(maxReturn);
							cB.addBenefit(benefit);
							cB.setMinimumReturn(cB.getMinimumReturn() + minReturn);
							cB.setMaximumReturn(cB.getMaximumReturn() + maxReturn);
							compoundBenefits.add(cB);
						});
					});
				});

				compoundBenefits.forEach(combinedCompoundBenefit -> {
					offerBenefit.addCompoundBenefit(combinedCompoundBenefit);
				});

			} else {
				offerBenefit.addCompoundBenefit(compoundBenefit);
			}
		});

		calculatedOfferBenefits.put(offerId, offerBenefit);

		return offerBenefit;
	}

	private boolean isAlreadyCalculated(Offer offer) {
		return cashbackInfos.parallelStream().anyMatch(cashbackInfo -> {
			return cashbackInfo.getOffer().getId() == offer.getId();
		});
	}
	
	/**
	 * Calculate cashback for offers bound by provided criteria.
	 *
	 * @return the list of cashbackResults
	 */
	public List<CashbackInfo> calculate(List<Offer> offers, Integer expense) {
		calculatedOfferBenefits = new HashMap<>();
		cashbackInfos = new ArrayList<>();
		offers.forEach(offer -> {
			CashbackInfo cashbackInfo = new CashbackInfo();
			cashbackInfo.setOffer(offer);			
			if (calculatedOfferBenefits.containsKey(offer.getId())) {
				cashbackInfo.setOfferBenefit(calculatedOfferBenefits.get(offer.getId()));
			} else {
				cashbackInfo.setOfferBenefit(process(offer.getReturnInfos(), offer.getId(), expense));
			}
			cashbackInfos.add(cashbackInfo);
		});

		/*
		 * cashbackInfos.sort(new Comparator<CashbackInfo>(){
		 * public int compare(CashbackInfo cashbackResult1,
		 * CashbackInfo cashbackResult2){ int result = 0; for
		 * (CompoundBenefit compoundBenefit1 :
		 * cashbackResult1.getOfferBenefit().getCompoundBenefits()) {
		 * for(CompoundBenefit compoundBenefit2 :
		 * cashbackResult2.getOfferBenefit().getCompoundBenefits()) {
		 * if(compoundBenefit1.getMaximumReturn() < compoundBenefit2.getMaximumReturn())
		 * { result = -1; break; } else if(compoundBenefit1.getMaximumReturn() >
		 * compoundBenefit2.getMaximumReturn()) { result = 1; } else
		 * if(compoundBenefit1.getMaximumReturn() ==
		 * compoundBenefit2.getMaximumReturn()) { if(compoundBenefit1.getMinimumReturn()
		 * > compoundBenefit2.getMinimumReturn()) { result = 1; } else if
		 * (compoundBenefit1.getMinimumReturn() < compoundBenefit2.getMinimumReturn()) {
		 * result = -1; break; } } } } return result; } });
		 */

		return cashbackInfos;
	}

}
