package com.creatives.apsstr.cbcl.service;

import com.creatives.apsstr.cbcl.domain.BankType;
import com.creatives.apsstr.cbcl.repository.BankTypeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service Implementation for managing BankType.
 */
@Service
@Transactional
public class BankTypeService {

    private final Logger log = LoggerFactory.getLogger(BankTypeService.class);

    private final BankTypeRepository bankTypeRepository;

    public BankTypeService(BankTypeRepository bankTypeRepository) {
        this.bankTypeRepository = bankTypeRepository;
    }

    /**
     * Save a bankType.
     *
     * @param bankType the entity to save
     * @return the persisted entity
     */
    public BankType save(BankType bankType) {
        log.debug("Request to save BankType : {}", bankType);
        return bankTypeRepository.save(bankType);
    }

    /**
     * Get all the bankTypes.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<BankType> findAll() {
        log.debug("Request to get all BankTypes");
        return bankTypeRepository.findAll();
    }

    /**
     * Get one bankType by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public BankType findOne(Long id) {
        log.debug("Request to get BankType : {}", id);
        return bankTypeRepository.findOne(id);
    }

    /**
     * Delete the bankType by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete BankType : {}", id);
        bankTypeRepository.delete(id);
    }
}
