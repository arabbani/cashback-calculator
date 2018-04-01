package com.creatives.apsstr.cbcl.repository;

import java.util.List;

import com.creatives.apsstr.cbcl.domain.Merchant;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Merchant entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MerchantRepository extends JpaRepository<Merchant, Long> {

    @Query("select merchant from Merchant merchant left join fetch merchant.subCategories where merchant.id =:id")
    Merchant findOneWithEagerRelationships(@Param("id") Long id);

    @EntityGraph(attributePaths = { "subCategories" })
    @Query("select distinct merchant from Merchant merchant")
    List<Merchant> findAllWithSubCategories();

}
