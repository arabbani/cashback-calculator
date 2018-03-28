package com.creatives.apsstr.cbcl.helper.model;

/**
 * @author Arif Rabbani
 * 
 *         Calculate cashback input model common inputs
 */
public class CommonInput {

	private Long subCategoryId;
	private String dateTime;
	private Expense expense;
	private Integer activeDate;
	private String activeDay;

	public Long getSubCategoryId() {
		return subCategoryId;
	}

	public void setSubCategoryId(Long subCategoryId) {
		this.subCategoryId = subCategoryId;
	}

	public String getDateTime() {
		return dateTime;
	}

	public void setDateTime(String dateTime) {
		this.dateTime = dateTime;
	}

	public Expense getExpense() {
		return expense;
	}

	public void setExpense(Expense expense) {
		this.expense = expense;
	}

	public Integer getActiveDate() {
		return activeDate;
	}

	public void setActiveDate(Integer activeDate) {
		this.activeDate = activeDate;
	}

	public String getActiveDay() {
		return activeDay;
	}

	public void setActiveDay(String activeDay) {
		this.activeDay = activeDay;
	}

}
