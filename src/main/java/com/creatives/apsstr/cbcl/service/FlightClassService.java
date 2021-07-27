package com.creatives.apsstr.cbcl.service;

import com.creatives.apsstr.cbcl.domain.FlightClass;
import com.creatives.apsstr.cbcl.repository.FlightClassRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service Implementation for managing FlightClass.
 */
@Service
@Transactional
public class FlightClassService {

    private final Logger log = LoggerFactory.getLogger(FlightClassService.class);

    private final FlightClassRepository flightClassRepository;

    public FlightClassService(FlightClassRepository flightClassRepository) {
        this.flightClassRepository = flightClassRepository;
    }

    /**
     * Save a flightClass.
     *
     * @param flightClass the entity to save
     * @return the persisted entity
     */
    public FlightClass save(FlightClass flightClass) {
        log.debug("Request to save FlightClass : {}", flightClass);
        return flightClassRepository.save(flightClass);
    }

    /**
     * Get all the flightClasses.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<FlightClass> findAll() {
        log.debug("Request to get all FlightClasses");
        return flightClassRepository.findAll();
    }

    /**
     * Get one flightClass by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public FlightClass findOne(Long id) {
        log.debug("Request to get FlightClass : {}", id);
        return flightClassRepository.findOne(id);
    }

    /**
     * Delete the flightClass by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete FlightClass : {}", id);
        flightClassRepository.delete(id);
    }
}
