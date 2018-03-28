package com.creatives.apsstr.cbcl.helper.model;

/**
 * @author Arif Rabbani
 * 
 *         Calculate cashback input model for DTH
 */
public class DthInput extends CommonReechargeInput {

	@Override
	public String toString() {
		return "DthInput [getServiceProviderId()=" + getServiceProviderId() + ", getSubCategoryId()="
				+ getSubCategoryId() + ", getDateTime()=" + getDateTime() + ", getExpense()=" + getExpense()
				+ ", getActiveDate()=" + getActiveDate() + ", getActiveDay()=" + getActiveDay() + "]";
	}

}
