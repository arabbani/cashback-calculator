package com.creatives.apsstr.cbcl.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.creatives.apsstr.cbcl.domain.ReturnType;

import com.creatives.apsstr.cbcl.repository.ReturnTypeRepository;
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
 * REST controller for managing ReturnType.
 */
@RestController
@RequestMapping("/api")
public class ReturnTypeResource {

    private final Logger log = LoggerFactory.getLogger(ReturnTypeResource.class);

    private static final String ENTITY_NAME = "returnType";

    private final ReturnTypeRepository returnTypeRepository;

    public ReturnTypeResource(ReturnTypeRepository returnTypeRepository) {
        this.returnTypeRepository = returnTypeRepository;
    }

    /**
     * POST  /return-types : Create a new returnType.
     *
     * @param returnType the returnType to create
     * @return the ResponseEntity with status 201 (Created) and with body the new returnType, or with status 400 (Bad Request) if the returnType has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/return-types")
    @Timed
    public ResponseEntity<ReturnType> createReturnType(@Valid @RequestBody ReturnType returnType) throws URISyntaxException {
        log.debug("REST request to save ReturnType : {}", returnType);
        if (returnType.getId() != null) {
            throw new BadRequestAlertException("A new returnType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ReturnType result = returnTypeRepository.save(returnType);
        return ResponseEntity.created(new URI("/api/return-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /return-types : Updates an existing returnType.
     *
     * @param returnType the returnType to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated returnType,
     * or with status 400 (Bad Request) if the returnType is not valid,
     * or with status 500 (Internal Server Error) if the returnType couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/return-types")
    @Timed
    public ResponseEntity<ReturnType> updateReturnType(@Valid @RequestBody ReturnType returnType) throws URISyntaxException {
        log.debug("REST request to update ReturnType : {}", returnType);
        if (returnType.getId() == null) {
            return createReturnType(returnType);
        }
        ReturnType result = returnTypeRepository.save(returnType);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, returnType.getId().toString()))
            .body(result);
    }

    /**
     * GET  /return-types : get all the returnTypes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of returnTypes in body
     */
    @GetMapping("/return-types")
    @Timed
    public List<ReturnType> getAllReturnTypes() {
        log.debug("REST request to get all ReturnTypes");
        return returnTypeRepository.findAll();
        }

    /**
     * GET  /return-types/:id : get the "id" returnType.
     *
     * @param id the id of the returnType to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the returnType, or with status 404 (Not Found)
     */
    @GetMapping("/return-types/{id}")
    @Timed
    public ResponseEntity<ReturnType> getReturnType(@PathVariable Long id) {
        log.debug("REST request to get ReturnType : {}", id);
        ReturnType returnType = returnTypeRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(returnType));
    }

    /**
     * DELETE  /return-types/:id : delete the "id" returnType.
     *
     * @param id the id of the returnType to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/return-types/{id}")
    @Timed
    public ResponseEntity<Void> deleteReturnType(@PathVariable Long id) {
        log.debug("REST request to delete ReturnType : {}", id);
        returnTypeRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
