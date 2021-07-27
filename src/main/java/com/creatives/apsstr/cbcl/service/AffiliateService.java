package com.creatives.apsstr.cbcl.service;

import com.creatives.apsstr.cbcl.domain.Affiliate;
import com.creatives.apsstr.cbcl.repository.AffiliateRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service Implementation for managing Affiliate.
 */
@Service
@Transactional
public class AffiliateService {

    private final Logger log = LoggerFactory.getLogger(AffiliateService.class);

    private final AffiliateRepository affiliateRepository;

    public AffiliateService(AffiliateRepository affiliateRepository) {
        this.affiliateRepository = affiliateRepository;
    }

    /**
     * Save a affiliate.
     *
     * @param affiliate the entity to save
     * @return the persisted entity
     */
    public Affiliate save(Affiliate affiliate) {
        log.debug("Request to save Affiliate : {}", affiliate);
        return affiliateRepository.save(affiliate);
    }

    /**
     * Get all the affiliates.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<Affiliate> findAll() {
        log.debug("Request to get all Affiliates");
        return affiliateRepository.findAll();
    }

    /**
     * Get one affiliate by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Affiliate findOne(Long id) {
        log.debug("Request to get Affiliate : {}", id);
        return affiliateRepository.findOne(id);
    }

    /**
     * Delete the affiliate by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Affiliate : {}", id);
        affiliateRepository.delete(id);
    }
}
