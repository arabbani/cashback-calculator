package com.creatives.apsstr.cbcl.repository;

import com.creatives.apsstr.cbcl.domain.OfferPayment;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the OfferPayment entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OfferPaymentRepository extends JpaRepository<OfferPayment, Long> {
    @Query("select distinct offer_payment from OfferPayment offer_payment left join fetch offer_payment.cards")
    List<OfferPayment> findAllWithEagerRelationships();

    @Query("select offer_payment from OfferPayment offer_payment left join fetch offer_payment.cards where offer_payment.id =:id")
    OfferPayment findOneWithEagerRelationships(@Param("id") Long id);

}
