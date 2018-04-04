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

    @Query("select service_provider from ServiceProvider service_provider left join fetch service_provider.subCategories where service_provider.id =:id")
    ServiceProvider findOneWithEagerRelationships(@Param("id") Long id);

    @EntityGraph(attributePaths = { "subCategories" })
    @Query("select distinct serviceProvider from ServiceProvider serviceProvider")
    List<ServiceProvider> findWithSubCategories();

    @EntityGraph(attributePaths = { "subCategories" })
    List<ServiceProvider> findBySubCategories_Code(String code);

}
