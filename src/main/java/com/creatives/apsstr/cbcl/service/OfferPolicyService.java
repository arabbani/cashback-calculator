package com.creatives.apsstr.cbcl.service;

import com.creatives.apsstr.cbcl.domain.OfferPolicy;
import com.creatives.apsstr.cbcl.repository.OfferPolicyRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service Implementation for managing OfferPolicy.
 */
@Service
@Transactional
public class OfferPolicyService {

    private final Logger log = LoggerFactory.getLogger(OfferPolicyService.class);

    private final OfferPolicyRepository offerPolicyRepository;

    public OfferPolicyService(OfferPolicyRepository offerPolicyRepository) {
        this.offerPolicyRepository = offerPolicyRepository;
    }

    /**
     * Save a offerPolicy.
     *
     * @param offerPolicy the entity to save
     * @return the persisted entity
     */
    public OfferPolicy save(OfferPolicy offerPolicy) {
        log.debug("Request to save OfferPolicy : {}", offerPolicy);
        return offerPolicyRepository.save(offerPolicy);
    }

    /**
     * Get all the offerPolicies.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<OfferPolicy> findAll() {
        log.debug("Request to get all OfferPolicies");
        return offerPolicyRepository.findAll();
    }

    /**
     * Get one offerPolicy by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public OfferPolicy findOne(Long id) {
        log.debug("Request to get OfferPolicy : {}", id);
        return offerPolicyRepository.findOne(id);
    }

    /**
     * Delete the offerPolicy by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete OfferPolicy : {}", id);
        offerPolicyRepository.delete(id);
    }
}
