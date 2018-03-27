package com.creatives.apsstr.cbcl.helper;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import com.creatives.apsstr.cbcl.domain.MainReturn;
import com.creatives.apsstr.cbcl.domain.Offer;
import com.creatives.apsstr.cbcl.domain.ReturnInfo;
import com.creatives.apsstr.cbcl.helper.constants.ReturnTypeConstants;
import com.creatives.apsstr.cbcl.helper.model.Benefit;
import com.creatives.apsstr.cbcl.helper.model.CashbackInfo;
import com.creatives.apsstr.cbcl.helper.model.CompoundBenefit;
import com.creatives.apsstr.cbcl.helper.model.Expense;
import com.creatives.apsstr.cbcl.helper.model.OfferBenefit;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
public class CashbackCalculatorAlgoVersionTwo {

	private List<CashbackInfo> cashbackInfos;

	private final Logger log = LoggerFactory.getLogger(CashbackCalculatorAlgoVersionTwo.class);

	/**
	 * Bound the price within minimumReturn and maximumReturn
	 *
	 */
	private Integer applyPriceBound(Integer minimumReturn, Integer maximumReturn, Integer amount) {
		if (minimumReturn != null && amount < minimumReturn) {
			return minimumReturn;
		} else if (maximumReturn != null && amount > maximumReturn) {
			return maximumReturn;
		}
		return amount;
	}

	/**
	 * Check if the price lies within minimumExpense and maximumExpense
	 *
	 */
	private boolean checkPriceBound(Integer minimumExpense, Integer maximumExpense, Expense expense) {
		if (minimumExpense != null || maximumExpense != null) {
			int ex = expense.getExpense();
			if (ex > 0) {
				if (minimumExpense != null && ex < minimumExpense) {
					return false;
				} else if (maximumExpense != null && ex > maximumExpense) {
					return false;
				}
				return true;
			} else {
				if (minimumExpense != null && expense.getMinimumExpense() < minimumExpense) {
					return false;
				} else if (maximumExpense != null && expense.getMaximumExpense() > maximumExpense) {
					return false;
				}
				return true;
			}
		}
		return true;
	}

