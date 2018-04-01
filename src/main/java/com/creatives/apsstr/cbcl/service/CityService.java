package com.creatives.apsstr.cbcl.service;

import com.creatives.apsstr.cbcl.domain.City;
import com.creatives.apsstr.cbcl.repository.CityRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service Implementation for managing City.
 */
@Service
@Transactional
public class CityService {

    private final Logger log = LoggerFactory.getLogger(CityService.class);

    private final CityRepository cityRepository;

    public CityService(CityRepository cityRepository) {
        this.cityRepository = cityRepository;
    }

    /**
     * Save a city.
     *
     * @param city the entity to save
     * @return the persisted entity
     */
    public City save(City city) {
        log.debug("Request to save City : {}", city);
        return cityRepository.save(city);
    }

    /**
     * Get all the cities.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<City> findAll() {
        log.debug("Request to get all Cities");
        return cityRepository.findAll();
    }

    /**
     * Get all the cities with state.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<City> findAllWithState() {
        log.debug("Request to get all Cities with state");
        return cityRepository.findAllWithState();
    }

    /**
     * Get one city by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public City findOne(Long id) {
        log.debug("Request to get City : {}", id);
        return cityRepository.findOne(id);
    }

    /**
     * Delete the city by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete City : {}", id);
        cityRepository.delete(id);
    }
}
