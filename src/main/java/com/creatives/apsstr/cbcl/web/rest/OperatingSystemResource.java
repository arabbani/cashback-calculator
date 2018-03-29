package com.creatives.apsstr.cbcl.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.creatives.apsstr.cbcl.domain.OperatingSystem;
import com.creatives.apsstr.cbcl.service.OperatingSystemService;
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
 * REST controller for managing OperatingSystem.
 */
@RestController
@RequestMapping("/api")
public class OperatingSystemResource {

    private final Logger log = LoggerFactory.getLogger(OperatingSystemResource.class);

    private static final String ENTITY_NAME = "operatingSystem";

    private final OperatingSystemService operatingSystemService;

    public OperatingSystemResource(OperatingSystemService operatingSystemService) {
        this.operatingSystemService = operatingSystemService;
    }

    /**
     * POST  /operating-systems : Create a new operatingSystem.
     *
     * @param operatingSystem the operatingSystem to create
     * @return the ResponseEntity with status 201 (Created) and with body the new operatingSystem, or with status 400 (Bad Request) if the operatingSystem has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/operating-systems")
    @Timed
    public ResponseEntity<OperatingSystem> createOperatingSystem(@Valid @RequestBody OperatingSystem operatingSystem) throws URISyntaxException {
        log.debug("REST request to save OperatingSystem : {}", operatingSystem);
        if (operatingSystem.getId() != null) {
            throw new BadRequestAlertException("A new operatingSystem cannot already have an ID", ENTITY_NAME, "idexists");
        }
        OperatingSystem result = operatingSystemService.save(operatingSystem);
        return ResponseEntity.created(new URI("/api/operating-systems/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /operating-systems : Updates an existing operatingSystem.
     *
     * @param operatingSystem the operatingSystem to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated operatingSystem,
     * or with status 400 (Bad Request) if the operatingSystem is not valid,
     * or with status 500 (Internal Server Error) if the operatingSystem couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/operating-systems")
    @Timed
    public ResponseEntity<OperatingSystem> updateOperatingSystem(@Valid @RequestBody OperatingSystem operatingSystem) throws URISyntaxException {
        log.debug("REST request to update OperatingSystem : {}", operatingSystem);
        if (operatingSystem.getId() == null) {
            return createOperatingSystem(operatingSystem);
        }
        OperatingSystem result = operatingSystemService.save(operatingSystem);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, operatingSystem.getId().toString()))
            .body(result);
    }

    /**
     * GET  /operating-systems : get all the operatingSystems.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of operatingSystems in body
     */
    @GetMapping("/operating-systems")
    @Timed
    public List<OperatingSystem> getAllOperatingSystems() {
        log.debug("REST request to get all OperatingSystems");
        return operatingSystemService.findAll();
        }

    /**
     * GET  /operating-systems/:id : get the "id" operatingSystem.
     *
     * @param id the id of the operatingSystem to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the operatingSystem, or with status 404 (Not Found)
     */
    @GetMapping("/operating-systems/{id}")
    @Timed
    public ResponseEntity<OperatingSystem> getOperatingSystem(@PathVariable Long id) {
        log.debug("REST request to get OperatingSystem : {}", id);
        OperatingSystem operatingSystem = operatingSystemService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(operatingSystem));
    }

    /**
     * DELETE  /operating-systems/:id : delete the "id" operatingSystem.
     *
     * @param id the id of the operatingSystem to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/operating-systems/{id}")
    @Timed
    public ResponseEntity<Void> deleteOperatingSystem(@PathVariable Long id) {
        log.debug("REST request to delete OperatingSystem : {}", id);
        operatingSystemService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
