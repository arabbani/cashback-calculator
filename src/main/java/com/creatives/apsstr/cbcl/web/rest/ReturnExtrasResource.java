package com.creatives.apsstr.cbcl.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.creatives.apsstr.cbcl.domain.ReturnExtras;

import com.creatives.apsstr.cbcl.repository.ReturnExtrasRepository;
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
 * REST controller for managing ReturnExtras.
 */
@RestController
@RequestMapping("/api")
public class ReturnExtrasResource {

    private final Logger log = LoggerFactory.getLogger(ReturnExtrasResource.class);

    private static final String ENTITY_NAME = "returnExtras";

    private final ReturnExtrasRepository returnExtrasRepository;

    public ReturnExtrasResource(ReturnExtrasRepository returnExtrasRepository) {
        this.returnExtrasRepository = returnExtrasRepository;
    }

    /**
     * POST  /return-extras : Create a new returnExtras.
     *
     * @param returnExtras the returnExtras to create
     * @return the ResponseEntity with status 201 (Created) and with body the new returnExtras, or with status 400 (Bad Request) if the returnExtras has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/return-extras")
    @Timed
    public ResponseEntity<ReturnExtras> createReturnExtras(@RequestBody ReturnExtras returnExtras) throws URISyntaxException {
        log.debug("REST request to save ReturnExtras : {}", returnExtras);
        if (returnExtras.getId() != null) {
            throw new BadRequestAlertException("A new returnExtras cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ReturnExtras result = returnExtrasRepository.save(returnExtras);
        return ResponseEntity.created(new URI("/api/return-extras/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /return-extras : Updates an existing returnExtras.
     *
     * @param returnExtras the returnExtras to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated returnExtras,
     * or with status 400 (Bad Request) if the returnExtras is not valid,
     * or with status 500 (Internal Server Error) if the returnExtras couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/return-extras")
    @Timed
    public ResponseEntity<ReturnExtras> updateReturnExtras(@RequestBody ReturnExtras returnExtras) throws URISyntaxException {
        log.debug("REST request to update ReturnExtras : {}", returnExtras);
        if (returnExtras.getId() == null) {
            return createReturnExtras(returnExtras);
        }
        ReturnExtras result = returnExtrasRepository.save(returnExtras);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, returnExtras.getId().toString()))
            .body(result);
    }

    /**
     * GET  /return-extras : get all the returnExtras.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of returnExtras in body
     */
    @GetMapping("/return-extras")
    @Timed
    public List<ReturnExtras> getAllReturnExtras() {
        log.debug("REST request to get all ReturnExtras");
        return returnExtrasRepository.findAll();
        }

    /**
     * GET  /return-extras/:id : get the "id" returnExtras.
     *
     * @param id the id of the returnExtras to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the returnExtras, or with status 404 (Not Found)
     */
    @GetMapping("/return-extras/{id}")
    @Timed
    public ResponseEntity<ReturnExtras> getReturnExtras(@PathVariable Long id) {
        log.debug("REST request to get ReturnExtras : {}", id);
        ReturnExtras returnExtras = returnExtrasRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(returnExtras));
    }

    /**
     * DELETE  /return-extras/:id : delete the "id" returnExtras.
     *
     * @param id the id of the returnExtras to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/return-extras/{id}")
    @Timed
    public ResponseEntity<Void> deleteReturnExtras(@PathVariable Long id) {
        log.debug("REST request to delete ReturnExtras : {}", id);
        returnExtrasRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
