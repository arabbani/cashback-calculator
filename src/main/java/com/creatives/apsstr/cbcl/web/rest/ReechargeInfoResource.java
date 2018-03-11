package com.creatives.apsstr.cbcl.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.creatives.apsstr.cbcl.domain.ReechargeInfo;

import com.creatives.apsstr.cbcl.repository.ReechargeInfoRepository;
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
 * REST controller for managing ReechargeInfo.
 */
@RestController
@RequestMapping("/api")
public class ReechargeInfoResource {

    private final Logger log = LoggerFactory.getLogger(ReechargeInfoResource.class);

    private static final String ENTITY_NAME = "reechargeInfo";

    private final ReechargeInfoRepository reechargeInfoRepository;

    public ReechargeInfoResource(ReechargeInfoRepository reechargeInfoRepository) {
        this.reechargeInfoRepository = reechargeInfoRepository;
    }

    /**
     * POST  /reecharge-infos : Create a new reechargeInfo.
     *
     * @param reechargeInfo the reechargeInfo to create
     * @return the ResponseEntity with status 201 (Created) and with body the new reechargeInfo, or with status 400 (Bad Request) if the reechargeInfo has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/reecharge-infos")
    @Timed
    public ResponseEntity<ReechargeInfo> createReechargeInfo(@RequestBody ReechargeInfo reechargeInfo) throws URISyntaxException {
        log.debug("REST request to save ReechargeInfo : {}", reechargeInfo);
        if (reechargeInfo.getId() != null) {
            throw new BadRequestAlertException("A new reechargeInfo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ReechargeInfo result = reechargeInfoRepository.save(reechargeInfo);
        return ResponseEntity.created(new URI("/api/reecharge-infos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /reecharge-infos : Updates an existing reechargeInfo.
     *
     * @param reechargeInfo the reechargeInfo to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated reechargeInfo,
     * or with status 400 (Bad Request) if the reechargeInfo is not valid,
     * or with status 500 (Internal Server Error) if the reechargeInfo couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/reecharge-infos")
    @Timed
    public ResponseEntity<ReechargeInfo> updateReechargeInfo(@RequestBody ReechargeInfo reechargeInfo) throws URISyntaxException {
        log.debug("REST request to update ReechargeInfo : {}", reechargeInfo);
        if (reechargeInfo.getId() == null) {
            return createReechargeInfo(reechargeInfo);
        }
        ReechargeInfo result = reechargeInfoRepository.save(reechargeInfo);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, reechargeInfo.getId().toString()))
            .body(result);
    }

    /**
     * GET  /reecharge-infos : get all the reechargeInfos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of reechargeInfos in body
     */
    @GetMapping("/reecharge-infos")
    @Timed
    public List<ReechargeInfo> getAllReechargeInfos() {
        log.debug("REST request to get all ReechargeInfos");
        return reechargeInfoRepository.findAllWithEagerRelationships();
        }

    /**
     * GET  /reecharge-infos/:id : get the "id" reechargeInfo.
     *
     * @param id the id of the reechargeInfo to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the reechargeInfo, or with status 404 (Not Found)
     */
    @GetMapping("/reecharge-infos/{id}")
    @Timed
    public ResponseEntity<ReechargeInfo> getReechargeInfo(@PathVariable Long id) {
        log.debug("REST request to get ReechargeInfo : {}", id);
        ReechargeInfo reechargeInfo = reechargeInfoRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(reechargeInfo));
    }

    /**
     * DELETE  /reecharge-infos/:id : delete the "id" reechargeInfo.
     *
     * @param id the id of the reechargeInfo to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/reecharge-infos/{id}")
    @Timed
    public ResponseEntity<Void> deleteReechargeInfo(@PathVariable Long id) {
        log.debug("REST request to delete ReechargeInfo : {}", id);
        reechargeInfoRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
