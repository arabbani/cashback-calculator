package com.creatives.apsstr.cbcl.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.creatives.apsstr.cbcl.domain.TravelType;
import com.creatives.apsstr.cbcl.security.AuthoritiesConstants;
import com.creatives.apsstr.cbcl.service.TravelTypeService;
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
 * REST controller for managing TravelType.
 */
@RestController
@RequestMapping("/api")
public class TravelTypeResource {

    private final Logger log = LoggerFactory.getLogger(TravelTypeResource.class);

    private static final String ENTITY_NAME = "travelType";

    private final TravelTypeService travelTypeService;

    public TravelTypeResource(TravelTypeService travelTypeService) {
        this.travelTypeService = travelTypeService;
    }

    /**
     * POST  /travel-types : Create a new travelType.
     *
     * @param travelType the travelType to create
     * @return the ResponseEntity with status 201 (Created) and with body the new travelType, or with status 400 (Bad Request) if the travelType has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/travel-types")
    @Timed
    @Secured(AuthoritiesConstants.ADMIN)
    public ResponseEntity<TravelType> createTravelType(@Valid @RequestBody TravelType travelType)
            throws URISyntaxException {
        log.debug("REST request to save TravelType : {}", travelType);
        if (travelType.getId() != null) {
            throw new BadRequestAlertException("A new travelType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TravelType result = travelTypeService.save(travelType);
        return ResponseEntity.created(new URI("/api/travel-types/" + result.getId()))
                .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString())).body(result);
    }

    /**
     * PUT  /travel-types : Updates an existing travelType.
     *
     * @param travelType the travelType to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated travelType,
     * or with status 400 (Bad Request) if the travelType is not valid,
     * or with status 500 (Internal Server Error) if the travelType couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/travel-types")
    @Timed
    @Secured(AuthoritiesConstants.ADMIN)
    public ResponseEntity<TravelType> updateTravelType(@Valid @RequestBody TravelType travelType)
            throws URISyntaxException {
        log.debug("REST request to update TravelType : {}", travelType);
        if (travelType.getId() == null) {
            return createTravelType(travelType);
        }
        TravelType result = travelTypeService.save(travelType);
        return ResponseEntity.ok()
                .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, travelType.getId().toString())).body(result);
    }

    /**
     * GET  /travel-types : get all the travelTypes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of travelTypes in body
     */
    @GetMapping("/travel-types")
    @Timed
    public List<TravelType> getAllTravelTypes() {
        log.debug("REST request to get all TravelTypes");
        return travelTypeService.findAll();
    }

    /**
     * GET  /travel-types/:id : get the "id" travelType.
     *
     * @param id the id of the travelType to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the travelType, or with status 404 (Not Found)
     */
    @GetMapping("/travel-types/{id}")
    @Timed
    @Secured(AuthoritiesConstants.ADMIN)
    public ResponseEntity<TravelType> getTravelType(@PathVariable Long id) {
        log.debug("REST request to get TravelType : {}", id);
        TravelType travelType = travelTypeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(travelType));
    }

    /**
     * DELETE  /travel-types/:id : delete the "id" travelType.
     *
     * @param id the id of the travelType to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/travel-types/{id}")
    @Timed
    @Secured(AuthoritiesConstants.ADMIN)
    public ResponseEntity<Void> deleteTravelType(@PathVariable Long id) {
        log.debug("REST request to delete TravelType : {}", id);
        travelTypeService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
