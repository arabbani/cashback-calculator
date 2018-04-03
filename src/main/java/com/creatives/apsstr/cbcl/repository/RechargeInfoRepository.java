package com.creatives.apsstr.cbcl.repository;

import com.creatives.apsstr.cbcl.domain.RechargeInfo;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the RechargeInfo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RechargeInfoRepository extends JpaRepository<RechargeInfo, Long> {
    @Query("select distinct recharge_info from RechargeInfo recharge_info left join fetch recharge_info.circles left join fetch recharge_info.rechargePlanTypes")
    List<RechargeInfo> findAllWithEagerRelationships();

    @Query("select recharge_info from RechargeInfo recharge_info left join fetch recharge_info.circles left join fetch recharge_info.rechargePlanTypes where recharge_info.id =:id")
    RechargeInfo findOneWithEagerRelationships(@Param("id") Long id);

}
