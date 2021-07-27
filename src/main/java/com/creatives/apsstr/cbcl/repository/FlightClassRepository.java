package com.creatives.apsstr.cbcl.repository;

import com.creatives.apsstr.cbcl.domain.FlightClass;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the FlightClass entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FlightClassRepository extends JpaRepository<FlightClass, Long> {

}
