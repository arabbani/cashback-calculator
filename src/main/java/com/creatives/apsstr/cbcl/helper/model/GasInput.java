package com.creatives.apsstr.cbcl.helper.model;

/**
 * @author Arif Rabbani
 * 
 *         Calculate cashback input model for GAS
 */
public class GasInput extends CommonReechargeInput {

	@Override
	public String toString() {
		return "GasInput [getServiceProviderId()=" + getServiceProviderId() + ", getSubCategoryId()="
				+ getSubCategoryId() + ", getDateTime()=" + getDateTime() + ", getExpense()=" + getExpense()
				+ ", getActiveDate()=" + getActiveDate() + ", getActiveDay()=" + getActiveDay() + "]";
	}

}
