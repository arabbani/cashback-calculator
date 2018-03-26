package com.creatives.apsstr.cbcl.repository;

import java.util.List;

import com.creatives.apsstr.cbcl.domain.ReechargePlanType;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the ReechargePlanType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ReechargePlanTypeRepository extends JpaRepository<ReechargePlanType, Long> {

    List<ReechargePlanType> findByDataPlan(Boolean dataPlan);

}
