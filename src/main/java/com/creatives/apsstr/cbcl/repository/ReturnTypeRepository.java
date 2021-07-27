package com.creatives.apsstr.cbcl.repository;

import com.creatives.apsstr.cbcl.domain.ReturnType;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the ReturnType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ReturnTypeRepository extends JpaRepository<ReturnType, Long> {

}
