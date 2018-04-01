package com.creatives.apsstr.cbcl.repository;

import java.util.List;

import com.creatives.apsstr.cbcl.domain.Bank;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.jpa.repository.EntityGraph.EntityGraphType;

/**
 * Spring Data JPA repository for the Bank entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BankRepository extends JpaRepository<Bank, Long> {

    @EntityGraph(attributePaths = { "type" })
    @Query("select distinct bank from Bank bank")
    List<Bank> findAllWithType();

    @EntityGraph(attributePaths = { "cards" })
    @Query("select distinct bank from Bank bank")
    List<Bank> findAllWithCards();

    @EntityGraph(attributePaths = { "cards", "type" })
    @Query("select distinct bank from Bank bank")
	List<Bank> findAllWithTypeAndCards();

}
