package com.creatives.apsstr.cbcl.service;

import com.creatives.apsstr.cbcl.domain.RechargePlanType;
import com.creatives.apsstr.cbcl.repository.RechargePlanTypeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service Implementation for managing RechargePlanType.
 */
@Service
@Transactional
public class RechargePlanTypeService {

    private final Logger log = LoggerFactory.getLogger(RechargePlanTypeService.class);

    private final RechargePlanTypeRepository rechargePlanTypeRepository;

    public RechargePlanTypeService(RechargePlanTypeRepository rechargePlanTypeRepository) {
        this.rechargePlanTypeRepository = rechargePlanTypeRepository;
    }

    /**
     * Save a rechargePlanType.
     *
     * @param rechargePlanType the entity to save
     * @return the persisted entity
     */
    public RechargePlanType save(RechargePlanType rechargePlanType) {
        log.debug("Request to save RechargePlanType : {}", rechargePlanType);
        return rechargePlanTypeRepository.save(rechargePlanType);
    }

    /**
     * Get all the rechargePlanTypes.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<RechargePlanType> findAll() {
        log.debug("Request to get all RechargePlanTypes");
        return rechargePlanTypeRepository.findAll();
    }

    /**
     * Get one rechargePlanType by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public RechargePlanType findOne(Long id) {
        log.debug("Request to get RechargePlanType : {}", id);
        return rechargePlanTypeRepository.findOne(id);
    }

    /**
     * Delete the rechargePlanType by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete RechargePlanType : {}", id);
        rechargePlanTypeRepository.delete(id);
    }

    /**
     * Get all the dataPlans.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<RechargePlanType> findDataPlan() {
        log.debug("Request to get all dataPlans");
        return rechargePlanTypeRepository.findByDataPlanTrue();
    }
}
