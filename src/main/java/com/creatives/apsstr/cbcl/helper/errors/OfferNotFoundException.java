package com.creatives.apsstr.cbcl.helper.errors;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NO_CONTENT, reason = "NO OFFER")
public class OfferNotFoundException extends RuntimeException {

	public OfferNotFoundException(String message) {
		super(message);
		// TODO Auto-generated constructor stub
	}

}
