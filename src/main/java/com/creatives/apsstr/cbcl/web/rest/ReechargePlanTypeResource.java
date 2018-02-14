package com.creatives.apsstr.cbcl.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.creatives.apsstr.cbcl.domain.ReechargePlanType;

import com.creatives.apsstr.cbcl.repository.ReechargePlanTypeRepository;
import com.creatives.apsstr.cbcl.web.rest.errors.BadRequestAlertException;
import com.creatives.apsstr.cbcl.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing ReechargePlanType.
 */
@RestController
@RequestMapping("/api")
public class ReechargePlanTypeResource {

    private final Logger log = LoggerFactory.getLogger(ReechargePlanTypeResource.class);

    private static final String ENTITY_NAME = "reechargePlanType";

    private final ReechargePlanTypeRepository reechargePlanTypeRepository;

    public ReechargePlanTypeResource(ReechargePlanTypeRepository reechargePlanTypeRepository) {
        this.reechargePlanTypeRepository = reechargePlanTypeRepository;
    }

    /**
     * POST  /reecharge-plan-types : Create a new reechargePlanType.
     *
     * @param reechargePlanType the reechargePlanType to create
     * @return the ResponseEntity with status 201 (Created) and with body the new reechargePlanType, or with status 400 (Bad Request) if the reechargePlanType has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/reecharge-plan-types")
    @Timed
    public ResponseEntity<ReechargePlanType> createReechargePlanType(@Valid @RequestBody ReechargePlanType reechargePlanType) throws URISyntaxException {
        log.debug("REST request to save ReechargePlanType : {}", reechargePlanType);
        if (reechargePlanType.getId() != null) {
            throw new BadRequestAlertException("A new reechargePlanType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ReechargePlanType result = reechargePlanTypeRepository.save(reechargePlanType);
        return ResponseEntity.created(new URI("/api/reecharge-plan-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /reecharge-plan-types : Updates an existing reechargePlanType.
     *
     * @param reechargePlanType the reechargePlanType to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated reechargePlanType,
     * or with status 400 (Bad Request) if the reechargePlanType is not valid,
     * or with status 500 (Internal Server Error) if the reechargePlanType couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/reecharge-plan-types")
    @Timed
    public ResponseEntity<ReechargePlanType> updateReechargePlanType(@Valid @RequestBody ReechargePlanType reechargePlanType) throws URISyntaxException {
        log.debug("REST request to update ReechargePlanType : {}", reechargePlanType);
        if (reechargePlanType.getId() == null) {
            return createReechargePlanType(reechargePlanType);
        }
        ReechargePlanType result = reechargePlanTypeRepository.save(reechargePlanType);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, reechargePlanType.getId().toString()))
            .body(result);
    }

    /**
     * GET  /reecharge-plan-types : get all the reechargePlanTypes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of reechargePlanTypes in body
     */
    @GetMapping("/reecharge-plan-types")
    @Timed
    public List<ReechargePlanType> getAllReechargePlanTypes() {
        log.debug("REST request to get all ReechargePlanTypes");
        return reechargePlanTypeRepository.findAll();
        }

    /**
     * GET  /reecharge-plan-types/:id : get the "id" reechargePlanType.
     *
     * @param id the id of the reechargePlanType to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the reechargePlanType, or with status 404 (Not Found)
     */
    @GetMapping("/reecharge-plan-types/{id}")
    @Timed
    public ResponseEntity<ReechargePlanType> getReechargePlanType(@PathVariable Long id) {
        log.debug("REST request to get ReechargePlanType : {}", id);
        ReechargePlanType reechargePlanType = reechargePlanTypeRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(reechargePlanType));
    }

    /**
     * DELETE  /reecharge-plan-types/:id : delete the "id" reechargePlanType.
     *
     * @param id the id of the reechargePlanType to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/reecharge-plan-types/{id}")
    @Timed
    public ResponseEntity<Void> deleteReechargePlanType(@PathVariable Long id) {
        log.debug("REST request to delete ReechargePlanType : {}", id);
        reechargePlanTypeRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
