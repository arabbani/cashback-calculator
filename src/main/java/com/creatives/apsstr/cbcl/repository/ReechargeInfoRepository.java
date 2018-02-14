package com.creatives.apsstr.cbcl.repository;

import com.creatives.apsstr.cbcl.domain.ReechargeInfo;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the ReechargeInfo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ReechargeInfoRepository extends JpaRepository<ReechargeInfo, Long> {
    @Query("select distinct reecharge_info from ReechargeInfo reecharge_info left join fetch reecharge_info.circles")
    List<ReechargeInfo> findAllWithEagerRelationships();

    @Query("select reecharge_info from ReechargeInfo reecharge_info left join fetch reecharge_info.circles where reecharge_info.id =:id")
    ReechargeInfo findOneWithEagerRelationships(@Param("id") Long id);

}
