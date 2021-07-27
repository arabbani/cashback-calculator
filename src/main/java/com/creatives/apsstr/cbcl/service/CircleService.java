package com.creatives.apsstr.cbcl.service;

import com.creatives.apsstr.cbcl.domain.Circle;
import com.creatives.apsstr.cbcl.repository.CircleRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service Implementation for managing Circle.
 */
@Service
@Transactional
public class CircleService {

    private final Logger log = LoggerFactory.getLogger(CircleService.class);

    private final CircleRepository circleRepository;

    public CircleService(CircleRepository circleRepository) {
        this.circleRepository = circleRepository;
    }

    /**
     * Save a circle.
     *
     * @param circle the entity to save
     * @return the persisted entity
     */
    public Circle save(Circle circle) {
        log.debug("Request to save Circle : {}", circle);
        return circleRepository.save(circle);
    }

    /**
     * Get all the circles.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<Circle> findAll() {
        log.debug("Request to get all Circles");
        return circleRepository.findAll();
    }

    /**
     * Get one circle by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Circle findOne(Long id) {
        log.debug("Request to get Circle : {}", id);
        return circleRepository.findOne(id);
    }

    /**
     * Delete the circle by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Circle : {}", id);
        circleRepository.delete(id);
    }
}
