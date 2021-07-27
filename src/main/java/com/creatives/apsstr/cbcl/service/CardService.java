package com.creatives.apsstr.cbcl.service;

import com.creatives.apsstr.cbcl.domain.Card;
import com.creatives.apsstr.cbcl.repository.CardRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service Implementation for managing Card.
 */
@Service
@Transactional
public class CardService {

    private final Logger log = LoggerFactory.getLogger(CardService.class);

    private final CardRepository cardRepository;

    public CardService(CardRepository cardRepository) {
        this.cardRepository = cardRepository;
    }

    /**
     * Save a card.
     *
     * @param card the entity to save
     * @return the persisted entity
     */
    public Card save(Card card) {
        log.debug("Request to save Card : {}", card);
        return cardRepository.save(card);
    }

    /**
     * Get all the cards.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<Card> findAll() {
        log.debug("Request to get all Cards");
        return cardRepository.findAll();
    }

    /**
     * Get all the cards with type.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<Card> findWithType() {
        log.debug("Request to get all Cards with type");
        return cardRepository.findWithType();
    }

    /**
     * Get all the cards with bank.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<Card> findWithBank() {
        log.debug("Request to get all Cards with bank");
        return cardRepository.findWithBank();
    }

    /**
     * Get all the cards with providers.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<Card> findWithProviders() {
        log.debug("Request to get all Cards with providers");
        return cardRepository.findWithProviders();
    }

    /**
     * Get all the cards with type and providers.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<Card> findWithTypeAndProviders() {
        log.debug("Request to get all Cards with type and providers");
        return cardRepository.findWithTypeAndProviders();
    }
    
    /**
     * Get all the cards with type and banks.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<Card> findWithTypeAndBanks() {
        log.debug("Request to get all Cards with type and banks");
        return cardRepository.findWithTypeAndBanks();
    }

    /**
     * Get all the cards with type, bank and providers.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<Card> findWithTypeAndBankAndProviders() {
        log.debug("Request to get all Cards with type, bank and providers");
        return cardRepository.findWithTypeAndBankAndProviders();
    }

    /**
     * Get one card by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Card findOne(Long id) {
        log.debug("Request to get Card : {}", id);
        return cardRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the card by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Card : {}", id);
        cardRepository.delete(id);
    }
}
