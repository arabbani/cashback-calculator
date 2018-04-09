package com.creatives.apsstr.cbcl.helper.model;

/**
 * @author Arif Rabbani
 * 
 *         Calculate cashback input model for ELECTRICITY
 */
public class ElectricityInput extends CommonRechargeInput {

	@Override
	public String toString() {
		return "ElectricityInput [getServiceProviderId()=" + getServiceProviderId() + ", getSubCategoryId()="
				+ getSubCategoryId() + ", getDateTime()=" + getDateTime() + ", getExpense()=" + getExpense()
				+ ", getActiveDate()=" + getActiveDate() + ", getActiveDay()=" + getActiveDay() + ", getMerchantIds()="
				+ getMerchantIds() + "]";
	}

}
