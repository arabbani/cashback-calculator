package com.creatives.apsstr.cbcl.helper.model;

/**
 * @author Arif Rabbani
 * 
 *         Calculate cashback input model for LANDLINE
 */
public class LandlineInput extends CommonRechargeInput {

	@Override
	public String toString() {
		return "LandlineInput [getServiceProviderId()=" + getServiceProviderId() + ", getSubCategoryId()="
				+ getSubCategoryId() + ", getDateTime()=" + getDateTime() + ", getExpense()=" + getExpense()
				+ ", getActiveDate()=" + getActiveDate() + ", getActiveDay()=" + getActiveDay() + ", getMerchantIds()="
				+ getMerchantIds() + "]";
	}

}
