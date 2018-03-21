package com.creatives.apsstr.cbcl.helper.model;

/**
 * @author Arif Rabbani
 * 
 *         Calculate cashback input model for ELECTRICITY
 */
public class ElectricityInput extends CommonInput {

	@Override
	public String toString() {
		return "ElectricityInput [getSubCategoryId()=" + getSubCategoryId() + ", getServiceProviderId()="
				+ getServiceProviderId() + ", getCityId()=" + getCityId() + ", getStateId()=" + getStateId()
				+ ", getCountryId()=" + getCountryId() + ", getDateTime()=" + getDateTime() + ", getExpense()="
				+ getExpense() + "]";
	}

}
