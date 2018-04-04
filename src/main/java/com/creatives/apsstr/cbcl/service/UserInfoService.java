package com.creatives.apsstr.cbcl.service;

import com.creatives.apsstr.cbcl.domain.UserInfo;
import com.creatives.apsstr.cbcl.repository.UserInfoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service Implementation for managing UserInfo.
 */
@Service
@Transactional
public class UserInfoService {

    private final Logger log = LoggerFactory.getLogger(UserInfoService.class);

    private final UserInfoRepository userInfoRepository;

    public UserInfoService(UserInfoRepository userInfoRepository) {
        this.userInfoRepository = userInfoRepository;
    }

    /**
     * Save a userInfo.
     *
     * @param userInfo the entity to save
     * @return the persisted entity
     */
    public UserInfo save(UserInfo userInfo) {
        log.debug("Request to save UserInfo : {}", userInfo);
        return userInfoRepository.save(userInfo);
    }

    /**
     * Get all the userInfos.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<UserInfo> findAll() {
        log.debug("Request to get all UserInfos");
        return userInfoRepository.findWithEagerRelationships();
    }

    /**
     * Get one userInfo by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public UserInfo findOne(Long id) {
        log.debug("Request to get UserInfo : {}", id);
        return userInfoRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the userInfo by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete UserInfo : {}", id);
        userInfoRepository.delete(id);
    }
}
