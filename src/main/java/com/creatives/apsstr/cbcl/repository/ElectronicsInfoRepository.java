package com.creatives.apsstr.cbcl.repository;

import com.creatives.apsstr.cbcl.domain.ElectronicsInfo;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the ElectronicsInfo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ElectronicsInfoRepository extends JpaRepository<ElectronicsInfo, Long> {
    @Query("select distinct electronics_info from ElectronicsInfo electronics_info left join fetch electronics_info.brands")
    List<ElectronicsInfo> findAllWithEagerRelationships();

    @Query("select electronics_info from ElectronicsInfo electronics_info left join fetch electronics_info.brands where electronics_info.id =:id")
    ElectronicsInfo findOneWithEagerRelationships(@Param("id") Long id);

}
