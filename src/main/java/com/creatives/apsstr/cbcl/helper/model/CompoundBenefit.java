package com.creatives.apsstr.cbcl.helper.model;

import java.util.HashSet;
import java.util.Set;

/**
 * @author Arif Rabbani
 *
 *         Cashback data corresponding to ReturnInfo
 */
public class CompoundBenefit {

	private Long offerReturnId;

	private Integer minimumReturn;

	private Integer maximumReturn;

	private Set<Benefit> benefits = new HashSet<>();

	public Long getOfferReturnId() {
		return offerReturnId;
	}

	public void setOfferReturnId(Long offerReturnId) {
		this.offerReturnId = offerReturnId;
	}

	public Integer getMinimumReturn() {
		return minimumReturn;
	}

	public void setMinimumReturn(Integer minimumReturn) {
		this.minimumReturn = minimumReturn;
	}

	public Integer getMaximumReturn() {
		return maximumReturn;
	}

	public void setMaximumReturn(Integer maximumReturn) {
		this.maximumReturn = maximumReturn;
	}

	public Set<Benefit> getBenefits() {
		return benefits;
	}

	public void setBenefits(Set<Benefit> benefits) {
		this.benefits = benefits;
	}
	
	public void addBenefit(Benefit benefit) {
		this.benefits.add(benefit);
	}
	
	public CompoundBenefit copy() {
		CompoundBenefit compoundBenefit = new CompoundBenefit();
		compoundBenefit.setOfferReturnId(this.offerReturnId);
		compoundBenefit.setMinimumReturn(this.minimumReturn);
		compoundBenefit.setMaximumReturn(this.maximumReturn);
		this.benefits.forEach(benefit -> {
			compoundBenefit.addBenefit(benefit);
		});
		return compoundBenefit;
	}

}
