package com.creatives.apsstr.cbcl.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.creatives.apsstr.cbcl.domain.AffiliateCredential;
import com.creatives.apsstr.cbcl.service.AffiliateCredentialService;
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
 * REST controller for managing AffiliateCredential.
 */
@RestController
@RequestMapping("/api")
public class AffiliateCredentialResource {

    private final Logger log = LoggerFactory.getLogger(AffiliateCredentialResource.class);

    private static final String ENTITY_NAME = "affiliateCredential";

    private final AffiliateCredentialService affiliateCredentialService;

    public AffiliateCredentialResource(AffiliateCredentialService affiliateCredentialService) {
        this.affiliateCredentialService = affiliateCredentialService;
    }

    /**
     * POST  /affiliate-credentials : Create a new affiliateCredential.
     *
     * @param affiliateCredential the affiliateCredential to create
     * @return the ResponseEntity with status 201 (Created) and with body the new affiliateCredential, or with status 400 (Bad Request) if the affiliateCredential has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/affiliate-credentials")
    @Timed
    public ResponseEntity<AffiliateCredential> createAffiliateCredential(@Valid @RequestBody AffiliateCredential affiliateCredential) throws URISyntaxException {
        log.debug("REST request to save AffiliateCredential : {}", affiliateCredential);
        if (affiliateCredential.getId() != null) {
            throw new BadRequestAlertException("A new affiliateCredential cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AffiliateCredential result = affiliateCredentialService.save(affiliateCredential);
        return ResponseEntity.created(new URI("/api/affiliate-credentials/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /affiliate-credentials : Updates an existing affiliateCredential.
     *
     * @param affiliateCredential the affiliateCredential to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated affiliateCredential,
     * or with status 400 (Bad Request) if the affiliateCredential is not valid,
     * or with status 500 (Internal Server Error) if the affiliateCredential couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/affiliate-credentials")
    @Timed
    public ResponseEntity<AffiliateCredential> updateAffiliateCredential(@Valid @RequestBody AffiliateCredential affiliateCredential) throws URISyntaxException {
        log.debug("REST request to update AffiliateCredential : {}", affiliateCredential);
        if (affiliateCredential.getId() == null) {
            return createAffiliateCredential(affiliateCredential);
        }
        AffiliateCredential result = affiliateCredentialService.save(affiliateCredential);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, affiliateCredential.getId().toString()))
            .body(result);
    }

    /**
     * GET  /affiliate-credentials : get all the affiliateCredentials.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of affiliateCredentials in body
     */
    @GetMapping("/affiliate-credentials")
    @Timed
    public List<AffiliateCredential> getAllAffiliateCredentials() {
        log.debug("REST request to get all AffiliateCredentials");
        return affiliateCredentialService.findAll();
        }

    /**
     * GET  /affiliate-credentials/:id : get the "id" affiliateCredential.
     *
     * @param id the id of the affiliateCredential to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the affiliateCredential, or with status 404 (Not Found)
     */
    @GetMapping("/affiliate-credentials/{id}")
    @Timed
    public ResponseEntity<AffiliateCredential> getAffiliateCredential(@PathVariable Long id) {
        log.debug("REST request to get AffiliateCredential : {}", id);
        AffiliateCredential affiliateCredential = affiliateCredentialService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(affiliateCredential));
    }

    /**
     * DELETE  /affiliate-credentials/:id : delete the "id" affiliateCredential.
     *
     * @param id the id of the affiliateCredential to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/affiliate-credentials/{id}")
    @Timed
    public ResponseEntity<Void> deleteAffiliateCredential(@PathVariable Long id) {
        log.debug("REST request to delete AffiliateCredential : {}", id);
        affiliateCredentialService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
