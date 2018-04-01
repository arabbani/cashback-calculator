package com.creatives.apsstr.cbcl.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import com.codahale.metrics.annotation.Timed;
import com.creatives.apsstr.cbcl.domain.Card;
import com.creatives.apsstr.cbcl.service.CardService;
import com.creatives.apsstr.cbcl.web.rest.errors.BadRequestAlertException;
import com.creatives.apsstr.cbcl.web.rest.util.HeaderUtil;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
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
 * REST controller for managing Card.
 */
@RestController
@RequestMapping("/api")
public class CardResource {

    private final Logger log = LoggerFactory.getLogger(CardResource.class);

    private static final String ENTITY_NAME = "card";

    private final CardService cardService;

    public CardResource(CardService cardService) {
        this.cardService = cardService;
    }

    /**
     * POST  /cards : Create a new card.
     *
     * @param card the card to create
     * @return the ResponseEntity with status 201 (Created) and with body the new card, or with status 400 (Bad Request) if the card has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/cards")
    @Timed
    public ResponseEntity<Card> createCard(@Valid @RequestBody Card card) throws URISyntaxException {
        log.debug("REST request to save Card : {}", card);
        if (card.getId() != null) {
            throw new BadRequestAlertException("A new card cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Card result = cardService.save(card);
        return ResponseEntity.created(new URI("/api/cards/" + result.getId()))
                .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString())).body(result);
    }

    /**
     * PUT  /cards : Updates an existing card.
     *
     * @param card the card to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated card,
     * or with status 400 (Bad Request) if the card is not valid,
     * or with status 500 (Internal Server Error) if the card couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/cards")
    @Timed
    public ResponseEntity<Card> updateCard(@Valid @RequestBody Card card) throws URISyntaxException {
        log.debug("REST request to update Card : {}", card);
        if (card.getId() == null) {
            return createCard(card);
        }
        Card result = cardService.save(card);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, card.getId().toString()))
                .body(result);
    }

    /**
     * GET  /cards : get all the cards.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of cards in body
     */
    @GetMapping("/cards")
    @Timed
    public List<Card> getAllCards() {
        log.debug("REST request to get all Cards");
        return cardService.findAll();
    }

    /**
     * GET  /cards/with/type : get all the cards with type.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of cards in body
     */
    @GetMapping("/cards/with/type")
    @Timed
    public List<Card> getAllCardsWithType() {
        log.debug("REST request to get all Cards with type");
        return cardService.findAllWithType();
    }

    /**
    * GET  /cards/with/bank : get all the cards with bank.
    *
    * @return the ResponseEntity with status 200 (OK) and the list of cards in body
    */
    @GetMapping("/cards/with/bank")
    @Timed
    public List<Card> findAllWithBank() {
        log.debug("REST request to get all Cards with bank");
        return cardService.findAllWithBank();
    }

    /**
    * GET  /cards/with/providers : get all the cards with providers.
    *
    * @return the ResponseEntity with status 200 (OK) and the list of cards in body
    */
    @GetMapping("/cards/with/providers")
    @Timed
    public List<Card> findAllWithProviders() {
        log.debug("REST request to get all Cards with providers");
        return cardService.findAllWithProviders();
    }

    /**
    * GET  /cards/with/type-providers : get all the cards with type and providers.
    *
    * @return the ResponseEntity with status 200 (OK) and the list of cards in body
    */
    @GetMapping("/cards/with/type-providers")
    @Timed
    public List<Card> findAllWithTypeAndProviders() {
        log.debug("REST request to get all Cards with type and providers");
        return cardService.findAllWithTypeAndProviders();
    }

    /**
    * GET  /cards/with/type-bank-providers : get all the cards with type, bank and providers.
    *
    * @return the ResponseEntity with status 200 (OK) and the list of cards in body
    */
    @GetMapping("/cards/with/type-bank-providers")
    @Timed
    public List<Card> findAllWithTypeAndBankAndProviders() {
        log.debug("REST request to get all Cards with type, bank and providers");
        return cardService.findAllWithTypeAndBankAndProviders();
    }

    /**
     * GET  /cards/:id : get the "id" card.
     *
     * @param id the id of the card to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the card, or with status 404 (Not Found)
     */
    @GetMapping("/cards/{id}")
    @Timed
    public ResponseEntity<Card> getCard(@PathVariable Long id) {
        log.debug("REST request to get Card : {}", id);
        Card card = cardService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(card));
    }

    /**
     * DELETE  /cards/:id : delete the "id" card.
     *
     * @param id the id of the card to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/cards/{id}")
    @Timed
    public ResponseEntity<Void> deleteCard(@PathVariable Long id) {
        log.debug("REST request to delete Card : {}", id);
        cardService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
