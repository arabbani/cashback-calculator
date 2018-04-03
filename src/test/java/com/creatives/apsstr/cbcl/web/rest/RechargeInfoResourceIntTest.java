package com.creatives.apsstr.cbcl.web.rest;

import com.creatives.apsstr.cbcl.CbclApp;

import com.creatives.apsstr.cbcl.domain.RechargeInfo;
import com.creatives.apsstr.cbcl.repository.RechargeInfoRepository;
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
 * Test class for the RechargeInfoResource REST controller.
 *
 * @see RechargeInfoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CbclApp.class)
public class RechargeInfoResourceIntTest {

    @Autowired
    private RechargeInfoRepository rechargeInfoRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restRechargeInfoMockMvc;

    private RechargeInfo rechargeInfo;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RechargeInfoResource rechargeInfoResource = new RechargeInfoResource(rechargeInfoRepository);
        this.restRechargeInfoMockMvc = MockMvcBuilders.standaloneSetup(rechargeInfoResource)
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
    public static RechargeInfo createEntity(EntityManager em) {
        RechargeInfo rechargeInfo = new RechargeInfo();
        return rechargeInfo;
    }

    @Before
    public void initTest() {
        rechargeInfo = createEntity(em);
    }

    @Test
    @Transactional
    public void createRechargeInfo() throws Exception {
        int databaseSizeBeforeCreate = rechargeInfoRepository.findAll().size();

        // Create the RechargeInfo
        restRechargeInfoMockMvc.perform(post("/api/recharge-infos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rechargeInfo)))
            .andExpect(status().isCreated());

        // Validate the RechargeInfo in the database
        List<RechargeInfo> rechargeInfoList = rechargeInfoRepository.findAll();
        assertThat(rechargeInfoList).hasSize(databaseSizeBeforeCreate + 1);
        RechargeInfo testRechargeInfo = rechargeInfoList.get(rechargeInfoList.size() - 1);
    }

    @Test
    @Transactional
    public void createRechargeInfoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = rechargeInfoRepository.findAll().size();

        // Create the RechargeInfo with an existing ID
        rechargeInfo.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRechargeInfoMockMvc.perform(post("/api/recharge-infos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rechargeInfo)))
            .andExpect(status().isBadRequest());

        // Validate the RechargeInfo in the database
        List<RechargeInfo> rechargeInfoList = rechargeInfoRepository.findAll();
        assertThat(rechargeInfoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllRechargeInfos() throws Exception {
        // Initialize the database
        rechargeInfoRepository.saveAndFlush(rechargeInfo);

        // Get all the rechargeInfoList
        restRechargeInfoMockMvc.perform(get("/api/recharge-infos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(rechargeInfo.getId().intValue())));
    }

    @Test
    @Transactional
    public void getRechargeInfo() throws Exception {
        // Initialize the database
        rechargeInfoRepository.saveAndFlush(rechargeInfo);

        // Get the rechargeInfo
        restRechargeInfoMockMvc.perform(get("/api/recharge-infos/{id}", rechargeInfo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(rechargeInfo.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingRechargeInfo() throws Exception {
        // Get the rechargeInfo
        restRechargeInfoMockMvc.perform(get("/api/recharge-infos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRechargeInfo() throws Exception {
        // Initialize the database
        rechargeInfoRepository.saveAndFlush(rechargeInfo);
        int databaseSizeBeforeUpdate = rechargeInfoRepository.findAll().size();

        // Update the rechargeInfo
        RechargeInfo updatedRechargeInfo = rechargeInfoRepository.findOne(rechargeInfo.getId());
        // Disconnect from session so that the updates on updatedRechargeInfo are not directly saved in db
        em.detach(updatedRechargeInfo);

        restRechargeInfoMockMvc.perform(put("/api/recharge-infos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedRechargeInfo)))
            .andExpect(status().isOk());

        // Validate the RechargeInfo in the database
        List<RechargeInfo> rechargeInfoList = rechargeInfoRepository.findAll();
        assertThat(rechargeInfoList).hasSize(databaseSizeBeforeUpdate);
        RechargeInfo testRechargeInfo = rechargeInfoList.get(rechargeInfoList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingRechargeInfo() throws Exception {
        int databaseSizeBeforeUpdate = rechargeInfoRepository.findAll().size();

        // Create the RechargeInfo

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restRechargeInfoMockMvc.perform(put("/api/recharge-infos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rechargeInfo)))
            .andExpect(status().isCreated());

        // Validate the RechargeInfo in the database
        List<RechargeInfo> rechargeInfoList = rechargeInfoRepository.findAll();
        assertThat(rechargeInfoList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteRechargeInfo() throws Exception {
        // Initialize the database
        rechargeInfoRepository.saveAndFlush(rechargeInfo);
        int databaseSizeBeforeDelete = rechargeInfoRepository.findAll().size();

        // Get the rechargeInfo
        restRechargeInfoMockMvc.perform(delete("/api/recharge-infos/{id}", rechargeInfo.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<RechargeInfo> rechargeInfoList = rechargeInfoRepository.findAll();
        assertThat(rechargeInfoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(RechargeInfo.class);
        RechargeInfo rechargeInfo1 = new RechargeInfo();
        rechargeInfo1.setId(1L);
        RechargeInfo rechargeInfo2 = new RechargeInfo();
        rechargeInfo2.setId(rechargeInfo1.getId());
        assertThat(rechargeInfo1).isEqualTo(rechargeInfo2);
        rechargeInfo2.setId(2L);
        assertThat(rechargeInfo1).isNotEqualTo(rechargeInfo2);
        rechargeInfo1.setId(null);
        assertThat(rechargeInfo1).isNotEqualTo(rechargeInfo2);
    }
}
