package com.creatives.apsstr.cbcl.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.creatives.apsstr.cbcl.domain.Merchant;
import com.creatives.apsstr.cbcl.security.AuthoritiesConstants;
import com.creatives.apsstr.cbcl.service.MerchantService;
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
 * REST controller for managing Merchant.
 */
@RestController
@RequestMapping("/api")
public class MerchantResource {

    private final Logger log = LoggerFactory.getLogger(MerchantResource.class);

    private static final String ENTITY_NAME = "merchant";

    private final MerchantService merchantService;

    public MerchantResource(MerchantService merchantService) {
        this.merchantService = merchantService;
    }

    /**
     * POST  /merchants : Create a new merchant.
     *
     * @param merchant the merchant to create
     * @return the ResponseEntity with status 201 (Created) and with body the new merchant, or with status 400 (Bad Request) if the merchant has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/merchants")
    @Timed
    @Secured(AuthoritiesConstants.ADMIN)
    public ResponseEntity<Merchant> create(@Valid @RequestBody Merchant merchant) throws URISyntaxException {
        log.debug("REST request to save Merchant : {}", merchant);
        if (merchant.getId() != null) {
            throw new BadRequestAlertException("A new merchant cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Merchant result = merchantService.save(merchant);
        return ResponseEntity.created(new URI("/api/merchants/" + result.getId()))
                .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString())).body(result);
    }

    /**
     * PUT  /merchants : Updates an existing merchant.
     *
     * @param merchant the merchant to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated merchant,
     * or with status 400 (Bad Request) if the merchant is not valid,
     * or with status 500 (Internal Server Error) if the merchant couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/merchants")
    @Timed
    @Secured(AuthoritiesConstants.ADMIN)
    public ResponseEntity<Merchant> update(@Valid @RequestBody Merchant merchant) throws URISyntaxException {
        log.debug("REST request to update Merchant : {}", merchant);
        if (merchant.getId() == null) {
            return create(merchant);
        }
        Merchant result = merchantService.save(merchant);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, merchant.getId().toString()))
                .body(result);
    }

    /**
     * GET  /merchants : get all the merchants.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of merchants in body
     */
    @GetMapping("/merchants")
    @Timed
    @Secured(AuthoritiesConstants.ADMIN)
    public List<Merchant> findAll() {
        log.debug("REST request to get all Merchants");
        return merchantService.findAll();
    }

    /**
    * GET  /merchants/with/subCategories : get all the merchants with subCategories.
    *
    * @return the ResponseEntity with status 200 (OK) and the list of merchants in body
    */
    @GetMapping("/merchants/with/subCategories")
    @Timed
    @Secured(AuthoritiesConstants.ADMIN)
    public List<Merchant> findWithSubCategories() {
        log.debug("REST request to get all Merchants with subCategories");
        return merchantService.findWithSubCategories();
    }

    /**
    * GET  /merchants/by/subCategoryId/{id} : get all the merchants by subCategory Id.
    *
    * @return the ResponseEntity with status 200 (OK) and the list of merchants in body
    */
    @GetMapping("/merchants/by/subCategoryId/{id}")
    @Timed
    @Secured(AuthoritiesConstants.ADMIN)
    public List<Merchant> findBySubCategoryId(@PathVariable Long id) {
        log.debug("REST request to get all Merchants by subCategory Id");
        return merchantService.findBySubCategoryId(id);
    }

    /**
     * GET  /merchants/:id : get the "id" merchant.
     *
     * @param id the id of the merchant to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the merchant, or with status 404 (Not Found)
     */
    @GetMapping("/merchants/{id}")
    @Timed
    @Secured(AuthoritiesConstants.ADMIN)
    public ResponseEntity<Merchant> findOne(@PathVariable Long id) {
        log.debug("REST request to get Merchant : {}", id);
        Merchant merchant = merchantService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(merchant));
    }

    /**
     * DELETE  /merchants/:id : delete the "id" merchant.
     *
     * @param id the id of the merchant to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/merchants/{id}")
    @Timed
    @Secured(AuthoritiesConstants.ADMIN)
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        log.debug("REST request to delete Merchant : {}", id);
        merchantService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
