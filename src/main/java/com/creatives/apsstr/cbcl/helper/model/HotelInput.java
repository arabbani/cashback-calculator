package com.creatives.apsstr.cbcl.helper.model;

/**
 * @author Arif Rabbani
 * 
 *         Calculate cashback input model for HOTEL
 */
public class HotelInput extends CommonTravelInput {

    private Long hotelTypeId;

    public Long getHotelTypeId() {
        return hotelTypeId;
    }

    public void setHotelTypeId(Long hotelTypeId) {
        this.hotelTypeId = hotelTypeId;
    }

    @Override
    public String toString() {
        return "HotelInput [hotelTypeId=" + hotelTypeId + ", getSubCategoryId()=" + getSubCategoryId()
                + ", getDateTime()=" + getDateTime() + ", getExpense()=" + getExpense() + ", getActiveDate()="
                + getActiveDate() + ", getActiveDay()=" + getActiveDay() + ", getMerchantIds()=" + getMerchantIds()
                + "]";
    }

}