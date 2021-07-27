package com.creatives.apsstr.cbcl.service;

import com.creatives.apsstr.cbcl.domain.OperatingSystemType;
import com.creatives.apsstr.cbcl.repository.OperatingSystemTypeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service Implementation for managing OperatingSystemType.
 */
@Service
@Transactional
public class OperatingSystemTypeService {

    private final Logger log = LoggerFactory.getLogger(OperatingSystemTypeService.class);

    private final OperatingSystemTypeRepository operatingSystemTypeRepository;

    public OperatingSystemTypeService(OperatingSystemTypeRepository operatingSystemTypeRepository) {
        this.operatingSystemTypeRepository = operatingSystemTypeRepository;
    }

    /**
     * Save a operatingSystemType.
     *
     * @param operatingSystemType the entity to save
     * @return the persisted entity
     */
    public OperatingSystemType save(OperatingSystemType operatingSystemType) {
        log.debug("Request to save OperatingSystemType : {}", operatingSystemType);
        return operatingSystemTypeRepository.save(operatingSystemType);
    }

    /**
     * Get all the operatingSystemTypes.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<OperatingSystemType> findAll() {
        log.debug("Request to get all OperatingSystemTypes");
        return operatingSystemTypeRepository.findAll();
    }

    /**
     * Get one operatingSystemType by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public OperatingSystemType findOne(Long id) {
        log.debug("Request to get OperatingSystemType : {}", id);
        return operatingSystemTypeRepository.findOne(id);
    }

    /**
     * Delete the operatingSystemType by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete OperatingSystemType : {}", id);
        operatingSystemTypeRepository.delete(id);
    }
}
