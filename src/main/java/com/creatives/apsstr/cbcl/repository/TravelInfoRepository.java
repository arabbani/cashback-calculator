package com.creatives.apsstr.cbcl.repository;

import com.creatives.apsstr.cbcl.domain.TravelInfo;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the TravelInfo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TravelInfoRepository extends JpaRepository<TravelInfo, Long> {
    @Query("select distinct travel_info from TravelInfo travel_info left join fetch travel_info.types")
    List<TravelInfo> findAllWithEagerRelationships();

    @Query("select travel_info from TravelInfo travel_info left join fetch travel_info.types where travel_info.id =:id")
    TravelInfo findOneWithEagerRelationships(@Param("id") Long id);

}
