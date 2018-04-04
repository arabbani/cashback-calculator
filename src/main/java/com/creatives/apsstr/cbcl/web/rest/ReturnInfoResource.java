package com.creatives.apsstr.cbcl.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.creatives.apsstr.cbcl.domain.ReturnInfo;

import com.creatives.apsstr.cbcl.repository.ReturnInfoRepository;
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
 * REST controller for managing ReturnInfo.
 */
@RestController
@RequestMapping("/api")
@Secured(AuthoritiesConstants.ADMIN)
public class ReturnInfoResource {

    private final Logger log = LoggerFactory.getLogger(ReturnInfoResource.class);

    private static final String ENTITY_NAME = "returnInfo";

    private final ReturnInfoRepository returnInfoRepository;

    public ReturnInfoResource(ReturnInfoRepository returnInfoRepository) {
        this.returnInfoRepository = returnInfoRepository;
    }

    /**
     * POST  /return-infos : Create a new returnInfo.
     *
     * @param returnInfo the returnInfo to create
     * @return the ResponseEntity with status 201 (Created) and with body the new returnInfo, or with status 400 (Bad Request) if the returnInfo has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/return-infos")
    @Timed
    public ResponseEntity<ReturnInfo> createReturnInfo(@RequestBody ReturnInfo returnInfo) throws URISyntaxException {
        log.debug("REST request to save ReturnInfo : {}", returnInfo);
        if (returnInfo.getId() != null) {
            throw new BadRequestAlertException("A new returnInfo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ReturnInfo result = returnInfoRepository.save(returnInfo);
        return ResponseEntity.created(new URI("/api/return-infos/" + result.getId()))
                .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString())).body(result);
    }

    /**
     * PUT  /return-infos : Updates an existing returnInfo.
     *
     * @param returnInfo the returnInfo to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated returnInfo,
     * or with status 400 (Bad Request) if the returnInfo is not valid,
     * or with status 500 (Internal Server Error) if the returnInfo couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/return-infos")
    @Timed
    public ResponseEntity<ReturnInfo> updateReturnInfo(@RequestBody ReturnInfo returnInfo) throws URISyntaxException {
        log.debug("REST request to update ReturnInfo : {}", returnInfo);
        if (returnInfo.getId() == null) {
            return createReturnInfo(returnInfo);
        }
        ReturnInfo result = returnInfoRepository.save(returnInfo);
        return ResponseEntity.ok()
                .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, returnInfo.getId().toString())).body(result);
    }

    /**
     * GET  /return-infos : get all the returnInfos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of returnInfos in body
     */
    @GetMapping("/return-infos")
    @Timed
    public List<ReturnInfo> getAllReturnInfos() {
        log.debug("REST request to get all ReturnInfos");
        return returnInfoRepository.findAll();
    }

    /**
     * GET  /return-infos/:id : get the "id" returnInfo.
     *
     * @param id the id of the returnInfo to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the returnInfo, or with status 404 (Not Found)
     */
    @GetMapping("/return-infos/{id}")
    @Timed
    public ResponseEntity<ReturnInfo> getReturnInfo(@PathVariable Long id) {
        log.debug("REST request to get ReturnInfo : {}", id);
        ReturnInfo returnInfo = returnInfoRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(returnInfo));
    }

    /**
     * DELETE  /return-infos/:id : delete the "id" returnInfo.
     *
     * @param id the id of the returnInfo to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/return-infos/{id}")
    @Timed
    public ResponseEntity<Void> deleteReturnInfo(@PathVariable Long id) {
        log.debug("REST request to delete ReturnInfo : {}", id);
        returnInfoRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
