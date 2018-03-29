package com.creatives.apsstr.cbcl.service;

import com.creatives.apsstr.cbcl.domain.SubCategory;
import com.creatives.apsstr.cbcl.repository.SubCategoryRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service Implementation for managing SubCategory.
 */
@Service
@Transactional
public class SubCategoryService {

    private final Logger log = LoggerFactory.getLogger(SubCategoryService.class);

    private final SubCategoryRepository subCategoryRepository;

    public SubCategoryService(SubCategoryRepository subCategoryRepository) {
        this.subCategoryRepository = subCategoryRepository;
    }

    /**
     * Save a subCategory.
     *
     * @param subCategory the entity to save
     * @return the persisted entity
     */
    public SubCategory save(SubCategory subCategory) {
        log.debug("Request to save SubCategory : {}", subCategory);
        return subCategoryRepository.save(subCategory);
    }

    /**
     * Get all the subCategories.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<SubCategory> findAll() {
        log.debug("Request to get all SubCategories");
        return subCategoryRepository.findAll();
    }

    /**
     * Get one subCategory by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public SubCategory findOne(Long id) {
        log.debug("Request to get SubCategory : {}", id);
        return subCategoryRepository.findOne(id);
    }

    /**
     * Delete the subCategory by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete SubCategory : {}", id);
        subCategoryRepository.delete(id);
    }
}