	/**
	 * process returnInfo To generate benefit
	 *
	 * @return benefit corresponding to the returnInfo
	 */
	private Benefit calculateCashback(ReturnInfo returnInfo, Expense expense) {
		Benefit benefit = new Benefit();
		benefit.setReturnInfoId(returnInfo.getId());
		MainReturn mainReturn = returnInfo.getMainReturn();
		String returnMode = mainReturn.getMode().getName();
		Integer amount = mainReturn.getAmount();
		Integer minimumReturn = returnInfo.getExtras().getMinimumReturn();
		Integer maximumReturn = returnInfo.getExtras().getMaximumReturn();
		Integer minimumReturnAmount = 0;
		Integer maximumReturnAmount = 0;
		if (returnMode.equalsIgnoreCase("FLAT")) {
			maximumReturnAmount = amount;
		} else {
			maximumReturnAmount = expense.getExpense() * amount / 100;
		}
		maximumReturnAmount = applyPriceBound(minimumReturn, maximumReturn, maximumReturnAmount);
		if (mainReturn.isExact()) {
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
	private OfferBenefit processOffer(Offer offer, Expense expense) {
		OfferBenefit offerBenefit = new OfferBenefit();
		offerBenefit.setOfferId(offer.getId());
		// Iterate over the offerReturns of the offer
		offer.getOfferReturns().forEach(offerReturn -> {
			if (checkPriceBound(offerReturn.getExtras().getMinimumExpense(), offerReturn.getExtras().getMaximumExpense(), expense)) {
				boolean exist = false;
				// For each offerReturns, creates a corresponding CompoundBenefit
				CompoundBenefit compoundBenefit = new CompoundBenefit();
				compoundBenefit.setOfferReturnId(offerReturn.getId());
				Integer minimumReturnAmount = 0;
				Integer maximumReturnAmount = 0;
				Set<ReturnInfo> returnInfos = offerReturn.getReturnInfos();
				Map<Long, OfferBenefit> benefits = new HashMap<>();
				Iterator<ReturnInfo> returnInfosIterator = returnInfos.iterator();
				// Iterates over the list of returnInfos for this offerReturn
				while (returnInfosIterator.hasNext()) {
					ReturnInfo returnInfo = returnInfosIterator.next();
					if (checkPriceBound(returnInfo.getExtras().getMinimumExpense(), returnInfo.getExtras().getMaximumExpense(), expense)) {
						exist = true;
						String returnType = returnInfo.getType().getName();
						if (returnType.equalsIgnoreCase(ReturnTypeConstants.CASHBACK)
								|| returnType.equalsIgnoreCase(ReturnTypeConstants.DISCOUNT)) {
							Benefit benefit = calculateCashback(returnInfo, expense);
							minimumReturnAmount += benefit.getMinimumReturn();
							maximumReturnAmount += benefit.getMaximumReturn();
							compoundBenefit.addBenefit(benefit);
						} else if (returnType.equalsIgnoreCase(ReturnTypeConstants.OFFER)) {
							Offer returnOffer = returnInfo.getReturnOffer();
							if (!alreadyCalculated(returnOffer.getId(), false)) {
								OfferBenefit ob = processOffer(returnOffer, expense);
								benefits.put(returnOffer.getId(), ob);
								createCashbackInfo(returnOffer, ob, true);
							} else {
								CashbackInfo cashbackInfo = cashbackInfos.stream().filter(cbInfo -> {
									return cbInfo.getOffer().getId() == returnOffer.getId();
								}).collect(Collectors.toList()).get(0);
								benefits.put(returnInfo.getId(), cashbackInfo.getOfferBenefit());
							}
						} else if (returnType.equalsIgnoreCase(ReturnTypeConstants.RIDE)) {

						}
					}
				}
				if (exist) {
					Integer minimumReturn = offerReturn.getExtras().getMinimumReturn();
					Integer maximumReturn = offerReturn.getExtras().getMaximumReturn();
					minimumReturnAmount = applyPriceBound(minimumReturn, maximumReturn, minimumReturnAmount);
					maximumReturnAmount = applyPriceBound(minimumReturn, maximumReturn, maximumReturnAmount);
					compoundBenefit.setMinimumReturn(minimumReturnAmount);
					compoundBenefit.setMaximumReturn(maximumReturnAmount);
					// If benefits list contains data, then there is offer return type
					// Extract each CompoundBenefit of each returnOffer, and construct normalized
					// compoundBenefits for this offer
					if (benefits.size() > 0) {
						List<CompoundBenefit> compoundBenefits = new LinkedList<>();
						compoundBenefits.add(compoundBenefit);
						benefits.forEach((offerReturnId, returnOfferBenefit) -> {
							List<CompoundBenefit> mergedCompoundBenefits = new LinkedList<>(compoundBenefits);
							compoundBenefits.clear();
							Set<CompoundBenefit> returnOfferCompoundBenefits = returnOfferBenefit.getCompoundBenefits();
							returnOfferCompoundBenefits.forEach(returnOfferCompoundBenefit -> {
								mergedCompoundBenefits.forEach(mergedCompoundBenefit -> {
									CompoundBenefit cB = mergedCompoundBenefit.copy();
									Integer minReturn = returnOfferCompoundBenefit.getMinimumReturn();
									Integer maxReturn = returnOfferCompoundBenefit.getMaximumReturn();
									Benefit benefit = new Benefit();
									benefit.setReturnInfoId(offerReturnId);
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
				}
			}

		});
		return offerBenefit;
	}

	/**
	 * Check whether this offer is already calculated. If the offer is in the
	 * cashback offer list, then sets 'dummy; to 'false'
	 *
	 * @return TRUE or FALSE
	 */
	private boolean alreadyCalculated(Long offerId, boolean adjustDummy) {
		return cashbackInfos.stream().anyMatch(cashbackInfo -> {
			if (cashbackInfo.getOffer().getId() == offerId) {
				if (adjustDummy) {
					cashbackInfo.setDummy(false);
				}
				return true;
			}
			return false;
		});
	}

	/**
	 * Create CashbackInfo for the corresponding offer.
	 */
	private void createCashbackInfo(Offer offer, OfferBenefit offerBenefit, boolean dummy) {
		CashbackInfo cashbackInfo = new CashbackInfo();
		cashbackInfo.setOffer(offer);
		cashbackInfo.setOfferBenefit(offerBenefit);
		cashbackInfo.setDummy(dummy);
		cashbackInfos.add(cashbackInfo);
	}

	/**
	 * Calculate cashback for offers bound by provided criteria.
	 *
	 * @return the list of cashbackResults
	 */
	public List<CashbackInfo> calculate(List<Offer> offers, Expense expense) {
		cashbackInfos = new ArrayList<>();
		offers.forEach(offer -> {
			if (!alreadyCalculated(offer.getId(), true)) {
				OfferBenefit ob = processOffer(offer, expense);
				if (ob.getCompoundBenefits().size() > 0) {
					createCashbackInfo(offer, ob, false);
				}
			}
		});
		return cashbackInfos;
	}

}
