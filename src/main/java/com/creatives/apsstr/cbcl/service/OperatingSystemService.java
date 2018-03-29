package com.creatives.apsstr.cbcl.service;

import com.creatives.apsstr.cbcl.domain.OperatingSystem;
import com.creatives.apsstr.cbcl.repository.OperatingSystemRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service Implementation for managing OperatingSystem.
 */
@Service
@Transactional
public class OperatingSystemService {

    private final Logger log = LoggerFactory.getLogger(OperatingSystemService.class);

    private final OperatingSystemRepository operatingSystemRepository;

    public OperatingSystemService(OperatingSystemRepository operatingSystemRepository) {
        this.operatingSystemRepository = operatingSystemRepository;
    }

    /**
     * Save a operatingSystem.
     *
     * @param operatingSystem the entity to save
     * @return the persisted entity
     */
    public OperatingSystem save(OperatingSystem operatingSystem) {
        log.debug("Request to save OperatingSystem : {}", operatingSystem);
        return operatingSystemRepository.save(operatingSystem);
    }

    /**
     * Get all the operatingSystems.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<OperatingSystem> findAll() {
        log.debug("Request to get all OperatingSystems");
        return operatingSystemRepository.findAll();
    }

    /**
     * Get one operatingSystem by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public OperatingSystem findOne(Long id) {
        log.debug("Request to get OperatingSystem : {}", id);
        return operatingSystemRepository.findOne(id);
    }

    /**
     * Delete the operatingSystem by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete OperatingSystem : {}", id);
        operatingSystemRepository.delete(id);
    }
}
