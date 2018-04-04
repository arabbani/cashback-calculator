package com.creatives.apsstr.cbcl.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.creatives.apsstr.cbcl.domain.Bank;
import com.creatives.apsstr.cbcl.security.AuthoritiesConstants;
import com.creatives.apsstr.cbcl.service.BankService;
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
 * REST controller for managing Bank.
 */
@RestController
@RequestMapping("/api")
@Secured(AuthoritiesConstants.ADMIN)
public class BankResource {

    private final Logger log = LoggerFactory.getLogger(BankResource.class);

    private static final String ENTITY_NAME = "bank";

    private final BankService bankService;

    public BankResource(BankService bankService) {
        this.bankService = bankService;
    }

    /**
     * POST  /banks : Create a new bank.
     *
     * @param bank the bank to create
     * @return the ResponseEntity with status 201 (Created) and with body the new bank, or with status 400 (Bad Request) if the bank has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/banks")
    @Timed
    public ResponseEntity<Bank> createBank(@Valid @RequestBody Bank bank) throws URISyntaxException {
        log.debug("REST request to save Bank : {}", bank);
        if (bank.getId() != null) {
            throw new BadRequestAlertException("A new bank cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Bank result = bankService.save(bank);
        return ResponseEntity.created(new URI("/api/banks/" + result.getId()))
                .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString())).body(result);
    }

    /**
     * PUT  /banks : Updates an existing bank.
     *
     * @param bank the bank to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated bank,
     * or with status 400 (Bad Request) if the bank is not valid,
     * or with status 500 (Internal Server Error) if the bank couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/banks")
    @Timed
    public ResponseEntity<Bank> updateBank(@Valid @RequestBody Bank bank) throws URISyntaxException {
        log.debug("REST request to update Bank : {}", bank);
        if (bank.getId() == null) {
            return createBank(bank);
        }
        Bank result = bankService.save(bank);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, bank.getId().toString()))
                .body(result);
    }

    /**
     * GET  /banks : get all the banks.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of banks in body
     */
    @GetMapping("/banks")
    @Timed
    public List<Bank> getAllBanks() {
        log.debug("REST request to get all Banks");
        return bankService.findAll();
    }

    /**
     * GET  /banks/with/type : get all the banks with type.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of banks in body
     */
    @GetMapping("/banks/with/type")
    @Timed
    public List<Bank> getAllBanksWithType() {
        log.debug("REST request to get all Banks with type");
        return bankService.findAllWithType();
    }

    /**
     * GET  /banks/with/cards : get all the banks with cards.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of banks in body
     */
    @GetMapping("/banks/with/cards")
    @Timed
    public List<Bank> getAllBanksWithCards() {
        log.debug("REST request to get all Banks with cards");
        return bankService.findAllWithCards();
    }

    /**
     * GET  /banks/with/type-cards : get all the banks with type and cards.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of banks in body
     */
    @GetMapping("/banks/with/type-cards")
    @Timed
    public List<Bank> getAllBanksWithTypeAndCards() {
        log.debug("REST request to get all Banks with type and cards");
        return bankService.findAllWithTypeAndCards();
    }

    /**
     * GET  /banks/:id : get the "id" bank.
     *
     * @param id the id of the bank to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the bank, or with status 404 (Not Found)
     */
    @GetMapping("/banks/{id}")
    @Timed
    public ResponseEntity<Bank> getBank(@PathVariable Long id) {
        log.debug("REST request to get Bank : {}", id);
        Bank bank = bankService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(bank));
    }

    /**
     * DELETE  /banks/:id : delete the "id" bank.
     *
     * @param id the id of the bank to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/banks/{id}")
    @Timed
    public ResponseEntity<Void> deleteBank(@PathVariable Long id) {
        log.debug("REST request to delete Bank : {}", id);
        bankService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
