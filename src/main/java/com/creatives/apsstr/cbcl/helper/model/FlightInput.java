package com.creatives.apsstr.cbcl.helper.model;

/**
 * @author Arif Rabbani
 * 
 *         Calculate cashback input model for FLIGHT
 */
public class FlightInput extends CommonTravelInput {

	private Long travelTypeId;
	private Long flightClassId;
	private Long flightOriginId;
	private Long flightTypeId;

	public Long getTravelTypeId() {
		return travelTypeId;
	}

	public void setTravelTypeId(Long travelTypeId) {
		this.travelTypeId = travelTypeId;
	}

	public Long getFlightClassId() {
		return flightClassId;
	}

	public void setFlightClassId(Long flightClassId) {
		this.flightClassId = flightClassId;
	}

	public Long getFlightOriginId() {
		return flightOriginId;
	}

	public void setFlightOriginId(Long flightOriginId) {
		this.flightOriginId = flightOriginId;
	}

	public Long getFlightTypeId() {
		return flightTypeId;
	}

	public void setFlightTypeId(Long flightTypeId) {
		this.flightTypeId = flightTypeId;
	}

	@Override
	public String toString() {
		return "FlightInput [travelTypeId=" + travelTypeId + ", flightClassId=" + flightClassId + ", flightOriginId="
				+ flightOriginId + ", flightTypeId=" + flightTypeId + ", getSubCategoryId()=" + getSubCategoryId()
				+ ", getDateTime()=" + getDateTime() + ", getExpense()=" + getExpense() + ", getActiveDate()="
				+ getActiveDate() + ", getActiveDay()=" + getActiveDay() + ", getMerchantIds()=" + getMerchantIds()
				+ "]";
	}

}
