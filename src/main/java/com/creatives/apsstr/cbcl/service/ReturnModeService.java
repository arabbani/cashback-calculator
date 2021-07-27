package com.creatives.apsstr.cbcl.service;

import com.creatives.apsstr.cbcl.domain.ReturnMode;
import com.creatives.apsstr.cbcl.repository.ReturnModeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service Implementation for managing ReturnMode.
 */
@Service
@Transactional
public class ReturnModeService {

    private final Logger log = LoggerFactory.getLogger(ReturnModeService.class);

    private final ReturnModeRepository returnModeRepository;

    public ReturnModeService(ReturnModeRepository returnModeRepository) {
        this.returnModeRepository = returnModeRepository;
    }

    /**
     * Save a returnMode.
     *
     * @param returnMode the entity to save
     * @return the persisted entity
     */
    public ReturnMode save(ReturnMode returnMode) {
        log.debug("Request to save ReturnMode : {}", returnMode);
        return returnModeRepository.save(returnMode);
    }

    /**
     * Get all the returnModes.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<ReturnMode> findAll() {
        log.debug("Request to get all ReturnModes");
        return returnModeRepository.findAll();
    }

    /**
     * Get one returnMode by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public ReturnMode findOne(Long id) {
        log.debug("Request to get ReturnMode : {}", id);
        return returnModeRepository.findOne(id);
    }

    /**
     * Delete the returnMode by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete ReturnMode : {}", id);
        returnModeRepository.delete(id);
    }
}
