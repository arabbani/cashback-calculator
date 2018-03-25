package com.creatives.apsstr.cbcl.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.creatives.apsstr.cbcl.domain.CardProvider;

import com.creatives.apsstr.cbcl.repository.CardProviderRepository;
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
 * REST controller for managing CardProvider.
 */
@RestController
@RequestMapping("/api")
public class CardProviderResource {

    private final Logger log = LoggerFactory.getLogger(CardProviderResource.class);

    private static final String ENTITY_NAME = "cardProvider";

    private final CardProviderRepository cardProviderRepository;

    public CardProviderResource(CardProviderRepository cardProviderRepository) {
        this.cardProviderRepository = cardProviderRepository;
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
    public ResponseEntity<CardProvider> createCardProvider(@Valid @RequestBody CardProvider cardProvider) throws URISyntaxException {
        log.debug("REST request to save CardProvider : {}", cardProvider);
        if (cardProvider.getId() != null) {
            throw new BadRequestAlertException("A new cardProvider cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CardProvider result = cardProviderRepository.save(cardProvider);
        return ResponseEntity.created(new URI("/api/card-providers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
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
    public ResponseEntity<CardProvider> updateCardProvider(@Valid @RequestBody CardProvider cardProvider) throws URISyntaxException {
        log.debug("REST request to update CardProvider : {}", cardProvider);
        if (cardProvider.getId() == null) {
            return createCardProvider(cardProvider);
        }
        CardProvider result = cardProviderRepository.save(cardProvider);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, cardProvider.getId().toString()))
            .body(result);
    }

    /**
     * GET  /card-providers : get all the cardProviders.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of cardProviders in body
     */
    @GetMapping("/card-providers")
    @Timed
    public List<CardProvider> getAllCardProviders() {
        log.debug("REST request to get all CardProviders");
        return cardProviderRepository.findAll();
        }

    /**
     * GET  /card-providers/:id : get the "id" cardProvider.
     *
     * @param id the id of the cardProvider to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the cardProvider, or with status 404 (Not Found)
     */
    @GetMapping("/card-providers/{id}")
    @Timed
    public ResponseEntity<CardProvider> getCardProvider(@PathVariable Long id) {
        log.debug("REST request to get CardProvider : {}", id);
        CardProvider cardProvider = cardProviderRepository.findOne(id);
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
    public ResponseEntity<Void> deleteCardProvider(@PathVariable Long id) {
        log.debug("REST request to delete CardProvider : {}", id);
        cardProviderRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
