package com.creatives.apsstr.cbcl.helper.model;

/**
 * @author Arif Rabbani
 * 
 *         Calculate cashback input model for BUS
 */
public class BusInput extends CommonTravelInput {

    private Long from;
    private Long to;

    public Long getFrom() {
        return from;
    }

    public void setFrom(Long from) {
        this.from = from;
    }

    public Long getTo() {
        return to;
    }

    public void setTo(Long to) {
        this.to = to;
    }

	@Override
	public String toString() {
		return "BusInput [from=" + from + ", to=" + to + ", getSubCategoryId()=" + getSubCategoryId()
				+ ", getDateTime()=" + getDateTime() + ", getExpense()=" + getExpense() + ", getActiveDate()="
				+ getActiveDate() + ", getActiveDay()=" + getActiveDay() + "]";
	}

    

}
