package com.creatives.apsstr.cbcl.service;

import com.creatives.apsstr.cbcl.domain.ReturnType;
import com.creatives.apsstr.cbcl.repository.ReturnTypeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service Implementation for managing ReturnType.
 */
@Service
@Transactional
public class ReturnTypeService {

    private final Logger log = LoggerFactory.getLogger(ReturnTypeService.class);

    private final ReturnTypeRepository returnTypeRepository;

    public ReturnTypeService(ReturnTypeRepository returnTypeRepository) {
        this.returnTypeRepository = returnTypeRepository;
    }

    /**
     * Save a returnType.
     *
     * @param returnType the entity to save
     * @return the persisted entity
     */
    public ReturnType save(ReturnType returnType) {
        log.debug("Request to save ReturnType : {}", returnType);
        return returnTypeRepository.save(returnType);
    }

    /**
     * Get all the returnTypes.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<ReturnType> findAll() {
        log.debug("Request to get all ReturnTypes");
        return returnTypeRepository.findAll();
    }

    /**
     * Get one returnType by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public ReturnType findOne(Long id) {
        log.debug("Request to get ReturnType : {}", id);
        return returnTypeRepository.findOne(id);
    }

    /**
     * Delete the returnType by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete ReturnType : {}", id);
        returnTypeRepository.delete(id);
    }
}
