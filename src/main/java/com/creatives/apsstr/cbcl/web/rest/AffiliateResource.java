package com.creatives.apsstr.cbcl.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.creatives.apsstr.cbcl.domain.Affiliate;
import com.creatives.apsstr.cbcl.service.AffiliateService;
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
 * REST controller for managing Affiliate.
 */
@RestController
@RequestMapping("/api")
public class AffiliateResource {

    private final Logger log = LoggerFactory.getLogger(AffiliateResource.class);

    private static final String ENTITY_NAME = "affiliate";

    private final AffiliateService affiliateService;

    public AffiliateResource(AffiliateService affiliateService) {
        this.affiliateService = affiliateService;
    }

    /**
     * POST  /affiliates : Create a new affiliate.
     *
     * @param affiliate the affiliate to create
     * @return the ResponseEntity with status 201 (Created) and with body the new affiliate, or with status 400 (Bad Request) if the affiliate has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/affiliates")
    @Timed
    public ResponseEntity<Affiliate> createAffiliate(@Valid @RequestBody Affiliate affiliate) throws URISyntaxException {
        log.debug("REST request to save Affiliate : {}", affiliate);
        if (affiliate.getId() != null) {
            throw new BadRequestAlertException("A new affiliate cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Affiliate result = affiliateService.save(affiliate);
        return ResponseEntity.created(new URI("/api/affiliates/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /affiliates : Updates an existing affiliate.
     *
     * @param affiliate the affiliate to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated affiliate,
     * or with status 400 (Bad Request) if the affiliate is not valid,
     * or with status 500 (Internal Server Error) if the affiliate couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/affiliates")
    @Timed
    public ResponseEntity<Affiliate> updateAffiliate(@Valid @RequestBody Affiliate affiliate) throws URISyntaxException {
        log.debug("REST request to update Affiliate : {}", affiliate);
        if (affiliate.getId() == null) {
            return createAffiliate(affiliate);
        }
        Affiliate result = affiliateService.save(affiliate);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, affiliate.getId().toString()))
            .body(result);
    }

    /**
     * GET  /affiliates : get all the affiliates.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of affiliates in body
     */
    @GetMapping("/affiliates")
    @Timed
    public List<Affiliate> getAllAffiliates() {
        log.debug("REST request to get all Affiliates");
        return affiliateService.findAll();
        }

    /**
     * GET  /affiliates/:id : get the "id" affiliate.
     *
     * @param id the id of the affiliate to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the affiliate, or with status 404 (Not Found)
     */
    @GetMapping("/affiliates/{id}")
    @Timed
    public ResponseEntity<Affiliate> getAffiliate(@PathVariable Long id) {
        log.debug("REST request to get Affiliate : {}", id);
        Affiliate affiliate = affiliateService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(affiliate));
    }

    /**
     * DELETE  /affiliates/:id : delete the "id" affiliate.
     *
     * @param id the id of the affiliate to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/affiliates/{id}")
    @Timed
    public ResponseEntity<Void> deleteAffiliate(@PathVariable Long id) {
        log.debug("REST request to delete Affiliate : {}", id);
        affiliateService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
