package com.creatives.apsstr.cbcl.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.creatives.apsstr.cbcl.domain.RechargeInfo;

import com.creatives.apsstr.cbcl.repository.RechargeInfoRepository;
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
 * REST controller for managing RechargeInfo.
 */
@RestController
@RequestMapping("/api")
public class RechargeInfoResource {

    private final Logger log = LoggerFactory.getLogger(RechargeInfoResource.class);

    private static final String ENTITY_NAME = "rechargeInfo";

    private final RechargeInfoRepository rechargeInfoRepository;

    public RechargeInfoResource(RechargeInfoRepository rechargeInfoRepository) {
        this.rechargeInfoRepository = rechargeInfoRepository;
    }

    /**
     * POST  /recharge-infos : Create a new rechargeInfo.
     *
     * @param rechargeInfo the rechargeInfo to create
     * @return the ResponseEntity with status 201 (Created) and with body the new rechargeInfo, or with status 400 (Bad Request) if the rechargeInfo has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/recharge-infos")
    @Timed
    public ResponseEntity<RechargeInfo> createRechargeInfo(@RequestBody RechargeInfo rechargeInfo) throws URISyntaxException {
        log.debug("REST request to save RechargeInfo : {}", rechargeInfo);
        if (rechargeInfo.getId() != null) {
            throw new BadRequestAlertException("A new rechargeInfo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RechargeInfo result = rechargeInfoRepository.save(rechargeInfo);
        return ResponseEntity.created(new URI("/api/recharge-infos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /recharge-infos : Updates an existing rechargeInfo.
     *
     * @param rechargeInfo the rechargeInfo to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated rechargeInfo,
     * or with status 400 (Bad Request) if the rechargeInfo is not valid,
     * or with status 500 (Internal Server Error) if the rechargeInfo couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/recharge-infos")
    @Timed
    public ResponseEntity<RechargeInfo> updateRechargeInfo(@RequestBody RechargeInfo rechargeInfo) throws URISyntaxException {
        log.debug("REST request to update RechargeInfo : {}", rechargeInfo);
        if (rechargeInfo.getId() == null) {
            return createRechargeInfo(rechargeInfo);
        }
        RechargeInfo result = rechargeInfoRepository.save(rechargeInfo);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, rechargeInfo.getId().toString()))
            .body(result);
    }

    /**
     * GET  /recharge-infos : get all the rechargeInfos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of rechargeInfos in body
     */
    @GetMapping("/recharge-infos")
    @Timed
    public List<RechargeInfo> getAllRechargeInfos() {
        log.debug("REST request to get all RechargeInfos");
        return rechargeInfoRepository.findAllWithEagerRelationships();
        }

    /**
     * GET  /recharge-infos/:id : get the "id" rechargeInfo.
     *
     * @param id the id of the rechargeInfo to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the rechargeInfo, or with status 404 (Not Found)
     */
    @GetMapping("/recharge-infos/{id}")
    @Timed
    public ResponseEntity<RechargeInfo> getRechargeInfo(@PathVariable Long id) {
        log.debug("REST request to get RechargeInfo : {}", id);
        RechargeInfo rechargeInfo = rechargeInfoRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(rechargeInfo));
    }

    /**
     * DELETE  /recharge-infos/:id : delete the "id" rechargeInfo.
     *
     * @param id the id of the rechargeInfo to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/recharge-infos/{id}")
    @Timed
    public ResponseEntity<Void> deleteRechargeInfo(@PathVariable Long id) {
        log.debug("REST request to delete RechargeInfo : {}", id);
        rechargeInfoRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
