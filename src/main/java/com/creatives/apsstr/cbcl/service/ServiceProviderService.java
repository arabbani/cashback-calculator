package com.creatives.apsstr.cbcl.service;

import com.creatives.apsstr.cbcl.domain.ServiceProvider;
import com.creatives.apsstr.cbcl.repository.ServiceProviderRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service Implementation for managing ServiceProvider.
 */
@Service
@Transactional
public class ServiceProviderService {

    private final Logger log = LoggerFactory.getLogger(ServiceProviderService.class);

    private final ServiceProviderRepository serviceProviderRepository;

    public ServiceProviderService(ServiceProviderRepository serviceProviderRepository) {
        this.serviceProviderRepository = serviceProviderRepository;
    }

    /**
     * Save a serviceProvider.
     *
     * @param serviceProvider the entity to save
     * @return the persisted entity
     */
    public ServiceProvider save(ServiceProvider serviceProvider) {
        log.debug("Request to save ServiceProvider : {}", serviceProvider);
        return serviceProviderRepository.save(serviceProvider);
    }

    /**
     * Get all the serviceProviders.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<ServiceProvider> findAll() {
        log.debug("Request to get all ServiceProviders");
        return serviceProviderRepository.findAll();
    }

    /**
     * Get all the serviceProviders with subCategories.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<ServiceProvider> findAllWithSubCategories() {
        log.debug("Request to get all ServiceProviders with subCategories");
        return serviceProviderRepository.findAllWithSubCategories();
    }

    /**
     * Get all the serviceProviders with subCategories by subCategoryCode.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<ServiceProvider> findAllWithSubCategoriesBySubCategoryCode(String code) {
        log.debug("Request to get all ServiceProviders with subCategories by subCategoryCode");
        return serviceProviderRepository.findBySubCategories_Code(code);
    }

    /**
     * Get one serviceProvider by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public ServiceProvider findOne(Long id) {
        log.debug("Request to get ServiceProvider : {}", id);
        return serviceProviderRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the serviceProvider by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete ServiceProvider : {}", id);
        serviceProviderRepository.delete(id);
    }
}
