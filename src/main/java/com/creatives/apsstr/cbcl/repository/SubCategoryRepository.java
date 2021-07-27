package com.creatives.apsstr.cbcl.repository;

import java.util.List;

import com.creatives.apsstr.cbcl.domain.SubCategory;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

/**
 * Spring Data JPA repository for the SubCategory entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SubCategoryRepository extends JpaRepository<SubCategory, Long> {

    @EntityGraph(attributePaths = { "category" })
    @Query("select distinct subCategory from SubCategory subCategory")
    List<SubCategory> findWithCategory();

    SubCategory findOneByCode(String code);

}
