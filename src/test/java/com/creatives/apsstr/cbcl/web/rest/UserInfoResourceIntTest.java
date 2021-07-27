package com.creatives.apsstr.cbcl.web.rest;

import com.creatives.apsstr.cbcl.CbclApp;

import com.creatives.apsstr.cbcl.domain.UserInfo;
import com.creatives.apsstr.cbcl.repository.UserInfoRepository;
import com.creatives.apsstr.cbcl.service.UserInfoService;
import com.creatives.apsstr.cbcl.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static com.creatives.apsstr.cbcl.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the UserInfoResource REST controller.
 *
 * @see UserInfoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CbclApp.class)
public class UserInfoResourceIntTest {

    @Autowired
    private UserInfoRepository userInfoRepository;

    @Autowired
    private UserInfoService userInfoService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restUserInfoMockMvc;

    private UserInfo userInfo;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final UserInfoResource userInfoResource = new UserInfoResource(userInfoService);
        this.restUserInfoMockMvc = MockMvcBuilders.standaloneSetup(userInfoResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UserInfo createEntity(EntityManager em) {
        UserInfo userInfo = new UserInfo();
        return userInfo;
    }

    @Before
    public void initTest() {
        userInfo = createEntity(em);
    }

    @Test
    @Transactional
    public void createUserInfo() throws Exception {
        int databaseSizeBeforeCreate = userInfoRepository.findAll().size();

        // Create the UserInfo
        restUserInfoMockMvc.perform(post("/api/user-infos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userInfo)))
            .andExpect(status().isCreated());

        // Validate the UserInfo in the database
        List<UserInfo> userInfoList = userInfoRepository.findAll();
        assertThat(userInfoList).hasSize(databaseSizeBeforeCreate + 1);
        UserInfo testUserInfo = userInfoList.get(userInfoList.size() - 1);
    }

    @Test
    @Transactional
    public void createUserInfoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = userInfoRepository.findAll().size();

        // Create the UserInfo with an existing ID
        userInfo.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUserInfoMockMvc.perform(post("/api/user-infos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userInfo)))
            .andExpect(status().isBadRequest());

        // Validate the UserInfo in the database
        List<UserInfo> userInfoList = userInfoRepository.findAll();
        assertThat(userInfoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllUserInfos() throws Exception {
        // Initialize the database
        userInfoRepository.saveAndFlush(userInfo);

        // Get all the userInfoList
        restUserInfoMockMvc.perform(get("/api/user-infos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(userInfo.getId().intValue())));
    }

    @Test
    @Transactional
    public void getUserInfo() throws Exception {
        // Initialize the database
        userInfoRepository.saveAndFlush(userInfo);

        // Get the userInfo
        restUserInfoMockMvc.perform(get("/api/user-infos/{id}", userInfo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(userInfo.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingUserInfo() throws Exception {
        // Get the userInfo
        restUserInfoMockMvc.perform(get("/api/user-infos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUserInfo() throws Exception {
        // Initialize the database
        userInfoService.save(userInfo);

        int databaseSizeBeforeUpdate = userInfoRepository.findAll().size();

        // Update the userInfo
        UserInfo updatedUserInfo = userInfoRepository.findOne(userInfo.getId());
        // Disconnect from session so that the updates on updatedUserInfo are not directly saved in db
        em.detach(updatedUserInfo);

        restUserInfoMockMvc.perform(put("/api/user-infos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedUserInfo)))
            .andExpect(status().isOk());

        // Validate the UserInfo in the database
        List<UserInfo> userInfoList = userInfoRepository.findAll();
        assertThat(userInfoList).hasSize(databaseSizeBeforeUpdate);
        UserInfo testUserInfo = userInfoList.get(userInfoList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingUserInfo() throws Exception {
        int databaseSizeBeforeUpdate = userInfoRepository.findAll().size();

        // Create the UserInfo

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restUserInfoMockMvc.perform(put("/api/user-infos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userInfo)))
            .andExpect(status().isCreated());

        // Validate the UserInfo in the database
        List<UserInfo> userInfoList = userInfoRepository.findAll();
        assertThat(userInfoList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteUserInfo() throws Exception {
        // Initialize the database
        userInfoService.save(userInfo);

        int databaseSizeBeforeDelete = userInfoRepository.findAll().size();

        // Get the userInfo
        restUserInfoMockMvc.perform(delete("/api/user-infos/{id}", userInfo.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<UserInfo> userInfoList = userInfoRepository.findAll();
        assertThat(userInfoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(UserInfo.class);
        UserInfo userInfo1 = new UserInfo();
        userInfo1.setId(1L);
        UserInfo userInfo2 = new UserInfo();
        userInfo2.setId(userInfo1.getId());
        assertThat(userInfo1).isEqualTo(userInfo2);
        userInfo2.setId(2L);
        assertThat(userInfo1).isNotEqualTo(userInfo2);
        userInfo1.setId(null);
        assertThat(userInfo1).isNotEqualTo(userInfo2);
    }
}
