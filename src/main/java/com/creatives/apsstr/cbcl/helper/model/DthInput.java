package com.creatives.apsstr.cbcl.helper.model;

/**
 * @author Arif Rabbani
 * 
 *         Calculate cashback input model for DTH
 */
public class DthInput extends CommonInput {

	@Override
	public String toString() {
		return "DthInput [getSubCategoryId()=" + getSubCategoryId() + ", getServiceProviderId()="
				+ getServiceProviderId() + ", getCityId()=" + getCityId() + ", getStateId()=" + getStateId()
				+ ", getCountryId()=" + getCountryId() + ", getDateTime()=" + getDateTime() + ", getExpense()="
				+ getExpense() + "]";
	}

}
