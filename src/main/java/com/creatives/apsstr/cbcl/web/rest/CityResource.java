package com.creatives.apsstr.cbcl.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.creatives.apsstr.cbcl.domain.City;
import com.creatives.apsstr.cbcl.security.AuthoritiesConstants;
import com.creatives.apsstr.cbcl.service.CityService;
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
 * REST controller for managing City.
 */
@RestController
@RequestMapping("/api")
public class CityResource {

    private final Logger log = LoggerFactory.getLogger(CityResource.class);

    private static final String ENTITY_NAME = "city";

    private final CityService cityService;

    public CityResource(CityService cityService) {
        this.cityService = cityService;
    }

    /**
     * POST  /cities : Create a new city.
     *
     * @param city the city to create
     * @return the ResponseEntity with status 201 (Created) and with body the new city, or with status 400 (Bad Request) if the city has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/cities")
    @Timed
    @Secured(AuthoritiesConstants.ADMIN)
    public ResponseEntity<City> create(@Valid @RequestBody City city) throws URISyntaxException {
        log.debug("REST request to save City : {}", city);
        if (city.getId() != null) {
            throw new BadRequestAlertException("A new city cannot already have an ID", ENTITY_NAME, "idexists");
        }
        City result = cityService.save(city);
        return ResponseEntity.created(new URI("/api/cities/" + result.getId()))
                .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString())).body(result);
    }

    /**
     * PUT  /cities : Updates an existing city.
     *
     * @param city the city to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated city,
     * or with status 400 (Bad Request) if the city is not valid,
     * or with status 500 (Internal Server Error) if the city couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/cities")
    @Timed
    @Secured(AuthoritiesConstants.ADMIN)
    public ResponseEntity<City> update(@Valid @RequestBody City city) throws URISyntaxException {
        log.debug("REST request to update City : {}", city);
        if (city.getId() == null) {
            return create(city);
        }
        City result = cityService.save(city);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, city.getId().toString()))
                .body(result);
    }

    /**
     * GET  /cities : get all the cities.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of cities in body
     */
    @GetMapping("/cities")
    @Timed
    public List<City> findAll() {
        log.debug("REST request to get all Cities");
        return cityService.findAll();
    }

    /**
    * GET  /cities/with/state : get all the cities with state.
    *
    * @return the ResponseEntity with status 200 (OK) and the list of cities in body
    */
    @GetMapping("/cities/with/state")
    @Timed
    @Secured(AuthoritiesConstants.ADMIN)
    public List<City> findWithState() {
        log.debug("REST request to get all Cities with state");
        return cityService.findWithState();
    }

    /**
     * GET  /cities/:id : get the "id" city.
     *
     * @param id the id of the city to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the city, or with status 404 (Not Found)
     */
    @GetMapping("/cities/{id}")
    @Timed
    @Secured(AuthoritiesConstants.ADMIN)
    public ResponseEntity<City> findOne(@PathVariable Long id) {
        log.debug("REST request to get City : {}", id);
        City city = cityService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(city));
    }

    /**
     * DELETE  /cities/:id : delete the "id" city.
     *
     * @param id the id of the city to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/cities/{id}")
    @Timed
    @Secured(AuthoritiesConstants.ADMIN)
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        log.debug("REST request to delete City : {}", id);
        cityService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
