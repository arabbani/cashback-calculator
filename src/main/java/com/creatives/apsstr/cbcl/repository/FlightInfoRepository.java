package com.creatives.apsstr.cbcl.repository;

import com.creatives.apsstr.cbcl.domain.FlightInfo;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the FlightInfo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FlightInfoRepository extends JpaRepository<FlightInfo, Long> {
    @Query("select distinct flight_info from FlightInfo flight_info left join fetch flight_info.types left join fetch flight_info.origins left join fetch flight_info.travelClasses")
    List<FlightInfo> findAllWithEagerRelationships();

    @Query("select flight_info from FlightInfo flight_info left join fetch flight_info.types left join fetch flight_info.origins left join fetch flight_info.travelClasses where flight_info.id =:id")
    FlightInfo findOneWithEagerRelationships(@Param("id") Long id);

}
