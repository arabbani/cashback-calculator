package com.creatives.apsstr.cbcl.repository;

import com.creatives.apsstr.cbcl.domain.CardProvider;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the CardProvider entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CardProviderRepository extends JpaRepository<CardProvider, Long> {

}
