package com.creatives.apsstr.cbcl.helper.model;

/**
 * @author Arif Rabbani
 * 
 *         Calculate cashback input model for FLIGHT
 */
public class FlightInput extends CommonInput {

    private Long travelTypeId;
    private Long flightClassId;
    private Long flightOriginId;
    private Long flightTypeId;

    /**
     * @return the travelTypeId
     */
    public Long getTravelTypeId() {
        return travelTypeId;
    }

    /**
     * @param travelTypeId the travelTypeId to set
     */
    public void setTravelTypeId(Long travelTypeId) {
        this.travelTypeId = travelTypeId;
    }

    /**
     * @return the flightClassId
     */
    public Long getFlightClassId() {
        return flightClassId;
    }

    /**
     * @param flightClassId the flightClassId to set
     */
    public void setFlightClassId(Long flightClassId) {
        this.flightClassId = flightClassId;
    }

    /**
     * @return the originId
     */
    public Long getFlightOriginId() {
        return flightOriginId;
    }

    /**
     * @param originId the originId to set
     */
    public void setFlightOriginId(Long flightOriginId) {
        this.flightOriginId = flightOriginId;
    }

    /**
     * @return the flightTypeId
     */
    public Long getFlightTypeId() {
        return flightTypeId;
    }

    /**
     * @param flightTypeId the flightTypeId to set
     */
    public void setFlightTypeId(Long flightTypeId) {
        this.flightTypeId = flightTypeId;
    }

    @Override
    public String toString() {
        return "FlightInput [travelTypeId()=" + travelTypeId + ", flightClassId()=" + flightClassId + ", flightOriginId()="
                + flightOriginId + ", flightTypeId()=" + flightTypeId + ", getSubCategoryId()=" + getSubCategoryId()
                + ", getDateTime()=" + getDateTime() + ", getExpense()=" + getExpense() + "]";
    }

}
