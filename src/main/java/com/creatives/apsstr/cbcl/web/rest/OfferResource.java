package com.creatives.apsstr.cbcl.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.creatives.apsstr.cbcl.domain.Offer;
import com.creatives.apsstr.cbcl.helper.projections.OfferForReference;
import com.creatives.apsstr.cbcl.service.OfferService;
import com.creatives.apsstr.cbcl.web.rest.errors.BadRequestAlertException;
import com.creatives.apsstr.cbcl.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Offer.
 */
@RestController
@RequestMapping("/api")
public class OfferResource {

    private final Logger log = LoggerFactory.getLogger(OfferResource.class);

    private static final String ENTITY_NAME = "offer";

    private final OfferService offerService;

    public OfferResource(OfferService offerService) {
        this.offerService = offerService;
    }

    /**
     * POST  /offers : Create a new offer.
     *
     * @param offer the offer to create
     * @return the ResponseEntity with status 201 (Created) and with body the new offer, or with status 400 (Bad Request) if the offer has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/offers")
    @Timed
    public ResponseEntity<Offer> createOffer(@Valid @RequestBody Offer offer) throws URISyntaxException {
        log.debug("REST request to save Offer : {}", offer);
        if (offer.getId() != null) {
            throw new BadRequestAlertException("A new offer cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Offer result = offerService.save(offer);
        return ResponseEntity.created(new URI("/api/offers/" + result.getId()))
                .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString())).body(result);
    }

    /**
     * PUT  /offers : Updates an existing offer.
     *
     * @param offer the offer to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated offer,
     * or with status 400 (Bad Request) if the offer is not valid,
     * or with status 500 (Internal Server Error) if the offer couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/offers")
    @Timed
    public ResponseEntity<Offer> updateOffer(@Valid @RequestBody Offer offer) throws URISyntaxException {
        log.debug("REST request to update Offer : {}", offer);
        if (offer.getId() == null) {
            return createOffer(offer);
        }
        Offer result = offerService.save(offer);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, offer.getId().toString()))
                .body(result);
    }

    /**
     * GET  /offers : get all the offers.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of offers in body
     */
    @GetMapping("/offers")
    @Timed
    public List<Offer> getAllOffers() {
        log.debug("REST request to get all Offers");
        return offerService.findAll();
    }

    /**
     * GET  /offers/for/reference-exclude/:id : get offers for reference except "id" offer.
     *
     * @param id the id of the offer to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the offer, or with status 404 (Not Found)
     */
    @GetMapping("/offers/for/reference-exclude/{id}")
    @Timed
    public List<OfferForReference> getOffersForReferenceExclusive(@PathVariable Long id) {
        log.debug("REST request to get offers for reference except : {}", id);
        return offerService.findForReferenceExclusive(id);
    }

    /**
     * GET  /offers/for/reference : get offers for reference.
     *
     * @param id the id of the offer to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the offer, or with status 404 (Not Found)
     */
    @GetMapping("/offers/for/reference")
    @Timed
    public List<OfferForReference> getOffersForReference() {
        log.debug("REST request to get offers for reference");
        return offerService.findForReference();
    }

    /**
     * GET  /offers/:id : get the "id" offer.
     *
     * @param id the id of the offer to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the offer, or with status 404 (Not Found)
     */
    @GetMapping("/offers/{id}")
    @Timed
    public ResponseEntity<Offer> getOffer(@PathVariable Long id) {
        log.debug("REST request to get Offer : {}", id);
        Offer offer = offerService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(offer));
    }

    /**
     * GET  /offers/with/rechargeInfo/:id : get the "id" offer with rechargeInfo.
     *
     * @param id the id of the offer to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the offer, or with status 404 (Not Found)
     */
    @GetMapping("/offers/with/rechargeInfo/{id}")
    @Timed
    public ResponseEntity<Offer> getOfferWithRechargeInfo(@PathVariable Long id) {
        log.debug("REST request to get Offer  with rechargeInfo: {}", id);
        Offer offer = offerService.findWithRechargeInfo(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(offer));
    }

    /**
     * GET  /offers/with/flightInfo/:id : get the "id" offer with flightInfo.
     *
     * @param id the id of the offer to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the offer, or with status 404 (Not Found)
     */
    @GetMapping("/offers/with/flightInfo/{id}")
    @Timed
    public ResponseEntity<Offer> getOfferWithFlightInfo(@PathVariable Long id) {
        log.debug("REST request to get Offer  with flightInfo: {}", id);
        Offer offer = offerService.findWithFlightInfo(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(offer));
    }

    /**
     * GET  /offers/with/busInfo/:id : get the "id" offer with busInfo.
     *
     * @param id the id of the offer to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the offer, or with status 404 (Not Found)
     */
    @GetMapping("/offers/with/busInfo/{id}")
    @Timed
    public ResponseEntity<Offer> getOfferWithBusInfo(@PathVariable Long id) {
        log.debug("REST request to get Offer  with busInfo: {}", id);
        Offer offer = offerService.findWithBusInfo(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(offer));
    }

    /**
     * GET  /offers/for/admin-view/:id : get the "id" offer for admin view.
     *
     * @param id the id of the offer to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the offer, or with status 404 (Not Found)
     */
    @GetMapping("/offers/for/admin-view/{id}")
    @Timed
    public ResponseEntity<Offer> getOfferForAdminView(@PathVariable Long id) {
        log.debug("REST request to get Offer  for admin view: {}", id);
        Offer offer = offerService.findOneForAdminView(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(offer));
    }

    /**
     * DELETE  /offers/:id : delete the "id" offer.
     *
     * @param id the id of the offer to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/offers/{id}")
    @Timed
    public ResponseEntity<Void> deleteOffer(@PathVariable Long id) {
        log.debug("REST request to delete Offer : {}", id);
        offerService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
