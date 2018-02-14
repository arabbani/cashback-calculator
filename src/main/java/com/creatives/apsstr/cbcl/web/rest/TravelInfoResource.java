package com.creatives.apsstr.cbcl.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.creatives.apsstr.cbcl.domain.TravelInfo;

import com.creatives.apsstr.cbcl.repository.TravelInfoRepository;
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
 * REST controller for managing TravelInfo.
 */
@RestController
@RequestMapping("/api")
public class TravelInfoResource {

    private final Logger log = LoggerFactory.getLogger(TravelInfoResource.class);

    private static final String ENTITY_NAME = "travelInfo";

    private final TravelInfoRepository travelInfoRepository;

    public TravelInfoResource(TravelInfoRepository travelInfoRepository) {
        this.travelInfoRepository = travelInfoRepository;
    }

    /**
     * POST  /travel-infos : Create a new travelInfo.
     *
     * @param travelInfo the travelInfo to create
     * @return the ResponseEntity with status 201 (Created) and with body the new travelInfo, or with status 400 (Bad Request) if the travelInfo has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/travel-infos")
    @Timed
    public ResponseEntity<TravelInfo> createTravelInfo(@RequestBody TravelInfo travelInfo) throws URISyntaxException {
        log.debug("REST request to save TravelInfo : {}", travelInfo);
        if (travelInfo.getId() != null) {
            throw new BadRequestAlertException("A new travelInfo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TravelInfo result = travelInfoRepository.save(travelInfo);
        return ResponseEntity.created(new URI("/api/travel-infos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /travel-infos : Updates an existing travelInfo.
     *
     * @param travelInfo the travelInfo to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated travelInfo,
     * or with status 400 (Bad Request) if the travelInfo is not valid,
     * or with status 500 (Internal Server Error) if the travelInfo couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/travel-infos")
    @Timed
    public ResponseEntity<TravelInfo> updateTravelInfo(@RequestBody TravelInfo travelInfo) throws URISyntaxException {
        log.debug("REST request to update TravelInfo : {}", travelInfo);
        if (travelInfo.getId() == null) {
            return createTravelInfo(travelInfo);
        }
        TravelInfo result = travelInfoRepository.save(travelInfo);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, travelInfo.getId().toString()))
            .body(result);
    }

    /**
     * GET  /travel-infos : get all the travelInfos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of travelInfos in body
     */
    @GetMapping("/travel-infos")
    @Timed
    public List<TravelInfo> getAllTravelInfos() {
        log.debug("REST request to get all TravelInfos");
        return travelInfoRepository.findAllWithEagerRelationships();
        }

    /**
     * GET  /travel-infos/:id : get the "id" travelInfo.
     *
     * @param id the id of the travelInfo to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the travelInfo, or with status 404 (Not Found)
     */
    @GetMapping("/travel-infos/{id}")
    @Timed
    public ResponseEntity<TravelInfo> getTravelInfo(@PathVariable Long id) {
        log.debug("REST request to get TravelInfo : {}", id);
        TravelInfo travelInfo = travelInfoRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(travelInfo));
    }

    /**
     * DELETE  /travel-infos/:id : delete the "id" travelInfo.
     *
     * @param id the id of the travelInfo to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/travel-infos/{id}")
    @Timed
    public ResponseEntity<Void> deleteTravelInfo(@PathVariable Long id) {
        log.debug("REST request to delete TravelInfo : {}", id);
        travelInfoRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
