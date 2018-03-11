package com.creatives.apsstr.cbcl.repository;

import com.creatives.apsstr.cbcl.domain.Merchant;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the Merchant entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MerchantRepository extends JpaRepository<Merchant, Long> {
    @Query("select distinct merchant from Merchant merchant left join fetch merchant.subCategories")
    List<Merchant> findAllWithEagerRelationships();

    @Query("select merchant from Merchant merchant left join fetch merchant.subCategories where merchant.id =:id")
    Merchant findOneWithEagerRelationships(@Param("id") Long id);

}
