package com.creatives.apsstr.cbcl.service;

import com.creatives.apsstr.cbcl.domain.Offer;
import com.creatives.apsstr.cbcl.helper.projections.OfferForReference;
import com.creatives.apsstr.cbcl.repository.OfferRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service Implementation for managing Offer.
 */
@Service
@Transactional
public class OfferService {

    private final Logger log = LoggerFactory.getLogger(OfferService.class);

    private final OfferRepository offerRepository;

    public OfferService(OfferRepository offerRepository) {
        this.offerRepository = offerRepository;
    }

    /**
     * Save a offer.
     *
     * @param offer the entity to save
     * @return the persisted entity
     */
    public Offer save(Offer offer) {
        log.debug("Request to save Offer : {}", offer);
        return offerRepository.save(offer);
    }

    /**
     * Get all the offers.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<Offer> findAll() {
        log.debug("Request to get all Offers");
        return offerRepository.findAll();
    }

    /**
     * Get all the offers for reference except "id" offer.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<OfferForReference> findForReferenceExclusive(Long id) {
        log.debug("Request to get all offers for reference exclusive");
        return offerRepository.findForReferenceByIdNotAndActiveTrueAndDummyFalse(id);
    }

    /**
     * Get all the offers for reference.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<OfferForReference> findForReference() {
        log.debug("Request to get all offers for reference");
        return offerRepository.findForReferenceByActiveTrueAndDummyFalse();
    }

    /**
     * Get one offer by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Offer findOne(Long id) {
        log.debug("Request to get Offer : {}", id);
        return offerRepository.findOne(id);
    }

    /**
     * Get one offer by id with reechargeInfo.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Offer findWithReechargeInfo(Long id) {
        log.debug("Request to get Offer  with reechargeInfo: {}", id);
        return offerRepository.findOneWithReechargeInfoById(id);
    }

    /**
     * Get one offer by id with flightInfo.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Offer findWithFlightInfo(Long id) {
        log.debug("Request to get Offer  with flightInfo: {}", id);
        return offerRepository.findOneWithFlightInfoById(id);
    }

    /**
     * Get one offer by id with busInfo.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Offer findWithBusInfo(Long id) {
        log.debug("Request to get Offer  with busInfo: {}", id);
        return offerRepository.findOneWithBusInfoById(id);
    }

    /**
     * Get one offer by id for admin view.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Offer findOneForAdminView(Long id) {
        log.debug("Request to get Offer  for admin view: {}", id);
        return offerRepository.findOneForAdminViewById(id);
    }

    /**
     * Delete the offer by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Offer : {}", id);
        offerRepository.delete(id);
    }
}
