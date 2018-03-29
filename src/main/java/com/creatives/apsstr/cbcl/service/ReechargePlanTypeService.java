package com.creatives.apsstr.cbcl.service;

import com.creatives.apsstr.cbcl.domain.ReechargePlanType;
import com.creatives.apsstr.cbcl.repository.ReechargePlanTypeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service Implementation for managing ReechargePlanType.
 */
@Service
@Transactional
public class ReechargePlanTypeService {

    private final Logger log = LoggerFactory.getLogger(ReechargePlanTypeService.class);

    private final ReechargePlanTypeRepository reechargePlanTypeRepository;

    public ReechargePlanTypeService(ReechargePlanTypeRepository reechargePlanTypeRepository) {
        this.reechargePlanTypeRepository = reechargePlanTypeRepository;
    }

    /**
     * Save a reechargePlanType.
     *
     * @param reechargePlanType the entity to save
     * @return the persisted entity
     */
    public ReechargePlanType save(ReechargePlanType reechargePlanType) {
        log.debug("Request to save ReechargePlanType : {}", reechargePlanType);
        return reechargePlanTypeRepository.save(reechargePlanType);
    }

    /**
     * Get all the reechargePlanTypes.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<ReechargePlanType> findAll() {
        log.debug("Request to get all ReechargePlanTypes");
        return reechargePlanTypeRepository.findAll();
    }

    /**
     * Get one reechargePlanType by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public ReechargePlanType findOne(Long id) {
        log.debug("Request to get ReechargePlanType : {}", id);
        return reechargePlanTypeRepository.findOne(id);
    }

    /**
     * Delete the reechargePlanType by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete ReechargePlanType : {}", id);
        reechargePlanTypeRepository.delete(id);
    }
}
