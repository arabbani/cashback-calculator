package com.creatives.apsstr.cbcl.web.rest;

import com.creatives.apsstr.cbcl.CbclApp;

import com.creatives.apsstr.cbcl.domain.FlightInfo;
import com.creatives.apsstr.cbcl.repository.FlightInfoRepository;
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
 * Test class for the FlightInfoResource REST controller.
 *
 * @see FlightInfoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CbclApp.class)
public class FlightInfoResourceIntTest {

    @Autowired
    private FlightInfoRepository flightInfoRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restFlightInfoMockMvc;

    private FlightInfo flightInfo;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FlightInfoResource flightInfoResource = new FlightInfoResource(flightInfoRepository);
        this.restFlightInfoMockMvc = MockMvcBuilders.standaloneSetup(flightInfoResource)
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
    public static FlightInfo createEntity(EntityManager em) {
        FlightInfo flightInfo = new FlightInfo();
        return flightInfo;
    }

    @Before
    public void initTest() {
        flightInfo = createEntity(em);
    }

    @Test
    @Transactional
    public void createFlightInfo() throws Exception {
        int databaseSizeBeforeCreate = flightInfoRepository.findAll().size();

        // Create the FlightInfo
        restFlightInfoMockMvc.perform(post("/api/flight-infos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(flightInfo)))
            .andExpect(status().isCreated());

        // Validate the FlightInfo in the database
        List<FlightInfo> flightInfoList = flightInfoRepository.findAll();
        assertThat(flightInfoList).hasSize(databaseSizeBeforeCreate + 1);
        FlightInfo testFlightInfo = flightInfoList.get(flightInfoList.size() - 1);
    }

    @Test
    @Transactional
    public void createFlightInfoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = flightInfoRepository.findAll().size();

        // Create the FlightInfo with an existing ID
        flightInfo.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFlightInfoMockMvc.perform(post("/api/flight-infos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(flightInfo)))
            .andExpect(status().isBadRequest());

        // Validate the FlightInfo in the database
        List<FlightInfo> flightInfoList = flightInfoRepository.findAll();
        assertThat(flightInfoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllFlightInfos() throws Exception {
        // Initialize the database
        flightInfoRepository.saveAndFlush(flightInfo);

        // Get all the flightInfoList
        restFlightInfoMockMvc.perform(get("/api/flight-infos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(flightInfo.getId().intValue())));
    }

    @Test
    @Transactional
    public void getFlightInfo() throws Exception {
        // Initialize the database
        flightInfoRepository.saveAndFlush(flightInfo);

        // Get the flightInfo
        restFlightInfoMockMvc.perform(get("/api/flight-infos/{id}", flightInfo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(flightInfo.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingFlightInfo() throws Exception {
        // Get the flightInfo
        restFlightInfoMockMvc.perform(get("/api/flight-infos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFlightInfo() throws Exception {
        // Initialize the database
        flightInfoRepository.saveAndFlush(flightInfo);
        int databaseSizeBeforeUpdate = flightInfoRepository.findAll().size();

        // Update the flightInfo
        FlightInfo updatedFlightInfo = flightInfoRepository.findOne(flightInfo.getId());
        // Disconnect from session so that the updates on updatedFlightInfo are not directly saved in db
        em.detach(updatedFlightInfo);

        restFlightInfoMockMvc.perform(put("/api/flight-infos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedFlightInfo)))
            .andExpect(status().isOk());

        // Validate the FlightInfo in the database
        List<FlightInfo> flightInfoList = flightInfoRepository.findAll();
        assertThat(flightInfoList).hasSize(databaseSizeBeforeUpdate);
        FlightInfo testFlightInfo = flightInfoList.get(flightInfoList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingFlightInfo() throws Exception {
        int databaseSizeBeforeUpdate = flightInfoRepository.findAll().size();

        // Create the FlightInfo

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restFlightInfoMockMvc.perform(put("/api/flight-infos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(flightInfo)))
            .andExpect(status().isCreated());

        // Validate the FlightInfo in the database
        List<FlightInfo> flightInfoList = flightInfoRepository.findAll();
        assertThat(flightInfoList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteFlightInfo() throws Exception {
        // Initialize the database
        flightInfoRepository.saveAndFlush(flightInfo);
        int databaseSizeBeforeDelete = flightInfoRepository.findAll().size();

        // Get the flightInfo
        restFlightInfoMockMvc.perform(delete("/api/flight-infos/{id}", flightInfo.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<FlightInfo> flightInfoList = flightInfoRepository.findAll();
        assertThat(flightInfoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(FlightInfo.class);
        FlightInfo flightInfo1 = new FlightInfo();
        flightInfo1.setId(1L);
        FlightInfo flightInfo2 = new FlightInfo();
        flightInfo2.setId(flightInfo1.getId());
        assertThat(flightInfo1).isEqualTo(flightInfo2);
        flightInfo2.setId(2L);
        assertThat(flightInfo1).isNotEqualTo(flightInfo2);
        flightInfo1.setId(null);
        assertThat(flightInfo1).isNotEqualTo(flightInfo2);
    }
}
