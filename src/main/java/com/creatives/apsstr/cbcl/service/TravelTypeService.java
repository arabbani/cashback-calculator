package com.creatives.apsstr.cbcl.service;

import com.creatives.apsstr.cbcl.domain.TravelType;
import com.creatives.apsstr.cbcl.repository.TravelTypeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service Implementation for managing TravelType.
 */
@Service
@Transactional
public class TravelTypeService {

    private final Logger log = LoggerFactory.getLogger(TravelTypeService.class);

    private final TravelTypeRepository travelTypeRepository;

    public TravelTypeService(TravelTypeRepository travelTypeRepository) {
        this.travelTypeRepository = travelTypeRepository;
    }

    /**
     * Save a travelType.
     *
     * @param travelType the entity to save
     * @return the persisted entity
     */
    public TravelType save(TravelType travelType) {
        log.debug("Request to save TravelType : {}", travelType);
        return travelTypeRepository.save(travelType);
    }

    /**
     * Get all the travelTypes.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<TravelType> findAll() {
        log.debug("Request to get all TravelTypes");
        return travelTypeRepository.findAll();
    }

    /**
     * Get one travelType by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public TravelType findOne(Long id) {
        log.debug("Request to get TravelType : {}", id);
        return travelTypeRepository.findOne(id);
    }

    /**
     * Delete the travelType by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete TravelType : {}", id);
        travelTypeRepository.delete(id);
    }
}
