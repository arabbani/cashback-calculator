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

	private Integer minimum;

	private Integer maximum;

	private Set<Benefit> benefits = new HashSet<>();

	public Long getOfferReturnId() {
		return offerReturnId;
	}

	public void setOfferReturnId(Long offerReturnId) {
		this.offerReturnId = offerReturnId;
	}

	public Integer getMinimum() {
		return minimum;
	}

	public void setMinimum(Integer minimum) {
		this.minimum = minimum;
	}

	public Integer getMaximum() {
		return maximum;
	}

	public void setMaximum(Integer maximum) {
		this.maximum = maximum;
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
		compoundBenefit.setMinimum(this.minimum);
		compoundBenefit.setMaximum(this.maximum);
		this.benefits.forEach(benefit -> {
			compoundBenefit.addBenefit(benefit);
		});
		return compoundBenefit;
	}

}
