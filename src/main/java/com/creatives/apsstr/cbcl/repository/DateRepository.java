package com.creatives.apsstr.cbcl.repository;

import com.creatives.apsstr.cbcl.domain.Date;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Date entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DateRepository extends JpaRepository<Date, Long> {

}
