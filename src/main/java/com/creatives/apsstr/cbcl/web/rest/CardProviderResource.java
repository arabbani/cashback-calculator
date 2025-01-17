package com.creatives.apsstr.cbcl.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import com.codahale.metrics.annotation.Timed;
import com.creatives.apsstr.cbcl.domain.CardProvider;
import com.creatives.apsstr.cbcl.security.AuthoritiesConstants;
import com.creatives.apsstr.cbcl.service.CardProviderService;
import com.creatives.apsstr.cbcl.web.rest.errors.BadRequestAlertException;
import com.creatives.apsstr.cbcl.web.rest.util.HeaderUtil;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.github.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing CardProvider.
 */
@RestController
@RequestMapping("/api")
@Secured(AuthoritiesConstants.ADMIN)
public class CardProviderResource {

    private final Logger log = LoggerFactory.getLogger(CardProviderResource.class);

    private static final String ENTITY_NAME = "cardProvider";

    private final CardProviderService cardProviderService;

    public CardProviderResource(CardProviderService cardProviderService) {
        this.cardProviderService = cardProviderService;
    }

    /**
     * POST  /card-providers : Create a new cardProvider.
     *
     * @param cardProvider the cardProvider to create
     * @return the ResponseEntity with status 201 (Created) and with body the new cardProvider, or with status 400 (Bad Request) if the cardProvider has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/card-providers")
    @Timed
    public ResponseEntity<CardProvider> create(@Valid @RequestBody CardProvider cardProvider)
            throws URISyntaxException {
        log.debug("REST request to save CardProvider : {}", cardProvider);
        if (cardProvider.getId() != null) {
            throw new BadRequestAlertException("A new cardProvider cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CardProvider result = cardProviderService.save(cardProvider);
        return ResponseEntity.created(new URI("/api/card-providers/" + result.getId()))
                .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString())).body(result);
    }

    /**
     * PUT  /card-providers : Updates an existing cardProvider.
     *
     * @param cardProvider the cardProvider to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated cardProvider,
     * or with status 400 (Bad Request) if the cardProvider is not valid,
     * or with status 500 (Internal Server Error) if the cardProvider couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/card-providers")
    @Timed
    public ResponseEntity<CardProvider> update(@Valid @RequestBody CardProvider cardProvider)
            throws URISyntaxException {
        log.debug("REST request to update CardProvider : {}", cardProvider);
        if (cardProvider.getId() == null) {
            return create(cardProvider);
        }
        CardProvider result = cardProviderService.save(cardProvider);
        return ResponseEntity.ok()
                .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, cardProvider.getId().toString())).body(result);
    }

    /**
     * GET  /card-providers : get all the cardProviders.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of cardProviders in body
     */
    @GetMapping("/card-providers")
    @Timed
    public List<CardProvider> findAll() {
        log.debug("REST request to get all CardProviders");
        return cardProviderService.findAll();
    }

    /**
     * GET  /card-providers/:id : get the "id" cardProvider.
     *
     * @param id the id of the cardProvider to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the cardProvider, or with status 404 (Not Found)
     */
    @GetMapping("/card-providers/{id}")
    @Timed
    public ResponseEntity<CardProvider> findOne(@PathVariable Long id) {
        log.debug("REST request to get CardProvider : {}", id);
        CardProvider cardProvider = cardProviderService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(cardProvider));
    }

    /**
     * DELETE  /card-providers/:id : delete the "id" cardProvider.
     *
     * @param id the id of the cardProvider to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/card-providers/{id}")
    @Timed
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        log.debug("REST request to delete CardProvider : {}", id);
        cardProviderService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
