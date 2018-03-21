package com.creatives.apsstr.cbcl.helper.model;

import com.creatives.apsstr.cbcl.domain.Offer;

/**
 * @author Arif Rabbani
 * 
 *         Cashback data containing Offer and corresponding OfferBenefit
 */
public class CashbackInfo {

	private Offer offer;

	private OfferBenefit offerBenefit;

	private boolean dummy = false;

	public Offer getOffer() {
		return offer;
	}

	public void setOffer(Offer offer) {
		this.offer = offer;
	}

	public OfferBenefit getOfferBenefit() {
		return offerBenefit;
	}

	public void setOfferBenefit(OfferBenefit offerBenefit) {
		this.offerBenefit = offerBenefit;
	}

	public boolean isDummy() {
		return dummy;
	}

	public void setDummy(boolean dummy) {
		this.dummy = dummy;
	}

}
