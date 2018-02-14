package com.creatives.apsstr.cbcl.repository;

import com.creatives.apsstr.cbcl.domain.CardType;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the CardType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CardTypeRepository extends JpaRepository<CardType, Long> {

}
