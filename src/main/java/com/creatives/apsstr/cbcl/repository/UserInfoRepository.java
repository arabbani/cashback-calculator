package com.creatives.apsstr.cbcl.repository;

import com.creatives.apsstr.cbcl.domain.UserInfo;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the UserInfo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserInfoRepository extends JpaRepository<UserInfo, Long> {
    @Query("select distinct user_info from UserInfo user_info left join fetch user_info.merchants left join fetch user_info.cards left join fetch user_info.operatingSystems")
    List<UserInfo> findWithEagerRelationships();

    @Query("select user_info from UserInfo user_info left join fetch user_info.merchants left join fetch user_info.cards left join fetch user_info.operatingSystems where user_info.id =:id")
    UserInfo findOneWithEagerRelationships(@Param("id") Long id);

}
