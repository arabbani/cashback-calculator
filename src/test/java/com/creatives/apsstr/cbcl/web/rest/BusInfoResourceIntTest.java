package com.creatives.apsstr.cbcl.web.rest;

import com.creatives.apsstr.cbcl.CbclApp;

import com.creatives.apsstr.cbcl.domain.BusInfo;
import com.creatives.apsstr.cbcl.repository.BusInfoRepository;
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
 * Test class for the BusInfoResource REST controller.
 *
 * @see BusInfoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CbclApp.class)
public class BusInfoResourceIntTest {

    @Autowired
    private BusInfoRepository busInfoRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restBusInfoMockMvc;

    private BusInfo busInfo;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final BusInfoResource busInfoResource = new BusInfoResource(busInfoRepository);
        this.restBusInfoMockMvc = MockMvcBuilders.standaloneSetup(busInfoResource)
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
    public static BusInfo createEntity(EntityManager em) {
        BusInfo busInfo = new BusInfo();
        return busInfo;
    }

    @Before
    public void initTest() {
        busInfo = createEntity(em);
    }

    @Test
    @Transactional
    public void createBusInfo() throws Exception {
        int databaseSizeBeforeCreate = busInfoRepository.findAll().size();

        // Create the BusInfo
        restBusInfoMockMvc.perform(post("/api/bus-infos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(busInfo)))
            .andExpect(status().isCreated());

        // Validate the BusInfo in the database
        List<BusInfo> busInfoList = busInfoRepository.findAll();
        assertThat(busInfoList).hasSize(databaseSizeBeforeCreate + 1);
        BusInfo testBusInfo = busInfoList.get(busInfoList.size() - 1);
    }

    @Test
    @Transactional
    public void createBusInfoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = busInfoRepository.findAll().size();

        // Create the BusInfo with an existing ID
        busInfo.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBusInfoMockMvc.perform(post("/api/bus-infos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(busInfo)))
            .andExpect(status().isBadRequest());

        // Validate the BusInfo in the database
        List<BusInfo> busInfoList = busInfoRepository.findAll();
        assertThat(busInfoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllBusInfos() throws Exception {
        // Initialize the database
        busInfoRepository.saveAndFlush(busInfo);

        // Get all the busInfoList
        restBusInfoMockMvc.perform(get("/api/bus-infos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(busInfo.getId().intValue())));
    }

    @Test
    @Transactional
    public void getBusInfo() throws Exception {
        // Initialize the database
        busInfoRepository.saveAndFlush(busInfo);

        // Get the busInfo
        restBusInfoMockMvc.perform(get("/api/bus-infos/{id}", busInfo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(busInfo.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingBusInfo() throws Exception {
        // Get the busInfo
        restBusInfoMockMvc.perform(get("/api/bus-infos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBusInfo() throws Exception {
        // Initialize the database
        busInfoRepository.saveAndFlush(busInfo);
        int databaseSizeBeforeUpdate = busInfoRepository.findAll().size();

        // Update the busInfo
        BusInfo updatedBusInfo = busInfoRepository.findOne(busInfo.getId());
        // Disconnect from session so that the updates on updatedBusInfo are not directly saved in db
        em.detach(updatedBusInfo);

        restBusInfoMockMvc.perform(put("/api/bus-infos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedBusInfo)))
            .andExpect(status().isOk());

        // Validate the BusInfo in the database
        List<BusInfo> busInfoList = busInfoRepository.findAll();
        assertThat(busInfoList).hasSize(databaseSizeBeforeUpdate);
        BusInfo testBusInfo = busInfoList.get(busInfoList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingBusInfo() throws Exception {
        int databaseSizeBeforeUpdate = busInfoRepository.findAll().size();

        // Create the BusInfo

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restBusInfoMockMvc.perform(put("/api/bus-infos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(busInfo)))
            .andExpect(status().isCreated());

        // Validate the BusInfo in the database
        List<BusInfo> busInfoList = busInfoRepository.findAll();
        assertThat(busInfoList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteBusInfo() throws Exception {
        // Initialize the database
        busInfoRepository.saveAndFlush(busInfo);
        int databaseSizeBeforeDelete = busInfoRepository.findAll().size();

        // Get the busInfo
        restBusInfoMockMvc.perform(delete("/api/bus-infos/{id}", busInfo.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<BusInfo> busInfoList = busInfoRepository.findAll();
        assertThat(busInfoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(BusInfo.class);
        BusInfo busInfo1 = new BusInfo();
        busInfo1.setId(1L);
        BusInfo busInfo2 = new BusInfo();
        busInfo2.setId(busInfo1.getId());
        assertThat(busInfo1).isEqualTo(busInfo2);
        busInfo2.setId(2L);
        assertThat(busInfo1).isNotEqualTo(busInfo2);
        busInfo1.setId(null);
        assertThat(busInfo1).isNotEqualTo(busInfo2);
    }
}
