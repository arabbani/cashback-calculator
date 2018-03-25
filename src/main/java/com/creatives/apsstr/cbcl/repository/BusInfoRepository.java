package com.creatives.apsstr.cbcl.repository;

import com.creatives.apsstr.cbcl.domain.BusInfo;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the BusInfo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BusInfoRepository extends JpaRepository<BusInfo, Long> {
    @Query("select distinct bus_info from BusInfo bus_info left join fetch bus_info.froms left join fetch bus_info.tos")
    List<BusInfo> findAllWithEagerRelationships();

    @Query("select bus_info from BusInfo bus_info left join fetch bus_info.froms left join fetch bus_info.tos where bus_info.id =:id")
    BusInfo findOneWithEagerRelationships(@Param("id") Long id);

}
