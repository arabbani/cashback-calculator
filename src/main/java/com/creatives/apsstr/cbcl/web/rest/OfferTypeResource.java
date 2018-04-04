package com.creatives.apsstr.cbcl.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.creatives.apsstr.cbcl.domain.OfferType;
import com.creatives.apsstr.cbcl.security.AuthoritiesConstants;
import com.creatives.apsstr.cbcl.service.OfferTypeService;
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
 * REST controller for managing OfferType.
 */
@RestController
@RequestMapping("/api")
@Secured(AuthoritiesConstants.ADMIN)
public class OfferTypeResource {

    private final Logger log = LoggerFactory.getLogger(OfferTypeResource.class);

    private static final String ENTITY_NAME = "offerType";

    private final OfferTypeService offerTypeService;

    public OfferTypeResource(OfferTypeService offerTypeService) {
        this.offerTypeService = offerTypeService;
    }

    /**
     * POST  /offer-types : Create a new offerType.
     *
     * @param offerType the offerType to create
     * @return the ResponseEntity with status 201 (Created) and with body the new offerType, or with status 400 (Bad Request) if the offerType has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/offer-types")
    @Timed
    public ResponseEntity<OfferType> createOfferType(@Valid @RequestBody OfferType offerType)
            throws URISyntaxException {
        log.debug("REST request to save OfferType : {}", offerType);
        if (offerType.getId() != null) {
            throw new BadRequestAlertException("A new offerType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        OfferType result = offerTypeService.save(offerType);
        return ResponseEntity.created(new URI("/api/offer-types/" + result.getId()))
                .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString())).body(result);
    }

    /**
     * PUT  /offer-types : Updates an existing offerType.
     *
     * @param offerType the offerType to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated offerType,
     * or with status 400 (Bad Request) if the offerType is not valid,
     * or with status 500 (Internal Server Error) if the offerType couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/offer-types")
    @Timed
    public ResponseEntity<OfferType> updateOfferType(@Valid @RequestBody OfferType offerType)
            throws URISyntaxException {
        log.debug("REST request to update OfferType : {}", offerType);
        if (offerType.getId() == null) {
            return createOfferType(offerType);
        }
        OfferType result = offerTypeService.save(offerType);
        return ResponseEntity.ok()
                .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, offerType.getId().toString())).body(result);
    }

    /**
     * GET  /offer-types : get all the offerTypes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of offerTypes in body
     */
    @GetMapping("/offer-types")
    @Timed
    public List<OfferType> getAllOfferTypes() {
        log.debug("REST request to get all OfferTypes");
        return offerTypeService.findAll();
    }

    /**
     * GET  /offer-types/:id : get the "id" offerType.
     *
     * @param id the id of the offerType to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the offerType, or with status 404 (Not Found)
     */
    @GetMapping("/offer-types/{id}")
    @Timed
    public ResponseEntity<OfferType> getOfferType(@PathVariable Long id) {
        log.debug("REST request to get OfferType : {}", id);
        OfferType offerType = offerTypeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(offerType));
    }

    /**
     * DELETE  /offer-types/:id : delete the "id" offerType.
     *
     * @param id the id of the offerType to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/offer-types/{id}")
    @Timed
    public ResponseEntity<Void> deleteOfferType(@PathVariable Long id) {
        log.debug("REST request to delete OfferType : {}", id);
        offerTypeService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
