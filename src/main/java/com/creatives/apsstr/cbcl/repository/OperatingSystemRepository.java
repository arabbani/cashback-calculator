package com.creatives.apsstr.cbcl.repository;

import java.util.List;

import com.creatives.apsstr.cbcl.domain.OperatingSystem;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

/**
 * Spring Data JPA repository for the OperatingSystem entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OperatingSystemRepository extends JpaRepository<OperatingSystem, Long> {

    @EntityGraph(attributePaths = { "type" })
    @Query("select distinct operatingSystem from OperatingSystem operatingSystem")
    List<OperatingSystem> findAllWithType();

}
