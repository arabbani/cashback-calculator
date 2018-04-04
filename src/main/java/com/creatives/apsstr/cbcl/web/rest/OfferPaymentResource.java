package com.creatives.apsstr.cbcl.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.creatives.apsstr.cbcl.domain.OfferPayment;

import com.creatives.apsstr.cbcl.repository.OfferPaymentRepository;
import com.creatives.apsstr.cbcl.security.AuthoritiesConstants;
import com.creatives.apsstr.cbcl.web.rest.errors.BadRequestAlertException;
import com.creatives.apsstr.cbcl.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing OfferPayment.
 */
@RestController
@RequestMapping("/api")
@Secured(AuthoritiesConstants.ADMIN)
public class OfferPaymentResource {

    private final Logger log = LoggerFactory.getLogger(OfferPaymentResource.class);

    private static final String ENTITY_NAME = "offerPayment";

    private final OfferPaymentRepository offerPaymentRepository;

    public OfferPaymentResource(OfferPaymentRepository offerPaymentRepository) {
        this.offerPaymentRepository = offerPaymentRepository;
    }

    /**
     * POST  /offer-payments : Create a new offerPayment.
     *
     * @param offerPayment the offerPayment to create
     * @return the ResponseEntity with status 201 (Created) and with body the new offerPayment, or with status 400 (Bad Request) if the offerPayment has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/offer-payments")
    @Timed
    public ResponseEntity<OfferPayment> createOfferPayment(@RequestBody OfferPayment offerPayment)
            throws URISyntaxException {
        log.debug("REST request to save OfferPayment : {}", offerPayment);
        if (offerPayment.getId() != null) {
            throw new BadRequestAlertException("A new offerPayment cannot already have an ID", ENTITY_NAME, "idexists");
        }
        OfferPayment result = offerPaymentRepository.save(offerPayment);
        return ResponseEntity.created(new URI("/api/offer-payments/" + result.getId()))
                .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString())).body(result);
    }

    /**
     * PUT  /offer-payments : Updates an existing offerPayment.
     *
     * @param offerPayment the offerPayment to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated offerPayment,
     * or with status 400 (Bad Request) if the offerPayment is not valid,
     * or with status 500 (Internal Server Error) if the offerPayment couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/offer-payments")
    @Timed
    public ResponseEntity<OfferPayment> updateOfferPayment(@RequestBody OfferPayment offerPayment)
            throws URISyntaxException {
        log.debug("REST request to update OfferPayment : {}", offerPayment);
        if (offerPayment.getId() == null) {
            return createOfferPayment(offerPayment);
        }
        OfferPayment result = offerPaymentRepository.save(offerPayment);
        return ResponseEntity.ok()
                .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, offerPayment.getId().toString())).body(result);
    }

    /**
     * GET  /offer-payments : get all the offerPayments.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of offerPayments in body
     */
    @GetMapping("/offer-payments")
    @Timed
    public List<OfferPayment> getAllOfferPayments() {
        log.debug("REST request to get all OfferPayments");
        return offerPaymentRepository.findAllWithEagerRelationships();
    }

    /**
     * GET  /offer-payments/:id : get the "id" offerPayment.
     *
     * @param id the id of the offerPayment to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the offerPayment, or with status 404 (Not Found)
     */
    @GetMapping("/offer-payments/{id}")
    @Timed
    public ResponseEntity<OfferPayment> getOfferPayment(@PathVariable Long id) {
        log.debug("REST request to get OfferPayment : {}", id);
        OfferPayment offerPayment = offerPaymentRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(offerPayment));
    }

    /**
     * DELETE  /offer-payments/:id : delete the "id" offerPayment.
     *
     * @param id the id of the offerPayment to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/offer-payments/{id}")
    @Timed
    public ResponseEntity<Void> deleteOfferPayment(@PathVariable Long id) {
        log.debug("REST request to delete OfferPayment : {}", id);
        offerPaymentRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
