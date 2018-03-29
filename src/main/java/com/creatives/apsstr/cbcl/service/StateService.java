package com.creatives.apsstr.cbcl.service;

import com.creatives.apsstr.cbcl.domain.State;
import com.creatives.apsstr.cbcl.repository.StateRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service Implementation for managing State.
 */
@Service
@Transactional
public class StateService {

    private final Logger log = LoggerFactory.getLogger(StateService.class);

    private final StateRepository stateRepository;

    public StateService(StateRepository stateRepository) {
        this.stateRepository = stateRepository;
    }

    /**
     * Save a state.
     *
     * @param state the entity to save
     * @return the persisted entity
     */
    public State save(State state) {
        log.debug("Request to save State : {}", state);
        return stateRepository.save(state);
    }

    /**
     * Get all the states.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<State> findAll() {
        log.debug("Request to get all States");
        return stateRepository.findAll();
    }

    /**
     * Get one state by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public State findOne(Long id) {
        log.debug("Request to get State : {}", id);
        return stateRepository.findOne(id);
    }

    /**
     * Delete the state by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete State : {}", id);
        stateRepository.delete(id);
    }
}
