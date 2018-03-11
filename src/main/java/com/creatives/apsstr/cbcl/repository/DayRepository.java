package com.creatives.apsstr.cbcl.repository;

import com.creatives.apsstr.cbcl.domain.Day;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Day entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DayRepository extends JpaRepository<Day, Long> {

}
