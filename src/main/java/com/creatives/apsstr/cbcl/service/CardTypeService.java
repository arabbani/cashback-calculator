package com.creatives.apsstr.cbcl.service;

import com.creatives.apsstr.cbcl.domain.CardType;
import com.creatives.apsstr.cbcl.repository.CardTypeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service Implementation for managing CardType.
 */
@Service
@Transactional
public class CardTypeService {

    private final Logger log = LoggerFactory.getLogger(CardTypeService.class);

    private final CardTypeRepository cardTypeRepository;

    public CardTypeService(CardTypeRepository cardTypeRepository) {
        this.cardTypeRepository = cardTypeRepository;
    }

    /**
     * Save a cardType.
     *
     * @param cardType the entity to save
     * @return the persisted entity
     */
    public CardType save(CardType cardType) {
        log.debug("Request to save CardType : {}", cardType);
        return cardTypeRepository.save(cardType);
    }

    /**
     * Get all the cardTypes.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<CardType> findAll() {
        log.debug("Request to get all CardTypes");
        return cardTypeRepository.findAll();
    }

    /**
     * Get one cardType by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public CardType findOne(Long id) {
        log.debug("Request to get CardType : {}", id);
        return cardTypeRepository.findOne(id);
    }

    /**
     * Delete the cardType by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete CardType : {}", id);
        cardTypeRepository.delete(id);
    }
}
