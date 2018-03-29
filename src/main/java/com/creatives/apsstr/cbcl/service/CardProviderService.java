package com.creatives.apsstr.cbcl.service;

import com.creatives.apsstr.cbcl.domain.CardProvider;
import com.creatives.apsstr.cbcl.repository.CardProviderRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service Implementation for managing CardProvider.
 */
@Service
@Transactional
public class CardProviderService {

    private final Logger log = LoggerFactory.getLogger(CardProviderService.class);

    private final CardProviderRepository cardProviderRepository;

    public CardProviderService(CardProviderRepository cardProviderRepository) {
        this.cardProviderRepository = cardProviderRepository;
    }

    /**
     * Save a cardProvider.
     *
     * @param cardProvider the entity to save
     * @return the persisted entity
     */
    public CardProvider save(CardProvider cardProvider) {
        log.debug("Request to save CardProvider : {}", cardProvider);
        return cardProviderRepository.save(cardProvider);
    }

    /**
     * Get all the cardProviders.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<CardProvider> findAll() {
        log.debug("Request to get all CardProviders");
        return cardProviderRepository.findAll();
    }

    /**
     * Get one cardProvider by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public CardProvider findOne(Long id) {
        log.debug("Request to get CardProvider : {}", id);
        return cardProviderRepository.findOne(id);
    }

    /**
     * Delete the cardProvider by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete CardProvider : {}", id);
        cardProviderRepository.delete(id);
    }
}
