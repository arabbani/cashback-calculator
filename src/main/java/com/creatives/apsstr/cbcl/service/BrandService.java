package com.creatives.apsstr.cbcl.service;

import com.creatives.apsstr.cbcl.domain.Brand;
import com.creatives.apsstr.cbcl.repository.BrandRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service Implementation for managing Brand.
 */
@Service
@Transactional
public class BrandService {

    private final Logger log = LoggerFactory.getLogger(BrandService.class);

    private final BrandRepository brandRepository;

    public BrandService(BrandRepository brandRepository) {
        this.brandRepository = brandRepository;
    }

    /**
     * Save a brand.
     *
     * @param brand the entity to save
     * @return the persisted entity
     */
    public Brand save(Brand brand) {
        log.debug("Request to save Brand : {}", brand);
        return brandRepository.save(brand);
    }

    /**
     * Get all the brands.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<Brand> findAll() {
        log.debug("Request to get all Brands");
        return brandRepository.findAll();
    }
    
    /**
     * Get all the brands with subCategories.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<Brand> findWithSubCategories() {
        log.debug("Request to get all Brands with subCategories");
        return brandRepository.findWithSubCategories();
    }

    /**
     * Get one brand by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Brand findOne(Long id) {
        log.debug("Request to get Brand : {}", id);
        return brandRepository.findOne(id);
    }

    /**
     * Delete the brand by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Brand : {}", id);
        brandRepository.delete(id);
    }
}
