package com.creatives.apsstr.cbcl.service;

import com.creatives.apsstr.cbcl.domain.AffiliateCredential;
import com.creatives.apsstr.cbcl.repository.AffiliateCredentialRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service Implementation for managing AffiliateCredential.
 */
@Service
@Transactional
public class AffiliateCredentialService {

    private final Logger log = LoggerFactory.getLogger(AffiliateCredentialService.class);

    private final AffiliateCredentialRepository affiliateCredentialRepository;

    public AffiliateCredentialService(AffiliateCredentialRepository affiliateCredentialRepository) {
        this.affiliateCredentialRepository = affiliateCredentialRepository;
    }

    /**
     * Save a affiliateCredential.
     *
     * @param affiliateCredential the entity to save
     * @return the persisted entity
     */
    public AffiliateCredential save(AffiliateCredential affiliateCredential) {
        log.debug("Request to save AffiliateCredential : {}", affiliateCredential);
        return affiliateCredentialRepository.save(affiliateCredential);
    }

    /**
     * Get all the affiliateCredentials.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<AffiliateCredential> findAll() {
        log.debug("Request to get all AffiliateCredentials");
        return affiliateCredentialRepository.findAll();
    }

    /**
     * Get one affiliateCredential by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public AffiliateCredential findOne(Long id) {
        log.debug("Request to get AffiliateCredential : {}", id);
        return affiliateCredentialRepository.findOne(id);
    }

    /**
     * Delete the affiliateCredential by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete AffiliateCredential : {}", id);
        affiliateCredentialRepository.delete(id);
    }
}
