package com.creatives.apsstr.cbcl.web.rest;

import com.creatives.apsstr.cbcl.CbclApp;

import com.creatives.apsstr.cbcl.domain.TravelType;
import com.creatives.apsstr.cbcl.repository.TravelTypeRepository;
import com.creatives.apsstr.cbcl.service.TravelTypeService;
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
 * Test class for the TravelTypeResource REST controller.
 *
 * @see TravelTypeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CbclApp.class)
public class TravelTypeResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private TravelTypeRepository travelTypeRepository;

    @Autowired
    private TravelTypeService travelTypeService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTravelTypeMockMvc;

    private TravelType travelType;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TravelTypeResource travelTypeResource = new TravelTypeResource(travelTypeService);
        this.restTravelTypeMockMvc = MockMvcBuilders.standaloneSetup(travelTypeResource)
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
    public static TravelType createEntity(EntityManager em) {
        TravelType travelType = new TravelType()
            .name(DEFAULT_NAME);
        return travelType;
    }

    @Before
    public void initTest() {
        travelType = createEntity(em);
    }

    @Test
    @Transactional
    public void createTravelType() throws Exception {
        int databaseSizeBeforeCreate = travelTypeRepository.findAll().size();

        // Create the TravelType
        restTravelTypeMockMvc.perform(post("/api/travel-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(travelType)))
            .andExpect(status().isCreated());

        // Validate the TravelType in the database
        List<TravelType> travelTypeList = travelTypeRepository.findAll();
        assertThat(travelTypeList).hasSize(databaseSizeBeforeCreate + 1);
        TravelType testTravelType = travelTypeList.get(travelTypeList.size() - 1);
        assertThat(testTravelType.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createTravelTypeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = travelTypeRepository.findAll().size();

        // Create the TravelType with an existing ID
        travelType.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTravelTypeMockMvc.perform(post("/api/travel-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(travelType)))
            .andExpect(status().isBadRequest());

        // Validate the TravelType in the database
        List<TravelType> travelTypeList = travelTypeRepository.findAll();
        assertThat(travelTypeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = travelTypeRepository.findAll().size();
        // set the field null
        travelType.setName(null);

        // Create the TravelType, which fails.

        restTravelTypeMockMvc.perform(post("/api/travel-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(travelType)))
            .andExpect(status().isBadRequest());

        List<TravelType> travelTypeList = travelTypeRepository.findAll();
        assertThat(travelTypeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTravelTypes() throws Exception {
        // Initialize the database
        travelTypeRepository.saveAndFlush(travelType);

        // Get all the travelTypeList
        restTravelTypeMockMvc.perform(get("/api/travel-types?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(travelType.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }

    @Test
    @Transactional
    public void getTravelType() throws Exception {
        // Initialize the database
        travelTypeRepository.saveAndFlush(travelType);

        // Get the travelType
        restTravelTypeMockMvc.perform(get("/api/travel-types/{id}", travelType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(travelType.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTravelType() throws Exception {
        // Get the travelType
        restTravelTypeMockMvc.perform(get("/api/travel-types/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTravelType() throws Exception {
        // Initialize the database
        travelTypeService.save(travelType);

        int databaseSizeBeforeUpdate = travelTypeRepository.findAll().size();

        // Update the travelType
        TravelType updatedTravelType = travelTypeRepository.findOne(travelType.getId());
        // Disconnect from session so that the updates on updatedTravelType are not directly saved in db
        em.detach(updatedTravelType);
        updatedTravelType
            .name(UPDATED_NAME);

        restTravelTypeMockMvc.perform(put("/api/travel-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTravelType)))
            .andExpect(status().isOk());

        // Validate the TravelType in the database
        List<TravelType> travelTypeList = travelTypeRepository.findAll();
        assertThat(travelTypeList).hasSize(databaseSizeBeforeUpdate);
        TravelType testTravelType = travelTypeList.get(travelTypeList.size() - 1);
        assertThat(testTravelType.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingTravelType() throws Exception {
        int databaseSizeBeforeUpdate = travelTypeRepository.findAll().size();

        // Create the TravelType

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTravelTypeMockMvc.perform(put("/api/travel-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(travelType)))
            .andExpect(status().isCreated());

        // Validate the TravelType in the database
        List<TravelType> travelTypeList = travelTypeRepository.findAll();
        assertThat(travelTypeList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTravelType() throws Exception {
        // Initialize the database
        travelTypeService.save(travelType);

        int databaseSizeBeforeDelete = travelTypeRepository.findAll().size();

        // Get the travelType
        restTravelTypeMockMvc.perform(delete("/api/travel-types/{id}", travelType.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TravelType> travelTypeList = travelTypeRepository.findAll();
        assertThat(travelTypeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TravelType.class);
        TravelType travelType1 = new TravelType();
        travelType1.setId(1L);
        TravelType travelType2 = new TravelType();
        travelType2.setId(travelType1.getId());
        assertThat(travelType1).isEqualTo(travelType2);
        travelType2.setId(2L);
        assertThat(travelType1).isNotEqualTo(travelType2);
        travelType1.setId(null);
        assertThat(travelType1).isNotEqualTo(travelType2);
    }
}
