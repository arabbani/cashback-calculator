package com.creatives.apsstr.cbcl.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.creatives.apsstr.cbcl.domain.FlightInfo;

import com.creatives.apsstr.cbcl.repository.FlightInfoRepository;
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
 * REST controller for managing FlightInfo.
 */
@RestController
@RequestMapping("/api")
public class FlightInfoResource {

    private final Logger log = LoggerFactory.getLogger(FlightInfoResource.class);

    private static final String ENTITY_NAME = "flightInfo";

    private final FlightInfoRepository flightInfoRepository;

    public FlightInfoResource(FlightInfoRepository flightInfoRepository) {
        this.flightInfoRepository = flightInfoRepository;
    }

    /**
     * POST  /flight-infos : Create a new flightInfo.
     *
     * @param flightInfo the flightInfo to create
     * @return the ResponseEntity with status 201 (Created) and with body the new flightInfo, or with status 400 (Bad Request) if the flightInfo has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/flight-infos")
    @Timed
    public ResponseEntity<FlightInfo> createFlightInfo(@RequestBody FlightInfo flightInfo) throws URISyntaxException {
        log.debug("REST request to save FlightInfo : {}", flightInfo);
        if (flightInfo.getId() != null) {
            throw new BadRequestAlertException("A new flightInfo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FlightInfo result = flightInfoRepository.save(flightInfo);
        return ResponseEntity.created(new URI("/api/flight-infos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /flight-infos : Updates an existing flightInfo.
     *
     * @param flightInfo the flightInfo to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated flightInfo,
     * or with status 400 (Bad Request) if the flightInfo is not valid,
     * or with status 500 (Internal Server Error) if the flightInfo couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/flight-infos")
    @Timed
    public ResponseEntity<FlightInfo> updateFlightInfo(@RequestBody FlightInfo flightInfo) throws URISyntaxException {
        log.debug("REST request to update FlightInfo : {}", flightInfo);
        if (flightInfo.getId() == null) {
            return createFlightInfo(flightInfo);
        }
        FlightInfo result = flightInfoRepository.save(flightInfo);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, flightInfo.getId().toString()))
            .body(result);
    }

    /**
     * GET  /flight-infos : get all the flightInfos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of flightInfos in body
     */
    @GetMapping("/flight-infos")
    @Timed
    public List<FlightInfo> getAllFlightInfos() {
        log.debug("REST request to get all FlightInfos");
        return flightInfoRepository.findAllWithEagerRelationships();
        }

    /**
     * GET  /flight-infos/:id : get the "id" flightInfo.
     *
     * @param id the id of the flightInfo to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the flightInfo, or with status 404 (Not Found)
     */
    @GetMapping("/flight-infos/{id}")
    @Timed
    public ResponseEntity<FlightInfo> getFlightInfo(@PathVariable Long id) {
        log.debug("REST request to get FlightInfo : {}", id);
        FlightInfo flightInfo = flightInfoRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(flightInfo));
    }

    /**
     * DELETE  /flight-infos/:id : delete the "id" flightInfo.
     *
     * @param id the id of the flightInfo to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/flight-infos/{id}")
    @Timed
    public ResponseEntity<Void> deleteFlightInfo(@PathVariable Long id) {
        log.debug("REST request to delete FlightInfo : {}", id);
        flightInfoRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
