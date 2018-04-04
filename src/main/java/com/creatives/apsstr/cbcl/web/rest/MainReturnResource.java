package com.creatives.apsstr.cbcl.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.creatives.apsstr.cbcl.domain.MainReturn;

import com.creatives.apsstr.cbcl.repository.MainReturnRepository;
import com.creatives.apsstr.cbcl.security.AuthoritiesConstants;
import com.creatives.apsstr.cbcl.web.rest.errors.BadRequestAlertException;
import com.creatives.apsstr.cbcl.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing MainReturn.
 */
@RestController
@RequestMapping("/api")
@Secured(AuthoritiesConstants.ADMIN)
public class MainReturnResource {

    private final Logger log = LoggerFactory.getLogger(MainReturnResource.class);

    private static final String ENTITY_NAME = "mainReturn";

    private final MainReturnRepository mainReturnRepository;

    public MainReturnResource(MainReturnRepository mainReturnRepository) {
        this.mainReturnRepository = mainReturnRepository;
    }

    /**
     * POST  /main-returns : Create a new mainReturn.
     *
     * @param mainReturn the mainReturn to create
     * @return the ResponseEntity with status 201 (Created) and with body the new mainReturn, or with status 400 (Bad Request) if the mainReturn has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/main-returns")
    @Timed
    public ResponseEntity<MainReturn> createMainReturn(@Valid @RequestBody MainReturn mainReturn)
            throws URISyntaxException {
        log.debug("REST request to save MainReturn : {}", mainReturn);
        if (mainReturn.getId() != null) {
            throw new BadRequestAlertException("A new mainReturn cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MainReturn result = mainReturnRepository.save(mainReturn);
        return ResponseEntity.created(new URI("/api/main-returns/" + result.getId()))
                .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString())).body(result);
    }

    /**
     * PUT  /main-returns : Updates an existing mainReturn.
     *
     * @param mainReturn the mainReturn to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated mainReturn,
     * or with status 400 (Bad Request) if the mainReturn is not valid,
     * or with status 500 (Internal Server Error) if the mainReturn couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/main-returns")
    @Timed
    public ResponseEntity<MainReturn> updateMainReturn(@Valid @RequestBody MainReturn mainReturn)
            throws URISyntaxException {
        log.debug("REST request to update MainReturn : {}", mainReturn);
        if (mainReturn.getId() == null) {
            return createMainReturn(mainReturn);
        }
        MainReturn result = mainReturnRepository.save(mainReturn);
        return ResponseEntity.ok()
                .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, mainReturn.getId().toString())).body(result);
    }

    /**
     * GET  /main-returns : get all the mainReturns.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of mainReturns in body
     */
    @GetMapping("/main-returns")
    @Timed
    public List<MainReturn> getAllMainReturns() {
        log.debug("REST request to get all MainReturns");
        return mainReturnRepository.findAll();
    }

    /**
     * GET  /main-returns/:id : get the "id" mainReturn.
     *
     * @param id the id of the mainReturn to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the mainReturn, or with status 404 (Not Found)
     */
    @GetMapping("/main-returns/{id}")
    @Timed
    public ResponseEntity<MainReturn> getMainReturn(@PathVariable Long id) {
        log.debug("REST request to get MainReturn : {}", id);
        MainReturn mainReturn = mainReturnRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(mainReturn));
    }

    /**
     * DELETE  /main-returns/:id : delete the "id" mainReturn.
     *
     * @param id the id of the mainReturn to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/main-returns/{id}")
    @Timed
    public ResponseEntity<Void> deleteMainReturn(@PathVariable Long id) {
        log.debug("REST request to delete MainReturn : {}", id);
        mainReturnRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
