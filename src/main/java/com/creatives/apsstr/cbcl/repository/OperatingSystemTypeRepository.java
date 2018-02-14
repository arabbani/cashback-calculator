package com.creatives.apsstr.cbcl.repository;

import com.creatives.apsstr.cbcl.domain.OperatingSystemType;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the OperatingSystemType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OperatingSystemTypeRepository extends JpaRepository<OperatingSystemType, Long> {

}
