package com.creatives.apsstr.cbcl.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.creatives.apsstr.cbcl.domain.OfferReturn;

import com.creatives.apsstr.cbcl.repository.OfferReturnRepository;
import com.creatives.apsstr.cbcl.web.rest.errors.BadRequestAlertException;
import com.creatives.apsstr.cbcl.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing OfferReturn.
 */
@RestController
@RequestMapping("/api")
public class OfferReturnResource {

    private final Logger log = LoggerFactory.getLogger(OfferReturnResource.class);

    private static final String ENTITY_NAME = "offerReturn";

    private final OfferReturnRepository offerReturnRepository;

    public OfferReturnResource(OfferReturnRepository offerReturnRepository) {
        this.offerReturnRepository = offerReturnRepository;
    }

    /**
     * POST  /offer-returns : Create a new offerReturn.
     *
     * @param offerReturn the offerReturn to create
     * @return the ResponseEntity with status 201 (Created) and with body the new offerReturn, or with status 400 (Bad Request) if the offerReturn has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/offer-returns")
    @Timed
    public ResponseEntity<OfferReturn> createOfferReturn(@RequestBody OfferReturn offerReturn) throws URISyntaxException {
        log.debug("REST request to save OfferReturn : {}", offerReturn);
        if (offerReturn.getId() != null) {
            throw new BadRequestAlertException("A new offerReturn cannot already have an ID", ENTITY_NAME, "idexists");
        }
        OfferReturn result = offerReturnRepository.save(offerReturn);
        return ResponseEntity.created(new URI("/api/offer-returns/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /offer-returns : Updates an existing offerReturn.
     *
     * @param offerReturn the offerReturn to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated offerReturn,
     * or with status 400 (Bad Request) if the offerReturn is not valid,
     * or with status 500 (Internal Server Error) if the offerReturn couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/offer-returns")
    @Timed
    public ResponseEntity<OfferReturn> updateOfferReturn(@RequestBody OfferReturn offerReturn) throws URISyntaxException {
        log.debug("REST request to update OfferReturn : {}", offerReturn);
        if (offerReturn.getId() == null) {
            return createOfferReturn(offerReturn);
        }
        OfferReturn result = offerReturnRepository.save(offerReturn);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, offerReturn.getId().toString()))
            .body(result);
    }

    /**
     * GET  /offer-returns : get all the offerReturns.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of offerReturns in body
     */
    @GetMapping("/offer-returns")
    @Timed
    public List<OfferReturn> getAllOfferReturns() {
        log.debug("REST request to get all OfferReturns");
        return offerReturnRepository.findAll();
        }

    /**
     * GET  /offer-returns/:id : get the "id" offerReturn.
     *
     * @param id the id of the offerReturn to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the offerReturn, or with status 404 (Not Found)
     */
    @GetMapping("/offer-returns/{id}")
    @Timed
    public ResponseEntity<OfferReturn> getOfferReturn(@PathVariable Long id) {
        log.debug("REST request to get OfferReturn : {}", id);
        OfferReturn offerReturn = offerReturnRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(offerReturn));
    }

    /**
     * DELETE  /offer-returns/:id : delete the "id" offerReturn.
     *
     * @param id the id of the offerReturn to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/offer-returns/{id}")
    @Timed
    public ResponseEntity<Void> deleteOfferReturn(@PathVariable Long id) {
        log.debug("REST request to delete OfferReturn : {}", id);
        offerReturnRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
