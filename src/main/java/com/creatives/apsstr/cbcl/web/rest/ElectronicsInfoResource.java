package com.creatives.apsstr.cbcl.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.creatives.apsstr.cbcl.domain.ElectronicsInfo;

import com.creatives.apsstr.cbcl.repository.ElectronicsInfoRepository;
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
 * REST controller for managing ElectronicsInfo.
 */
@RestController
@RequestMapping("/api")
@Secured(AuthoritiesConstants.ADMIN)
public class ElectronicsInfoResource {

    private final Logger log = LoggerFactory.getLogger(ElectronicsInfoResource.class);

    private static final String ENTITY_NAME = "electronicsInfo";

    private final ElectronicsInfoRepository electronicsInfoRepository;

    public ElectronicsInfoResource(ElectronicsInfoRepository electronicsInfoRepository) {
        this.electronicsInfoRepository = electronicsInfoRepository;
    }

    /**
     * POST  /electronics-infos : Create a new electronicsInfo.
     *
     * @param electronicsInfo the electronicsInfo to create
     * @return the ResponseEntity with status 201 (Created) and with body the new electronicsInfo, or with status 400 (Bad Request) if the electronicsInfo has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/electronics-infos")
    @Timed
    public ResponseEntity<ElectronicsInfo> createElectronicsInfo(@RequestBody ElectronicsInfo electronicsInfo)
            throws URISyntaxException {
        log.debug("REST request to save ElectronicsInfo : {}", electronicsInfo);
        if (electronicsInfo.getId() != null) {
            throw new BadRequestAlertException("A new electronicsInfo cannot already have an ID", ENTITY_NAME,
                    "idexists");
        }
        ElectronicsInfo result = electronicsInfoRepository.save(electronicsInfo);
        return ResponseEntity.created(new URI("/api/electronics-infos/" + result.getId()))
                .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString())).body(result);
    }

    /**
     * PUT  /electronics-infos : Updates an existing electronicsInfo.
     *
     * @param electronicsInfo the electronicsInfo to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated electronicsInfo,
     * or with status 400 (Bad Request) if the electronicsInfo is not valid,
     * or with status 500 (Internal Server Error) if the electronicsInfo couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/electronics-infos")
    @Timed
    public ResponseEntity<ElectronicsInfo> updateElectronicsInfo(@RequestBody ElectronicsInfo electronicsInfo)
            throws URISyntaxException {
        log.debug("REST request to update ElectronicsInfo : {}", electronicsInfo);
        if (electronicsInfo.getId() == null) {
            return createElectronicsInfo(electronicsInfo);
        }
        ElectronicsInfo result = electronicsInfoRepository.save(electronicsInfo);
        return ResponseEntity.ok()
                .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, electronicsInfo.getId().toString()))
                .body(result);
    }

    /**
     * GET  /electronics-infos : get all the electronicsInfos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of electronicsInfos in body
     */
    @GetMapping("/electronics-infos")
    @Timed
    public List<ElectronicsInfo> getAllElectronicsInfos() {
        log.debug("REST request to get all ElectronicsInfos");
        return electronicsInfoRepository.findAllWithEagerRelationships();
    }

    /**
     * GET  /electronics-infos/:id : get the "id" electronicsInfo.
     *
     * @param id the id of the electronicsInfo to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the electronicsInfo, or with status 404 (Not Found)
     */
    @GetMapping("/electronics-infos/{id}")
    @Timed
    public ResponseEntity<ElectronicsInfo> getElectronicsInfo(@PathVariable Long id) {
        log.debug("REST request to get ElectronicsInfo : {}", id);
        ElectronicsInfo electronicsInfo = electronicsInfoRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(electronicsInfo));
    }

    /**
     * DELETE  /electronics-infos/:id : delete the "id" electronicsInfo.
     *
     * @param id the id of the electronicsInfo to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/electronics-infos/{id}")
    @Timed
    public ResponseEntity<Void> deleteElectronicsInfo(@PathVariable Long id) {
        log.debug("REST request to delete ElectronicsInfo : {}", id);
        electronicsInfoRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
