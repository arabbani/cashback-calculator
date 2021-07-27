package com.creatives.apsstr.cbcl.helper.model;

import java.util.HashSet;
import java.util.Set;

/**
 * @author Arif Rabbani
 *
 *         Cashback data corresponding to each Offer
 */
public class OfferBenefit {
	
	private Long offerId;
	
	private Set<CompoundBenefit> compoundBenefits = new HashSet<>();

	public Long getOfferId() {
		return offerId;
	}

	public void setOfferId(Long offerId) {
		this.offerId = offerId;
	}

	public Set<CompoundBenefit> getCompoundBenefits() {
		return compoundBenefits;
	}

	public void setCompoundBenefits(Set<CompoundBenefit> compoundBenefits) {
		this.compoundBenefits = compoundBenefits;
	}
	
	public void addCompoundBenefit(CompoundBenefit compoundBenefit) {
        this.compoundBenefits.add(compoundBenefit);
    }

}
