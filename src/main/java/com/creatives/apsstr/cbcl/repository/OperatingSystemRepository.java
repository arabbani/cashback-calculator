package com.creatives.apsstr.cbcl.repository;

import com.creatives.apsstr.cbcl.domain.OperatingSystem;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the OperatingSystem entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OperatingSystemRepository extends JpaRepository<OperatingSystem, Long> {

}
