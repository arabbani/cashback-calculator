package com.creatives.apsstr.cbcl.service;

import com.creatives.apsstr.cbcl.domain.Merchant;
import com.creatives.apsstr.cbcl.repository.MerchantRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service Implementation for managing Merchant.
 */
@Service
@Transactional
public class MerchantService {

    private final Logger log = LoggerFactory.getLogger(MerchantService.class);

    private final MerchantRepository merchantRepository;

    public MerchantService(MerchantRepository merchantRepository) {
        this.merchantRepository = merchantRepository;
    }

    /**
     * Save a merchant.
     *
     * @param merchant the entity to save
     * @return the persisted entity
     */
    public Merchant save(Merchant merchant) {
        log.debug("Request to save Merchant : {}", merchant);
        return merchantRepository.save(merchant);
    }

    /**
     * Get all the merchants.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<Merchant> findAll() {
        log.debug("Request to get all Merchants");
        return merchantRepository.findAll();
    }

    /**
     * Get all the merchants with subCategories.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<Merchant> findWithSubCategories() {
        log.debug("Request to get all Merchants with subCategories");
        return merchantRepository.findWithSubCategories();
    }

    /**
     * Get one merchant by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Merchant findOne(Long id) {
        log.debug("Request to get Merchant : {}", id);
        return merchantRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the merchant by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Merchant : {}", id);
        merchantRepository.delete(id);
    }
}
