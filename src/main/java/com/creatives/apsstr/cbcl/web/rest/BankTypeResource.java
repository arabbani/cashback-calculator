package com.creatives.apsstr.cbcl.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.creatives.apsstr.cbcl.domain.BankType;
import com.creatives.apsstr.cbcl.security.AuthoritiesConstants;
import com.creatives.apsstr.cbcl.service.BankTypeService;
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
 * REST controller for managing BankType.
 */
@RestController
@RequestMapping("/api")
@Secured(AuthoritiesConstants.ADMIN)
public class BankTypeResource {

    private final Logger log = LoggerFactory.getLogger(BankTypeResource.class);

    private static final String ENTITY_NAME = "bankType";

    private final BankTypeService bankTypeService;

    public BankTypeResource(BankTypeService bankTypeService) {
        this.bankTypeService = bankTypeService;
    }

    /**
     * POST  /bank-types : Create a new bankType.
     *
     * @param bankType the bankType to create
     * @return the ResponseEntity with status 201 (Created) and with body the new bankType, or with status 400 (Bad Request) if the bankType has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/bank-types")
    @Timed
    public ResponseEntity<BankType> create(@Valid @RequestBody BankType bankType) throws URISyntaxException {
        log.debug("REST request to save BankType : {}", bankType);
        if (bankType.getId() != null) {
            throw new BadRequestAlertException("A new bankType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        BankType result = bankTypeService.save(bankType);
        return ResponseEntity.created(new URI("/api/bank-types/" + result.getId()))
                .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString())).body(result);
    }

    /**
     * PUT  /bank-types : Updates an existing bankType.
     *
     * @param bankType the bankType to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated bankType,
     * or with status 400 (Bad Request) if the bankType is not valid,
     * or with status 500 (Internal Server Error) if the bankType couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/bank-types")
    @Timed
    public ResponseEntity<BankType> update(@Valid @RequestBody BankType bankType) throws URISyntaxException {
        log.debug("REST request to update BankType : {}", bankType);
        if (bankType.getId() == null) {
            return create(bankType);
        }
        BankType result = bankTypeService.save(bankType);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, bankType.getId().toString()))
                .body(result);
    }

    /**
     * GET  /bank-types : get all the bankTypes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of bankTypes in body
     */
    @GetMapping("/bank-types")
    @Timed
    public List<BankType> findAll() {
        log.debug("REST request to get all BankTypes");
        return bankTypeService.findAll();
    }

    /**
     * GET  /bank-types/:id : get the "id" bankType.
     *
     * @param id the id of the bankType to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the bankType, or with status 404 (Not Found)
     */
    @GetMapping("/bank-types/{id}")
    @Timed
    public ResponseEntity<BankType> findOne(@PathVariable Long id) {
        log.debug("REST request to get BankType : {}", id);
        BankType bankType = bankTypeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(bankType));
    }

    /**
     * DELETE  /bank-types/:id : delete the "id" bankType.
     *
     * @param id the id of the bankType to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/bank-types/{id}")
    @Timed
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        log.debug("REST request to delete BankType : {}", id);
        bankTypeService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
