package com.creatives.apsstr.cbcl.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.creatives.apsstr.cbcl.domain.OperatingSystemType;
import com.creatives.apsstr.cbcl.service.OperatingSystemTypeService;
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
 * REST controller for managing OperatingSystemType.
 */
@RestController
@RequestMapping("/api")
public class OperatingSystemTypeResource {

    private final Logger log = LoggerFactory.getLogger(OperatingSystemTypeResource.class);

    private static final String ENTITY_NAME = "operatingSystemType";

    private final OperatingSystemTypeService operatingSystemTypeService;

    public OperatingSystemTypeResource(OperatingSystemTypeService operatingSystemTypeService) {
        this.operatingSystemTypeService = operatingSystemTypeService;
    }

    /**
     * POST  /operating-system-types : Create a new operatingSystemType.
     *
     * @param operatingSystemType the operatingSystemType to create
     * @return the ResponseEntity with status 201 (Created) and with body the new operatingSystemType, or with status 400 (Bad Request) if the operatingSystemType has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/operating-system-types")
    @Timed
    public ResponseEntity<OperatingSystemType> createOperatingSystemType(@Valid @RequestBody OperatingSystemType operatingSystemType) throws URISyntaxException {
        log.debug("REST request to save OperatingSystemType : {}", operatingSystemType);
        if (operatingSystemType.getId() != null) {
            throw new BadRequestAlertException("A new operatingSystemType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        OperatingSystemType result = operatingSystemTypeService.save(operatingSystemType);
        return ResponseEntity.created(new URI("/api/operating-system-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /operating-system-types : Updates an existing operatingSystemType.
     *
     * @param operatingSystemType the operatingSystemType to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated operatingSystemType,
     * or with status 400 (Bad Request) if the operatingSystemType is not valid,
     * or with status 500 (Internal Server Error) if the operatingSystemType couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/operating-system-types")
    @Timed
    public ResponseEntity<OperatingSystemType> updateOperatingSystemType(@Valid @RequestBody OperatingSystemType operatingSystemType) throws URISyntaxException {
        log.debug("REST request to update OperatingSystemType : {}", operatingSystemType);
        if (operatingSystemType.getId() == null) {
            return createOperatingSystemType(operatingSystemType);
        }
        OperatingSystemType result = operatingSystemTypeService.save(operatingSystemType);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, operatingSystemType.getId().toString()))
            .body(result);
    }

    /**
     * GET  /operating-system-types : get all the operatingSystemTypes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of operatingSystemTypes in body
     */
    @GetMapping("/operating-system-types")
    @Timed
    public List<OperatingSystemType> getAllOperatingSystemTypes() {
        log.debug("REST request to get all OperatingSystemTypes");
        return operatingSystemTypeService.findAll();
        }

    /**
     * GET  /operating-system-types/:id : get the "id" operatingSystemType.
     *
     * @param id the id of the operatingSystemType to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the operatingSystemType, or with status 404 (Not Found)
     */
    @GetMapping("/operating-system-types/{id}")
    @Timed
    public ResponseEntity<OperatingSystemType> getOperatingSystemType(@PathVariable Long id) {
        log.debug("REST request to get OperatingSystemType : {}", id);
        OperatingSystemType operatingSystemType = operatingSystemTypeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(operatingSystemType));
    }

    /**
     * DELETE  /operating-system-types/:id : delete the "id" operatingSystemType.
     *
     * @param id the id of the operatingSystemType to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/operating-system-types/{id}")
    @Timed
    public ResponseEntity<Void> deleteOperatingSystemType(@PathVariable Long id) {
        log.debug("REST request to delete OperatingSystemType : {}", id);
        operatingSystemTypeService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
