package com.creatives.apsstr.cbcl.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.creatives.apsstr.cbcl.domain.BusInfo;

import com.creatives.apsstr.cbcl.repository.BusInfoRepository;
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
 * REST controller for managing BusInfo.
 */
@RestController
@RequestMapping("/api")
@Secured(AuthoritiesConstants.ADMIN)
public class BusInfoResource {

    private final Logger log = LoggerFactory.getLogger(BusInfoResource.class);

    private static final String ENTITY_NAME = "busInfo";

    private final BusInfoRepository busInfoRepository;

    public BusInfoResource(BusInfoRepository busInfoRepository) {
        this.busInfoRepository = busInfoRepository;
    }

    /**
     * POST  /bus-infos : Create a new busInfo.
     *
     * @param busInfo the busInfo to create
     * @return the ResponseEntity with status 201 (Created) and with body the new busInfo, or with status 400 (Bad Request) if the busInfo has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/bus-infos")
    @Timed
    public ResponseEntity<BusInfo> createBusInfo(@RequestBody BusInfo busInfo) throws URISyntaxException {
        log.debug("REST request to save BusInfo : {}", busInfo);
        if (busInfo.getId() != null) {
            throw new BadRequestAlertException("A new busInfo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        BusInfo result = busInfoRepository.save(busInfo);
        return ResponseEntity.created(new URI("/api/bus-infos/" + result.getId()))
                .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString())).body(result);
    }

    /**
     * PUT  /bus-infos : Updates an existing busInfo.
     *
     * @param busInfo the busInfo to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated busInfo,
     * or with status 400 (Bad Request) if the busInfo is not valid,
     * or with status 500 (Internal Server Error) if the busInfo couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/bus-infos")
    @Timed
    public ResponseEntity<BusInfo> updateBusInfo(@RequestBody BusInfo busInfo) throws URISyntaxException {
        log.debug("REST request to update BusInfo : {}", busInfo);
        if (busInfo.getId() == null) {
            return createBusInfo(busInfo);
        }
        BusInfo result = busInfoRepository.save(busInfo);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, busInfo.getId().toString()))
                .body(result);
    }

    /**
     * GET  /bus-infos : get all the busInfos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of busInfos in body
     */
    @GetMapping("/bus-infos")
    @Timed
    public List<BusInfo> getAllBusInfos() {
        log.debug("REST request to get all BusInfos");
        return busInfoRepository.findAllWithEagerRelationships();
    }

    /**
     * GET  /bus-infos/:id : get the "id" busInfo.
     *
     * @param id the id of the busInfo to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the busInfo, or with status 404 (Not Found)
     */
    @GetMapping("/bus-infos/{id}")
    @Timed
    public ResponseEntity<BusInfo> getBusInfo(@PathVariable Long id) {
        log.debug("REST request to get BusInfo : {}", id);
        BusInfo busInfo = busInfoRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(busInfo));
    }

    /**
     * DELETE  /bus-infos/:id : delete the "id" busInfo.
     *
     * @param id the id of the busInfo to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/bus-infos/{id}")
    @Timed
    public ResponseEntity<Void> deleteBusInfo(@PathVariable Long id) {
        log.debug("REST request to delete BusInfo : {}", id);
        busInfoRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
