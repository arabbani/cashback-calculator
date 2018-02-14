package com.creatives.apsstr.cbcl.web.rest;

import com.creatives.apsstr.cbcl.CbclApp;

import com.creatives.apsstr.cbcl.domain.ReechargeInfo;
import com.creatives.apsstr.cbcl.repository.ReechargeInfoRepository;
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
 * Test class for the ReechargeInfoResource REST controller.
 *
 * @see ReechargeInfoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CbclApp.class)
public class ReechargeInfoResourceIntTest {

    @Autowired
    private ReechargeInfoRepository reechargeInfoRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restReechargeInfoMockMvc;

    private ReechargeInfo reechargeInfo;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ReechargeInfoResource reechargeInfoResource = new ReechargeInfoResource(reechargeInfoRepository);
        this.restReechargeInfoMockMvc = MockMvcBuilders.standaloneSetup(reechargeInfoResource)
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
    public static ReechargeInfo createEntity(EntityManager em) {
        ReechargeInfo reechargeInfo = new ReechargeInfo();
        return reechargeInfo;
    }

    @Before
    public void initTest() {
        reechargeInfo = createEntity(em);
    }

    @Test
    @Transactional
    public void createReechargeInfo() throws Exception {
        int databaseSizeBeforeCreate = reechargeInfoRepository.findAll().size();

        // Create the ReechargeInfo
        restReechargeInfoMockMvc.perform(post("/api/reecharge-infos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reechargeInfo)))
            .andExpect(status().isCreated());

        // Validate the ReechargeInfo in the database
        List<ReechargeInfo> reechargeInfoList = reechargeInfoRepository.findAll();
        assertThat(reechargeInfoList).hasSize(databaseSizeBeforeCreate + 1);
        ReechargeInfo testReechargeInfo = reechargeInfoList.get(reechargeInfoList.size() - 1);
    }

    @Test
    @Transactional
    public void createReechargeInfoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = reechargeInfoRepository.findAll().size();

        // Create the ReechargeInfo with an existing ID
        reechargeInfo.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restReechargeInfoMockMvc.perform(post("/api/reecharge-infos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reechargeInfo)))
            .andExpect(status().isBadRequest());

        // Validate the ReechargeInfo in the database
        List<ReechargeInfo> reechargeInfoList = reechargeInfoRepository.findAll();
        assertThat(reechargeInfoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllReechargeInfos() throws Exception {
        // Initialize the database
        reechargeInfoRepository.saveAndFlush(reechargeInfo);

        // Get all the reechargeInfoList
        restReechargeInfoMockMvc.perform(get("/api/reecharge-infos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(reechargeInfo.getId().intValue())));
    }

    @Test
    @Transactional
    public void getReechargeInfo() throws Exception {
        // Initialize the database
        reechargeInfoRepository.saveAndFlush(reechargeInfo);

        // Get the reechargeInfo
        restReechargeInfoMockMvc.perform(get("/api/reecharge-infos/{id}", reechargeInfo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(reechargeInfo.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingReechargeInfo() throws Exception {
        // Get the reechargeInfo
        restReechargeInfoMockMvc.perform(get("/api/reecharge-infos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateReechargeInfo() throws Exception {
        // Initialize the database
        reechargeInfoRepository.saveAndFlush(reechargeInfo);
        int databaseSizeBeforeUpdate = reechargeInfoRepository.findAll().size();

        // Update the reechargeInfo
        ReechargeInfo updatedReechargeInfo = reechargeInfoRepository.findOne(reechargeInfo.getId());
        // Disconnect from session so that the updates on updatedReechargeInfo are not directly saved in db
        em.detach(updatedReechargeInfo);

        restReechargeInfoMockMvc.perform(put("/api/reecharge-infos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedReechargeInfo)))
            .andExpect(status().isOk());

        // Validate the ReechargeInfo in the database
        List<ReechargeInfo> reechargeInfoList = reechargeInfoRepository.findAll();
        assertThat(reechargeInfoList).hasSize(databaseSizeBeforeUpdate);
        ReechargeInfo testReechargeInfo = reechargeInfoList.get(reechargeInfoList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingReechargeInfo() throws Exception {
        int databaseSizeBeforeUpdate = reechargeInfoRepository.findAll().size();

        // Create the ReechargeInfo

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restReechargeInfoMockMvc.perform(put("/api/reecharge-infos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reechargeInfo)))
            .andExpect(status().isCreated());

        // Validate the ReechargeInfo in the database
        List<ReechargeInfo> reechargeInfoList = reechargeInfoRepository.findAll();
        assertThat(reechargeInfoList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteReechargeInfo() throws Exception {
        // Initialize the database
        reechargeInfoRepository.saveAndFlush(reechargeInfo);
        int databaseSizeBeforeDelete = reechargeInfoRepository.findAll().size();

        // Get the reechargeInfo
        restReechargeInfoMockMvc.perform(delete("/api/reecharge-infos/{id}", reechargeInfo.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ReechargeInfo> reechargeInfoList = reechargeInfoRepository.findAll();
        assertThat(reechargeInfoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ReechargeInfo.class);
        ReechargeInfo reechargeInfo1 = new ReechargeInfo();
        reechargeInfo1.setId(1L);
        ReechargeInfo reechargeInfo2 = new ReechargeInfo();
        reechargeInfo2.setId(reechargeInfo1.getId());
        assertThat(reechargeInfo1).isEqualTo(reechargeInfo2);
        reechargeInfo2.setId(2L);
        assertThat(reechargeInfo1).isNotEqualTo(reechargeInfo2);
        reechargeInfo1.setId(null);
        assertThat(reechargeInfo1).isNotEqualTo(reechargeInfo2);
    }
}
