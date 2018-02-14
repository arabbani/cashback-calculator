package com.creatives.apsstr.cbcl.repository;

import com.creatives.apsstr.cbcl.domain.MainReturn;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the MainReturn entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MainReturnRepository extends JpaRepository<MainReturn, Long> {

}
