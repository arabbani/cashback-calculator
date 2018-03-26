package com.creatives.apsstr.cbcl.repository;

import java.util.List;

import com.creatives.apsstr.cbcl.domain.Offer;
import com.creatives.apsstr.cbcl.helper.constants.OfferRepositoryConstants;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Offer entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OfferRepository extends JpaRepository<Offer, Long> {

    @Query(OfferRepositoryConstants.ADMIN_VIEW_SINGLE)
    Offer findOneWithEagerRelationships(@Param("id") Long id);

    @Query(OfferRepositoryConstants.SELF)
    List<Offer> findAllForAdminList();

    @Query(OfferRepositoryConstants.CASHBACK_REECHARGE_WITH_CHILDS)
    List<Offer> cashbackReechargeWithReechargeCondition(@Param("active") boolean active, @Param("dummy") boolean dummy,
            @Param("subCategoryId") Long subCategoryId, @Param("dateTime") String dateTime,
            @Param("serviceProviderId") Long serviceProviderId, @Param("circleId") Long circleId,
            @Param("reechargePlaneTypeId") Long reechargePlaneTypeId);

    @Query(OfferRepositoryConstants.CASHBACK_REECHARGE_COMMON)
    List<Offer> cashbackReechargeCommon(@Param("active") boolean active, @Param("dummy") boolean dummy,
            @Param("subCategoryId") Long subCategoryId, @Param("dateTime") String dateTime,
            @Param("serviceProviderId") Long serviceProviderId);

}
