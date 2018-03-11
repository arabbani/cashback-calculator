package com.creatives.apsstr.cbcl.repository;

import com.creatives.apsstr.cbcl.domain.BankType;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the BankType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BankTypeRepository extends JpaRepository<BankType, Long> {

}
