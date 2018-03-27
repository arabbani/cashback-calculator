package com.creatives.apsstr.cbcl.helper.model;

/**
 * @author Arif Rabbani
 * 
 *         Calculate cashback input model for CAB
 */
public class CabInput extends CommonTravelInput {

    private Long cityId;

    public Long getCityId() {
        return cityId;
    }

    public void setCityId(Long cityId) {
        this.cityId = cityId;
    }

    @Override
    public String toString() {
        return "CabInput [cityId()=" + cityId + ", getServiceProviderId()=" + getServiceProviderId()
                + ", getSubCategoryId()=" + getSubCategoryId() + ", getDateTime()=" + getDateTime() + ", getExpense()="
                + getExpense() + "]";
    }

}
