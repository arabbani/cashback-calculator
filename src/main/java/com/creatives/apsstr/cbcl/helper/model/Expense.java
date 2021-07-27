package com.creatives.apsstr.cbcl.helper.model;

/**
 * @author Arif Rabbani
 * 
 *         Calculate cashback input model for EXPENSE
 */
public class Expense {

	private Integer expense;
	private Integer minimumExpense;
	private Integer maximumExpense;

	public Integer getExpense() {
		return expense;
	}

	public void setExpense(Integer expense) {
		this.expense = expense;
	}

	public Integer getMinimumExpense() {
		return minimumExpense;
	}

	public void setMinimumExpense(Integer minimumExpense) {
		this.minimumExpense = minimumExpense;
	}

	public Integer getMaximumExpense() {
		return maximumExpense;
	}

	public void setMaximumExpense(Integer maximumExpense) {
		this.maximumExpense = maximumExpense;
	}

	@Override
	public String toString() {
		return "Expense [expense=" + expense + ", minimumExpense=" + minimumExpense + ", maximumExpense="
				+ maximumExpense + "]";
	}

}
