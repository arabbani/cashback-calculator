package com.creatives.apsstr.cbcl.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.creatives.apsstr.cbcl.domain.RechargePlanType;
import com.creatives.apsstr.cbcl.service.RechargePlanTypeService;
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
 * REST controller for managing RechargePlanType.
 */
@RestController
@RequestMapping("/api")
public class RechargePlanTypeResource {

    private final Logger log = LoggerFactory.getLogger(RechargePlanTypeResource.class);

    private static final String ENTITY_NAME = "rechargePlanType";

    private final RechargePlanTypeService rechargePlanTypeService;

    public RechargePlanTypeResource(RechargePlanTypeService rechargePlanTypeService) {
        this.rechargePlanTypeService = rechargePlanTypeService;
    }

    /**
     * POST  /recharge-plan-types : Create a new rechargePlanType.
     *
     * @param rechargePlanType the rechargePlanType to create
     * @return the ResponseEntity with status 201 (Created) and with body the new rechargePlanType, or with status 400 (Bad Request) if the rechargePlanType has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/recharge-plan-types")
    @Timed
    public ResponseEntity<RechargePlanType> createRechargePlanType(@Valid @RequestBody RechargePlanType rechargePlanType) throws URISyntaxException {
        log.debug("REST request to save RechargePlanType : {}", rechargePlanType);
        if (rechargePlanType.getId() != null) {
            throw new BadRequestAlertException("A new rechargePlanType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RechargePlanType result = rechargePlanTypeService.save(rechargePlanType);
        return ResponseEntity.created(new URI("/api/recharge-plan-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /recharge-plan-types : Updates an existing rechargePlanType.
     *
     * @param rechargePlanType the rechargePlanType to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated rechargePlanType,
     * or with status 400 (Bad Request) if the rechargePlanType is not valid,
     * or with status 500 (Internal Server Error) if the rechargePlanType couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/recharge-plan-types")
    @Timed
    public ResponseEntity<RechargePlanType> updateRechargePlanType(@Valid @RequestBody RechargePlanType rechargePlanType) throws URISyntaxException {
        log.debug("REST request to update RechargePlanType : {}", rechargePlanType);
        if (rechargePlanType.getId() == null) {
            return createRechargePlanType(rechargePlanType);
        }
        RechargePlanType result = rechargePlanTypeService.save(rechargePlanType);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, rechargePlanType.getId().toString()))
            .body(result);
    }

    /**
     * GET  /recharge-plan-types : get all the rechargePlanTypes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of rechargePlanTypes in body
     */
    @GetMapping("/recharge-plan-types")
    @Timed
    public List<RechargePlanType> getAllRechargePlanTypes() {
        log.debug("REST request to get all RechargePlanTypes");
        return rechargePlanTypeService.findAll();
        }

    /**
     * GET  /recharge-plan-types/:id : get the "id" rechargePlanType.
     *
     * @param id the id of the rechargePlanType to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the rechargePlanType, or with status 404 (Not Found)
     */
    @GetMapping("/recharge-plan-types/{id}")
    @Timed
    public ResponseEntity<RechargePlanType> getRechargePlanType(@PathVariable Long id) {
        log.debug("REST request to get RechargePlanType : {}", id);
        RechargePlanType rechargePlanType = rechargePlanTypeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(rechargePlanType));
    }

    /**
     * DELETE  /recharge-plan-types/:id : delete the "id" rechargePlanType.
     *
     * @param id the id of the rechargePlanType to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/recharge-plan-types/{id}")
    @Timed
    public ResponseEntity<Void> deleteRechargePlanType(@PathVariable Long id) {
        log.debug("REST request to delete RechargePlanType : {}", id);
        rechargePlanTypeService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
