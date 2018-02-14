package com.creatives.apsstr.cbcl.repository;

import com.creatives.apsstr.cbcl.domain.ReturnInfo;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the ReturnInfo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ReturnInfoRepository extends JpaRepository<ReturnInfo, Long> {

}
