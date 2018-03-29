package com.creatives.apsstr.cbcl.service;

import com.creatives.apsstr.cbcl.domain.Date;
import com.creatives.apsstr.cbcl.repository.DateRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service Implementation for managing Date.
 */
@Service
@Transactional
public class DateService {

    private final Logger log = LoggerFactory.getLogger(DateService.class);

    private final DateRepository dateRepository;

    public DateService(DateRepository dateRepository) {
        this.dateRepository = dateRepository;
    }

    /**
     * Save a date.
     *
     * @param date the entity to save
     * @return the persisted entity
     */
    public Date save(Date date) {
        log.debug("Request to save Date : {}", date);
        return dateRepository.save(date);
    }

    /**
     * Get all the dates.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<Date> findAll() {
        log.debug("Request to get all Dates");
        return dateRepository.findAll();
    }

    /**
     * Get one date by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Date findOne(Long id) {
        log.debug("Request to get Date : {}", id);
        return dateRepository.findOne(id);
    }

    /**
     * Delete the date by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Date : {}", id);
        dateRepository.delete(id);
    }
}
