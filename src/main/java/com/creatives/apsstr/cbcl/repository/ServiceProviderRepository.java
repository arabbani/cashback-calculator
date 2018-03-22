package com.creatives.apsstr.cbcl.repository;

import com.creatives.apsstr.cbcl.domain.ServiceProvider;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the ServiceProvider entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ServiceProviderRepository extends JpaRepository<ServiceProvider, Long> {
    @Query("select distinct service_provider from ServiceProvider service_provider left join fetch service_provider.subCategories")
    List<ServiceProvider> findAllWithEagerRelationships();

    @Query("select service_provider from ServiceProvider service_provider left join fetch service_provider.subCategories where service_provider.id =:id")
    ServiceProvider findOneWithEagerRelationships(@Param("id") Long id);

    @Query("select service_provider from ServiceProvider service_provider left join fetch service_provider.subCategories subCategories where subCategories.code =:subCategoryCode")
	List<ServiceProvider> findBySubCategoryCode(@Param("subCategoryCode") String subCategoryCode);

}
