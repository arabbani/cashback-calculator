package com.creatives.apsstr.cbcl.web.rest;

import com.creatives.apsstr.cbcl.CbclApp;

import com.creatives.apsstr.cbcl.domain.TravelInfo;
import com.creatives.apsstr.cbcl.repository.TravelInfoRepository;
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
 * Test class for the TravelInfoResource REST controller.
 *
 * @see TravelInfoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CbclApp.class)
public class TravelInfoResourceIntTest {

    @Autowired
    private TravelInfoRepository travelInfoRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTravelInfoMockMvc;

    private TravelInfo travelInfo;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TravelInfoResource travelInfoResource = new TravelInfoResource(travelInfoRepository);
        this.restTravelInfoMockMvc = MockMvcBuilders.standaloneSetup(travelInfoResource)
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
    public static TravelInfo createEntity(EntityManager em) {
        TravelInfo travelInfo = new TravelInfo();
        return travelInfo;
    }

    @Before
    public void initTest() {
        travelInfo = createEntity(em);
    }

    @Test
    @Transactional
    public void createTravelInfo() throws Exception {
        int databaseSizeBeforeCreate = travelInfoRepository.findAll().size();

        // Create the TravelInfo
        restTravelInfoMockMvc.perform(post("/api/travel-infos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(travelInfo)))
            .andExpect(status().isCreated());

        // Validate the TravelInfo in the database
        List<TravelInfo> travelInfoList = travelInfoRepository.findAll();
        assertThat(travelInfoList).hasSize(databaseSizeBeforeCreate + 1);
        TravelInfo testTravelInfo = travelInfoList.get(travelInfoList.size() - 1);
    }

    @Test
    @Transactional
    public void createTravelInfoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = travelInfoRepository.findAll().size();

        // Create the TravelInfo with an existing ID
        travelInfo.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTravelInfoMockMvc.perform(post("/api/travel-infos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(travelInfo)))
            .andExpect(status().isBadRequest());

        // Validate the TravelInfo in the database
        List<TravelInfo> travelInfoList = travelInfoRepository.findAll();
        assertThat(travelInfoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTravelInfos() throws Exception {
        // Initialize the database
        travelInfoRepository.saveAndFlush(travelInfo);

        // Get all the travelInfoList
        restTravelInfoMockMvc.perform(get("/api/travel-infos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(travelInfo.getId().intValue())));
    }

    @Test
    @Transactional
    public void getTravelInfo() throws Exception {
        // Initialize the database
        travelInfoRepository.saveAndFlush(travelInfo);

        // Get the travelInfo
        restTravelInfoMockMvc.perform(get("/api/travel-infos/{id}", travelInfo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(travelInfo.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingTravelInfo() throws Exception {
        // Get the travelInfo
        restTravelInfoMockMvc.perform(get("/api/travel-infos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTravelInfo() throws Exception {
        // Initialize the database
        travelInfoRepository.saveAndFlush(travelInfo);
        int databaseSizeBeforeUpdate = travelInfoRepository.findAll().size();

        // Update the travelInfo
        TravelInfo updatedTravelInfo = travelInfoRepository.findOne(travelInfo.getId());
        // Disconnect from session so that the updates on updatedTravelInfo are not directly saved in db
        em.detach(updatedTravelInfo);

        restTravelInfoMockMvc.perform(put("/api/travel-infos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTravelInfo)))
            .andExpect(status().isOk());

        // Validate the TravelInfo in the database
        List<TravelInfo> travelInfoList = travelInfoRepository.findAll();
        assertThat(travelInfoList).hasSize(databaseSizeBeforeUpdate);
        TravelInfo testTravelInfo = travelInfoList.get(travelInfoList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingTravelInfo() throws Exception {
        int databaseSizeBeforeUpdate = travelInfoRepository.findAll().size();

        // Create the TravelInfo

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTravelInfoMockMvc.perform(put("/api/travel-infos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(travelInfo)))
            .andExpect(status().isCreated());

        // Validate the TravelInfo in the database
        List<TravelInfo> travelInfoList = travelInfoRepository.findAll();
        assertThat(travelInfoList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTravelInfo() throws Exception {
        // Initialize the database
        travelInfoRepository.saveAndFlush(travelInfo);
        int databaseSizeBeforeDelete = travelInfoRepository.findAll().size();

        // Get the travelInfo
        restTravelInfoMockMvc.perform(delete("/api/travel-infos/{id}", travelInfo.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TravelInfo> travelInfoList = travelInfoRepository.findAll();
        assertThat(travelInfoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TravelInfo.class);
        TravelInfo travelInfo1 = new TravelInfo();
        travelInfo1.setId(1L);
        TravelInfo travelInfo2 = new TravelInfo();
        travelInfo2.setId(travelInfo1.getId());
        assertThat(travelInfo1).isEqualTo(travelInfo2);
        travelInfo2.setId(2L);
        assertThat(travelInfo1).isNotEqualTo(travelInfo2);
        travelInfo1.setId(null);
        assertThat(travelInfo1).isNotEqualTo(travelInfo2);
    }
}
