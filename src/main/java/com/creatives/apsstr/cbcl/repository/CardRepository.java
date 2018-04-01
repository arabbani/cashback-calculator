package com.creatives.apsstr.cbcl.repository;

import com.creatives.apsstr.cbcl.domain.Card;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the Card entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CardRepository extends JpaRepository<Card, Long> {

    @Query("select card from Card card left join fetch card.cardProviders where card.id =:id")
    Card findOneWithEagerRelationships(@Param("id") Long id);

    @EntityGraph(attributePaths = { "type" })
    @Query("select distinct card from Card card")
    List<Card> findAllWithType();
    
    @EntityGraph(attributePaths = { "bank" })
    @Query("select distinct card from Card card")
	List<Card> findAllWithBank();
    
    @EntityGraph(attributePaths = { "cardProviders" })
    @Query("select distinct card from Card card")
	List<Card> findAllWithProviders();
    
    @EntityGraph(attributePaths = { "type", "cardProviders" })
    @Query("select distinct card from Card card")
	List<Card> findAllWithTypeAndProviders();

    @EntityGraph(attributePaths = { "type", "bank", "cardProviders" })
    @Query("select distinct card from Card card")
	List<Card> findAllWithTypeAndBankAndProviders();

}
