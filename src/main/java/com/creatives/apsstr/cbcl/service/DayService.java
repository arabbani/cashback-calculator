package com.creatives.apsstr.cbcl.service;

import com.creatives.apsstr.cbcl.domain.Day;
import com.creatives.apsstr.cbcl.repository.DayRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service Implementation for managing Day.
 */
@Service
@Transactional
public class DayService {

    private final Logger log = LoggerFactory.getLogger(DayService.class);

    private final DayRepository dayRepository;

    public DayService(DayRepository dayRepository) {
        this.dayRepository = dayRepository;
    }

    /**
     * Save a day.
     *
     * @param day the entity to save
     * @return the persisted entity
     */
    public Day save(Day day) {
        log.debug("Request to save Day : {}", day);
        return dayRepository.save(day);
    }

    /**
     * Get all the days.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<Day> findAll() {
        log.debug("Request to get all Days");
        return dayRepository.findAll();
    }

    /**
     * Get one day by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Day findOne(Long id) {
        log.debug("Request to get Day : {}", id);
        return dayRepository.findOne(id);
    }

    /**
     * Delete the day by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Day : {}", id);
        dayRepository.delete(id);
    }
}
