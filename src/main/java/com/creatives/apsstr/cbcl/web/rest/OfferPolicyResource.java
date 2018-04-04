package com.creatives.apsstr.cbcl.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.creatives.apsstr.cbcl.domain.OfferPolicy;
import com.creatives.apsstr.cbcl.security.AuthoritiesConstants;
import com.creatives.apsstr.cbcl.service.OfferPolicyService;
import com.creatives.apsstr.cbcl.web.rest.errors.BadRequestAlertException;
import com.creatives.apsstr.cbcl.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing OfferPolicy.
 */
@RestController
@RequestMapping("/api")
@Secured(AuthoritiesConstants.ADMIN)
public class OfferPolicyResource {

    private final Logger log = LoggerFactory.getLogger(OfferPolicyResource.class);

    private static final String ENTITY_NAME = "offerPolicy";

    private final OfferPolicyService offerPolicyService;

    public OfferPolicyResource(OfferPolicyService offerPolicyService) {
        this.offerPolicyService = offerPolicyService;
    }

    /**
     * POST  /offer-policies : Create a new offerPolicy.
     *
     * @param offerPolicy the offerPolicy to create
     * @return the ResponseEntity with status 201 (Created) and with body the new offerPolicy, or with status 400 (Bad Request) if the offerPolicy has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/offer-policies")
    @Timed
    public ResponseEntity<OfferPolicy> createOfferPolicy(@Valid @RequestBody OfferPolicy offerPolicy)
            throws URISyntaxException {
        log.debug("REST request to save OfferPolicy : {}", offerPolicy);
        if (offerPolicy.getId() != null) {
            throw new BadRequestAlertException("A new offerPolicy cannot already have an ID", ENTITY_NAME, "idexists");
        }
        OfferPolicy result = offerPolicyService.save(offerPolicy);
        return ResponseEntity.created(new URI("/api/offer-policies/" + result.getId()))
                .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString())).body(result);
    }

    /**
     * PUT  /offer-policies : Updates an existing offerPolicy.
     *
     * @param offerPolicy the offerPolicy to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated offerPolicy,
     * or with status 400 (Bad Request) if the offerPolicy is not valid,
     * or with status 500 (Internal Server Error) if the offerPolicy couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/offer-policies")
    @Timed
    public ResponseEntity<OfferPolicy> updateOfferPolicy(@Valid @RequestBody OfferPolicy offerPolicy)
            throws URISyntaxException {
        log.debug("REST request to update OfferPolicy : {}", offerPolicy);
        if (offerPolicy.getId() == null) {
            return createOfferPolicy(offerPolicy);
        }
        OfferPolicy result = offerPolicyService.save(offerPolicy);
        return ResponseEntity.ok()
                .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, offerPolicy.getId().toString())).body(result);
    }

    /**
     * GET  /offer-policies : get all the offerPolicies.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of offerPolicies in body
     */
    @GetMapping("/offer-policies")
    @Timed
    public List<OfferPolicy> getAllOfferPolicies() {
        log.debug("REST request to get all OfferPolicies");
        return offerPolicyService.findAll();
    }

    /**
     * GET  /offer-policies/:id : get the "id" offerPolicy.
     *
     * @param id the id of the offerPolicy to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the offerPolicy, or with status 404 (Not Found)
     */
    @GetMapping("/offer-policies/{id}")
    @Timed
    public ResponseEntity<OfferPolicy> getOfferPolicy(@PathVariable Long id) {
        log.debug("REST request to get OfferPolicy : {}", id);
        OfferPolicy offerPolicy = offerPolicyService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(offerPolicy));
    }

    /**
     * DELETE  /offer-policies/:id : delete the "id" offerPolicy.
     *
     * @param id the id of the offerPolicy to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/offer-policies/{id}")
    @Timed
    public ResponseEntity<Void> deleteOfferPolicy(@PathVariable Long id) {
        log.debug("REST request to delete OfferPolicy : {}", id);
        offerPolicyService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
