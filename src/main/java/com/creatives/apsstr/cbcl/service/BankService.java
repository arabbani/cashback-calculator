package com.creatives.apsstr.cbcl.service;

import com.creatives.apsstr.cbcl.domain.Bank;
import com.creatives.apsstr.cbcl.repository.BankRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service Implementation for managing Bank.
 */
@Service
@Transactional
public class BankService {

    private final Logger log = LoggerFactory.getLogger(BankService.class);

    private final BankRepository bankRepository;

    public BankService(BankRepository bankRepository) {
        this.bankRepository = bankRepository;
    }

    /**
     * Save a bank.
     *
     * @param bank the entity to save
     * @return the persisted entity
     */
    public Bank save(Bank bank) {
        log.debug("Request to save Bank : {}", bank);
        return bankRepository.save(bank);
    }

    /**
     * Get all the banks.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<Bank> findAll() {
        log.debug("Request to get all Banks");
        return bankRepository.findAll();
    }

    /**
     * Get all the banks with type.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<Bank> findAllWithType() {
        log.debug("Request to get all Banks with type");
        return bankRepository.findAllWithType();
    }

    /**
     * Get all the banks with cards.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<Bank> findAllWithCards() {
        log.debug("Request to get all Banks with cards");
        return bankRepository.findAllWithCards();
    }
    
    /**
     * Get all the banks with type and cards.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<Bank> findAllWithTypeAndCards() {
        log.debug("Request to get all Banks with type and cards");
        return bankRepository.findAllWithTypeAndCards();
    }

    /**
     * Get one bank by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Bank findOne(Long id) {
        log.debug("Request to get Bank : {}", id);
        return bankRepository.findOne(id);
    }

    /**
     * Delete the bank by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Bank : {}", id);
        bankRepository.delete(id);
    }

}
