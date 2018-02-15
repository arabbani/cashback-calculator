package com.creatives.apsstr.cbcl.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.creatives.apsstr.cbcl.domain.ReturnMode;

import com.creatives.apsstr.cbcl.repository.ReturnModeRepository;
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
 * REST controller for managing ReturnMode.
 */
@RestController
@RequestMapping("/api")
public class ReturnModeResource {

    private final Logger log = LoggerFactory.getLogger(ReturnModeResource.class);

    private static final String ENTITY_NAME = "returnMode";

    private final ReturnModeRepository returnModeRepository;

    public ReturnModeResource(ReturnModeRepository returnModeRepository) {
        this.returnModeRepository = returnModeRepository;
    }

    /**
     * POST  /return-modes : Create a new returnMode.
     *
     * @param returnMode the returnMode to create
     * @return the ResponseEntity with status 201 (Created) and with body the new returnMode, or with status 400 (Bad Request) if the returnMode has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/return-modes")
    @Timed
    public ResponseEntity<ReturnMode> createReturnMode(@Valid @RequestBody ReturnMode returnMode) throws URISyntaxException {
        log.debug("REST request to save ReturnMode : {}", returnMode);
        if (returnMode.getId() != null) {
            throw new BadRequestAlertException("A new returnMode cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ReturnMode result = returnModeRepository.save(returnMode);
        return ResponseEntity.created(new URI("/api/return-modes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /return-modes : Updates an existing returnMode.
     *
     * @param returnMode the returnMode to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated returnMode,
     * or with status 400 (Bad Request) if the returnMode is not valid,
     * or with status 500 (Internal Server Error) if the returnMode couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/return-modes")
    @Timed
    public ResponseEntity<ReturnMode> updateReturnMode(@Valid @RequestBody ReturnMode returnMode) throws URISyntaxException {
        log.debug("REST request to update ReturnMode : {}", returnMode);
        if (returnMode.getId() == null) {
            return createReturnMode(returnMode);
        }
        ReturnMode result = returnModeRepository.save(returnMode);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, returnMode.getId().toString()))
            .body(result);
    }

    /**
     * GET  /return-modes : get all the returnModes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of returnModes in body
     */
    @GetMapping("/return-modes")
    @Timed
    public List<ReturnMode> getAllReturnModes() {
        log.debug("REST request to get all ReturnModes");
        return returnModeRepository.findAll();
        }

    /**
     * GET  /return-modes/:id : get the "id" returnMode.
     *
     * @param id the id of the returnMode to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the returnMode, or with status 404 (Not Found)
     */
    @GetMapping("/return-modes/{id}")
    @Timed
    public ResponseEntity<ReturnMode> getReturnMode(@PathVariable Long id) {
        log.debug("REST request to get ReturnMode : {}", id);
        ReturnMode returnMode = returnModeRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(returnMode));
    }

    /**
     * DELETE  /return-modes/:id : delete the "id" returnMode.
     *
     * @param id the id of the returnMode to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/return-modes/{id}")
    @Timed
    public ResponseEntity<Void> deleteReturnMode(@PathVariable Long id) {
        log.debug("REST request to delete ReturnMode : {}", id);
        returnModeRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}