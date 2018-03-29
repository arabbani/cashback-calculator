package com.creatives.apsstr.cbcl.service;

import com.creatives.apsstr.cbcl.domain.OfferType;
import com.creatives.apsstr.cbcl.repository.OfferTypeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service Implementation for managing OfferType.
 */
@Service
@Transactional
public class OfferTypeService {

    private final Logger log = LoggerFactory.getLogger(OfferTypeService.class);

    private final OfferTypeRepository offerTypeRepository;

    public OfferTypeService(OfferTypeRepository offerTypeRepository) {
        this.offerTypeRepository = offerTypeRepository;
    }

    /**
     * Save a offerType.
     *
     * @param offerType the entity to save
     * @return the persisted entity
     */
    public OfferType save(OfferType offerType) {
        log.debug("Request to save OfferType : {}", offerType);
        return offerTypeRepository.save(offerType);
    }

    /**
     * Get all the offerTypes.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<OfferType> findAll() {
        log.debug("Request to get all OfferTypes");
        return offerTypeRepository.findAll();
    }

    /**
     * Get one offerType by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public OfferType findOne(Long id) {
        log.debug("Request to get OfferType : {}", id);
        return offerTypeRepository.findOne(id);
    }

    /**
     * Delete the offerType by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete OfferType : {}", id);
        offerTypeRepository.delete(id);
    }
}
