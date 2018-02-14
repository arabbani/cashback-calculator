package com.creatives.apsstr.cbcl.service;

import com.creatives.apsstr.cbcl.domain.Newsletter;
import com.creatives.apsstr.cbcl.repository.NewsletterRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service Implementation for managing Newsletter.
 */
@Service
@Transactional
public class NewsletterService {

    private final Logger log = LoggerFactory.getLogger(NewsletterService.class);

    private final NewsletterRepository newsletterRepository;

    public NewsletterService(NewsletterRepository newsletterRepository) {
        this.newsletterRepository = newsletterRepository;
    }

    /**
     * Save a newsletter.
     *
     * @param newsletter the entity to save
     * @return the persisted entity
     */
    public Newsletter save(Newsletter newsletter) {
        log.debug("Request to save Newsletter : {}", newsletter);
        return newsletterRepository.save(newsletter);
    }

    /**
     * Get all the newsletters.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<Newsletter> findAll() {
        log.debug("Request to get all Newsletters");
        return newsletterRepository.findAll();
    }

    /**
     * Get one newsletter by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Newsletter findOne(Long id) {
        log.debug("Request to get Newsletter : {}", id);
        return newsletterRepository.findOne(id);
    }

    /**
     * Delete the newsletter by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Newsletter : {}", id);
        newsletterRepository.delete(id);
    }
}
