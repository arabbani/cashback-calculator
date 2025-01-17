package com.creatives.apsstr.cbcl.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.creatives.apsstr.cbcl.domain.ServiceProvider;
import com.creatives.apsstr.cbcl.security.AuthoritiesConstants;
import com.creatives.apsstr.cbcl.service.ServiceProviderService;
import com.creatives.apsstr.cbcl.web.rest.errors.BadRequestAlertException;
import com.creatives.apsstr.cbcl.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing ServiceProvider.
 */
@RestController
@RequestMapping("/api")
public class ServiceProviderResource {

    private final Logger log = LoggerFactory.getLogger(ServiceProviderResource.class);

    private static final String ENTITY_NAME = "serviceProvider";

    private final ServiceProviderService serviceProviderService;

    public ServiceProviderResource(ServiceProviderService serviceProviderService) {
        this.serviceProviderService = serviceProviderService;
    }

    /**
     * POST  /service-providers : Create a new serviceProvider.
     *
     * @param serviceProvider the serviceProvider to create
     * @return the ResponseEntity with status 201 (Created) and with body the new serviceProvider, or with status 400 (Bad Request) if the serviceProvider has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/service-providers")
    @Timed
    @Secured(AuthoritiesConstants.ADMIN)
    public ResponseEntity<ServiceProvider> create(@Valid @RequestBody ServiceProvider serviceProvider)
            throws URISyntaxException {
        log.debug("REST request to save ServiceProvider : {}", serviceProvider);
        if (serviceProvider.getId() != null) {
            throw new BadRequestAlertException("A new serviceProvider cannot already have an ID", ENTITY_NAME,
                    "idexists");
        }
        ServiceProvider result = serviceProviderService.save(serviceProvider);
        return ResponseEntity.created(new URI("/api/service-providers/" + result.getId()))
                .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString())).body(result);
    }

    /**
     * PUT  /service-providers : Updates an existing serviceProvider.
     *
     * @param serviceProvider the serviceProvider to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated serviceProvider,
     * or with status 400 (Bad Request) if the serviceProvider is not valid,
     * or with status 500 (Internal Server Error) if the serviceProvider couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/service-providers")
    @Timed
    @Secured(AuthoritiesConstants.ADMIN)
    public ResponseEntity<ServiceProvider> update(@Valid @RequestBody ServiceProvider serviceProvider)
            throws URISyntaxException {
        log.debug("REST request to update ServiceProvider : {}", serviceProvider);
        if (serviceProvider.getId() == null) {
            return create(serviceProvider);
        }
        ServiceProvider result = serviceProviderService.save(serviceProvider);
        return ResponseEntity.ok()
                .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, serviceProvider.getId().toString()))
                .body(result);
    }

    /**
     * GET  /service-providers : get all the serviceProviders.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of serviceProviders in body
     */
    @GetMapping("/service-providers")
    @Timed
    public List<ServiceProvider> findAll() {
        log.debug("REST request to get all ServiceProviders");
        return serviceProviderService.findAll();
    }

    /**
    * GET  /service-providers/with/subCategories : get all the serviceProviders with subCategories.
    *
    * @return the ResponseEntity with status 200 (OK) and the list of serviceProviders in body
    */
    @GetMapping("/service-providers/with/subCategories")
    @Timed
    public List<ServiceProvider> findWithSubCategories() {
        log.debug("REST request to get all ServiceProviders with subCategories");
        return serviceProviderService.findWithSubCategories();
    }

    /**
    * GET  /service-providers/by/subCategoryCode/:code : get all the serviceProviders with subCategories by subCategoryCode.
    *
    * @return the ResponseEntity with status 200 (OK) and the list of serviceProviders in body
    */
    @GetMapping("/service-providers/by/subCategoryCode/{code}")
    @Timed
    public List<ServiceProvider> findWithSubCategoriesBySubCategoryCode(@PathVariable String code) {
        log.debug("REST request to get all ServiceProviders with subCategories with subCategories by subCategoryCode");
        return serviceProviderService.findWithSubCategoriesBySubCategoryCode(code);
    }

    /**
     * GET  /service-providers/:id : get the "id" serviceProvider.
     *
     * @param id the id of the serviceProvider to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the serviceProvider, or with status 404 (Not Found)
     */
    @GetMapping("/service-providers/{id}")
    @Timed
    @Secured(AuthoritiesConstants.ADMIN)
    public ResponseEntity<ServiceProvider> findOne(@PathVariable Long id) {
        log.debug("REST request to get ServiceProvider : {}", id);
        ServiceProvider serviceProvider = serviceProviderService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(serviceProvider));
    }

    /**
     * DELETE  /service-providers/:id : delete the "id" serviceProvider.
     *
     * @param id the id of the serviceProvider to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/service-providers/{id}")
    @Timed
    @Secured(AuthoritiesConstants.ADMIN)
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        log.debug("REST request to delete ServiceProvider : {}", id);
        serviceProviderService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
