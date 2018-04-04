package com.creatives.apsstr.cbcl.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.creatives.apsstr.cbcl.domain.FlightClass;
import com.creatives.apsstr.cbcl.security.AuthoritiesConstants;
import com.creatives.apsstr.cbcl.service.FlightClassService;
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
 * REST controller for managing FlightClass.
 */
@RestController
@RequestMapping("/api")
public class FlightClassResource {

    private final Logger log = LoggerFactory.getLogger(FlightClassResource.class);

    private static final String ENTITY_NAME = "flightClass";

    private final FlightClassService flightClassService;

    public FlightClassResource(FlightClassService flightClassService) {
        this.flightClassService = flightClassService;
    }

    /**
     * POST  /flight-classes : Create a new flightClass.
     *
     * @param flightClass the flightClass to create
     * @return the ResponseEntity with status 201 (Created) and with body the new flightClass, or with status 400 (Bad Request) if the flightClass has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/flight-classes")
    @Timed
    @Secured(AuthoritiesConstants.ADMIN)
    public ResponseEntity<FlightClass> createFlightClass(@Valid @RequestBody FlightClass flightClass)
            throws URISyntaxException {
        log.debug("REST request to save FlightClass : {}", flightClass);
        if (flightClass.getId() != null) {
            throw new BadRequestAlertException("A new flightClass cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FlightClass result = flightClassService.save(flightClass);
        return ResponseEntity.created(new URI("/api/flight-classes/" + result.getId()))
                .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString())).body(result);
    }

    /**
     * PUT  /flight-classes : Updates an existing flightClass.
     *
     * @param flightClass the flightClass to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated flightClass,
     * or with status 400 (Bad Request) if the flightClass is not valid,
     * or with status 500 (Internal Server Error) if the flightClass couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/flight-classes")
    @Timed
    @Secured(AuthoritiesConstants.ADMIN)
    public ResponseEntity<FlightClass> updateFlightClass(@Valid @RequestBody FlightClass flightClass)
            throws URISyntaxException {
        log.debug("REST request to update FlightClass : {}", flightClass);
        if (flightClass.getId() == null) {
            return createFlightClass(flightClass);
        }
        FlightClass result = flightClassService.save(flightClass);
        return ResponseEntity.ok()
                .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, flightClass.getId().toString())).body(result);
    }

    /**
     * GET  /flight-classes : get all the flightClasses.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of flightClasses in body
     */
    @GetMapping("/flight-classes")
    @Timed
    public List<FlightClass> getAllFlightClasses() {
        log.debug("REST request to get all FlightClasses");
        return flightClassService.findAll();
    }

    /**
     * GET  /flight-classes/:id : get the "id" flightClass.
     *
     * @param id the id of the flightClass to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the flightClass, or with status 404 (Not Found)
     */
    @GetMapping("/flight-classes/{id}")
    @Timed
    @Secured(AuthoritiesConstants.ADMIN)
    public ResponseEntity<FlightClass> getFlightClass(@PathVariable Long id) {
        log.debug("REST request to get FlightClass : {}", id);
        FlightClass flightClass = flightClassService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(flightClass));
    }

    /**
     * DELETE  /flight-classes/:id : delete the "id" flightClass.
     *
     * @param id the id of the flightClass to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/flight-classes/{id}")
    @Timed
    @Secured(AuthoritiesConstants.ADMIN)
    public ResponseEntity<Void> deleteFlightClass(@PathVariable Long id) {
        log.debug("REST request to delete FlightClass : {}", id);
        flightClassService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
