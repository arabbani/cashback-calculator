package com.creatives.apsstr.cbcl.repository;

import java.util.List;

import com.creatives.apsstr.cbcl.domain.City;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

/**
 * Spring Data JPA repository for the City entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CityRepository extends JpaRepository<City, Long> {

    @EntityGraph(attributePaths = { "state" })
    @Query("select distinct city from City city")
    List<City> findAllWithState();

}
