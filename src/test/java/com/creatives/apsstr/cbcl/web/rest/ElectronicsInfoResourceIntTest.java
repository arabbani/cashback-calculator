package com.creatives.apsstr.cbcl.web.rest;

import com.creatives.apsstr.cbcl.CbclApp;

import com.creatives.apsstr.cbcl.domain.ElectronicsInfo;
import com.creatives.apsstr.cbcl.repository.ElectronicsInfoRepository;
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
 * Test class for the ElectronicsInfoResource REST controller.
 *
 * @see ElectronicsInfoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CbclApp.class)
public class ElectronicsInfoResourceIntTest {

    @Autowired
    private ElectronicsInfoRepository electronicsInfoRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restElectronicsInfoMockMvc;

    private ElectronicsInfo electronicsInfo;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ElectronicsInfoResource electronicsInfoResource = new ElectronicsInfoResource(electronicsInfoRepository);
        this.restElectronicsInfoMockMvc = MockMvcBuilders.standaloneSetup(electronicsInfoResource)
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
    public static ElectronicsInfo createEntity(EntityManager em) {
        ElectronicsInfo electronicsInfo = new ElectronicsInfo();
        return electronicsInfo;
    }

    @Before
    public void initTest() {
        electronicsInfo = createEntity(em);
    }

    @Test
    @Transactional
    public void createElectronicsInfo() throws Exception {
        int databaseSizeBeforeCreate = electronicsInfoRepository.findAll().size();

        // Create the ElectronicsInfo
        restElectronicsInfoMockMvc.perform(post("/api/electronics-infos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(electronicsInfo)))
            .andExpect(status().isCreated());

        // Validate the ElectronicsInfo in the database
        List<ElectronicsInfo> electronicsInfoList = electronicsInfoRepository.findAll();
        assertThat(electronicsInfoList).hasSize(databaseSizeBeforeCreate + 1);
        ElectronicsInfo testElectronicsInfo = electronicsInfoList.get(electronicsInfoList.size() - 1);
    }

    @Test
    @Transactional
    public void createElectronicsInfoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = electronicsInfoRepository.findAll().size();

        // Create the ElectronicsInfo with an existing ID
        electronicsInfo.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restElectronicsInfoMockMvc.perform(post("/api/electronics-infos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(electronicsInfo)))
            .andExpect(status().isBadRequest());

        // Validate the ElectronicsInfo in the database
        List<ElectronicsInfo> electronicsInfoList = electronicsInfoRepository.findAll();
        assertThat(electronicsInfoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllElectronicsInfos() throws Exception {
        // Initialize the database
        electronicsInfoRepository.saveAndFlush(electronicsInfo);

        // Get all the electronicsInfoList
        restElectronicsInfoMockMvc.perform(get("/api/electronics-infos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(electronicsInfo.getId().intValue())));
    }

    @Test
    @Transactional
    public void getElectronicsInfo() throws Exception {
        // Initialize the database
        electronicsInfoRepository.saveAndFlush(electronicsInfo);

        // Get the electronicsInfo
        restElectronicsInfoMockMvc.perform(get("/api/electronics-infos/{id}", electronicsInfo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(electronicsInfo.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingElectronicsInfo() throws Exception {
        // Get the electronicsInfo
        restElectronicsInfoMockMvc.perform(get("/api/electronics-infos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateElectronicsInfo() throws Exception {
        // Initialize the database
        electronicsInfoRepository.saveAndFlush(electronicsInfo);
        int databaseSizeBeforeUpdate = electronicsInfoRepository.findAll().size();

        // Update the electronicsInfo
        ElectronicsInfo updatedElectronicsInfo = electronicsInfoRepository.findOne(electronicsInfo.getId());
        // Disconnect from session so that the updates on updatedElectronicsInfo are not directly saved in db
        em.detach(updatedElectronicsInfo);

        restElectronicsInfoMockMvc.perform(put("/api/electronics-infos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedElectronicsInfo)))
            .andExpect(status().isOk());

        // Validate the ElectronicsInfo in the database
        List<ElectronicsInfo> electronicsInfoList = electronicsInfoRepository.findAll();
        assertThat(electronicsInfoList).hasSize(databaseSizeBeforeUpdate);
        ElectronicsInfo testElectronicsInfo = electronicsInfoList.get(electronicsInfoList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingElectronicsInfo() throws Exception {
        int databaseSizeBeforeUpdate = electronicsInfoRepository.findAll().size();

        // Create the ElectronicsInfo

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restElectronicsInfoMockMvc.perform(put("/api/electronics-infos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(electronicsInfo)))
            .andExpect(status().isCreated());

        // Validate the ElectronicsInfo in the database
        List<ElectronicsInfo> electronicsInfoList = electronicsInfoRepository.findAll();
        assertThat(electronicsInfoList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteElectronicsInfo() throws Exception {
        // Initialize the database
        electronicsInfoRepository.saveAndFlush(electronicsInfo);
        int databaseSizeBeforeDelete = electronicsInfoRepository.findAll().size();

        // Get the electronicsInfo
        restElectronicsInfoMockMvc.perform(delete("/api/electronics-infos/{id}", electronicsInfo.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ElectronicsInfo> electronicsInfoList = electronicsInfoRepository.findAll();
        assertThat(electronicsInfoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ElectronicsInfo.class);
        ElectronicsInfo electronicsInfo1 = new ElectronicsInfo();
        electronicsInfo1.setId(1L);
        ElectronicsInfo electronicsInfo2 = new ElectronicsInfo();
        electronicsInfo2.setId(electronicsInfo1.getId());
        assertThat(electronicsInfo1).isEqualTo(electronicsInfo2);
        electronicsInfo2.setId(2L);
        assertThat(electronicsInfo1).isNotEqualTo(electronicsInfo2);
        electronicsInfo1.setId(null);
        assertThat(electronicsInfo1).isNotEqualTo(electronicsInfo2);
    }
}
