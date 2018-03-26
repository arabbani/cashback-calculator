package com.creatives.apsstr.cbcl.helper.model;

/**
 * @author Arif Rabbani
 * 
 *         Calculate cashback input model for DATACARD
 */
public class DatacardInput extends CommonInput {

	private Long circleId;
	private Long reechargePlaneTypeId;

	/**
	 * @return the circleId
	 */
	public Long getCircleId() {
		return circleId;
	}

	/**
	 * @param circleId the circleId to set
	 */
	public void setCircleId(Long circleId) {
		this.circleId = circleId;
	}

	/**
	 * @return the reechargePlaneTypeId
	 */
	public Long getReechargePlaneTypeId() {
		return reechargePlaneTypeId;
	}

	/**
	 * @param reechargePlaneTypeId the reechargePlaneTypeId to set
	 */
	public void setReechargePlaneTypeId(Long reechargePlaneTypeId) {
		this.reechargePlaneTypeId = reechargePlaneTypeId;
	}

	@Override
	public String toString() {
		return "DatacardInput [circleId=" + circleId + ", reechargePlaneTypeId()=" + reechargePlaneTypeId
				+ ", getSubCategoryId()=" + getSubCategoryId() + ", getServiceProviderId()=" + getServiceProviderId()
				+ ", getDateTime()=" + getDateTime() + ", getExpense()=" + getExpense()
				+ "]";
	}

}
