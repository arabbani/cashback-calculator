package com.creatives.apsstr.cbcl.helper.model;

import java.util.Arrays;

/**
 * @author Arif Rabbani
 * 
 *         Calculate cashback input model for CAB
 */
public class CabInput extends CommonTravelInput {

	private Long cityId;
	private Long serviceProvidersId[];

	public Long getCityId() {
		return cityId;
	}

	public void setCityId(Long cityId) {
		this.cityId = cityId;
	}

	public Long[] getServiceProvidersId() {
		return serviceProvidersId;
	}

	public void setServiceProvidersId(Long[] serviceProvidersId) {
		this.serviceProvidersId = serviceProvidersId;
	}

	@Override
	public String toString() {
		return "CabInput [cityId=" + cityId + ", serviceProvidersId=" + Arrays.toString(serviceProvidersId)
				+ ", getSubCategoryId()=" + getSubCategoryId() + ", getDateTime()=" + getDateTime() + ", getExpense()="
				+ getExpense() + ", getActiveDate()=" + getActiveDate() + ", getActiveDay()=" + getActiveDay()
				+ ", getMerchantIds()=" + getMerchantIds() + "]";
	}

}
