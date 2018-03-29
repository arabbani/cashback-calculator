package com.creatives.apsstr.cbcl.web.rest;

import com.creatives.apsstr.cbcl.CbclApp;

import com.creatives.apsstr.cbcl.domain.ReechargePlanType;
import com.creatives.apsstr.cbcl.repository.ReechargePlanTypeRepository;
import com.creatives.apsstr.cbcl.service.ReechargePlanTypeService;
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
 * Test class for the ReechargePlanTypeResource REST controller.
 *
 * @see ReechargePlanTypeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CbclApp.class)
public class ReechargePlanTypeResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Boolean DEFAULT_DATA_PLAN = false;
    private static final Boolean UPDATED_DATA_PLAN = true;

    @Autowired
    private ReechargePlanTypeRepository reechargePlanTypeRepository;

    @Autowired
    private ReechargePlanTypeService reechargePlanTypeService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restReechargePlanTypeMockMvc;

    private ReechargePlanType reechargePlanType;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ReechargePlanTypeResource reechargePlanTypeResource = new ReechargePlanTypeResource(reechargePlanTypeService);
        this.restReechargePlanTypeMockMvc = MockMvcBuilders.standaloneSetup(reechargePlanTypeResource)
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
    public static ReechargePlanType createEntity(EntityManager em) {
        ReechargePlanType reechargePlanType = new ReechargePlanType()
            .name(DEFAULT_NAME)
            .dataPlan(DEFAULT_DATA_PLAN);
        return reechargePlanType;
    }

    @Before
    public void initTest() {
        reechargePlanType = createEntity(em);
    }

    @Test
    @Transactional
    public void createReechargePlanType() throws Exception {
        int databaseSizeBeforeCreate = reechargePlanTypeRepository.findAll().size();

        // Create the ReechargePlanType
        restReechargePlanTypeMockMvc.perform(post("/api/reecharge-plan-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reechargePlanType)))
            .andExpect(status().isCreated());

        // Validate the ReechargePlanType in the database
        List<ReechargePlanType> reechargePlanTypeList = reechargePlanTypeRepository.findAll();
        assertThat(reechargePlanTypeList).hasSize(databaseSizeBeforeCreate + 1);
        ReechargePlanType testReechargePlanType = reechargePlanTypeList.get(reechargePlanTypeList.size() - 1);
        assertThat(testReechargePlanType.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testReechargePlanType.isDataPlan()).isEqualTo(DEFAULT_DATA_PLAN);
    }

    @Test
    @Transactional
    public void createReechargePlanTypeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = reechargePlanTypeRepository.findAll().size();

        // Create the ReechargePlanType with an existing ID
        reechargePlanType.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restReechargePlanTypeMockMvc.perform(post("/api/reecharge-plan-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reechargePlanType)))
            .andExpect(status().isBadRequest());

        // Validate the ReechargePlanType in the database
        List<ReechargePlanType> reechargePlanTypeList = reechargePlanTypeRepository.findAll();
        assertThat(reechargePlanTypeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = reechargePlanTypeRepository.findAll().size();
        // set the field null
        reechargePlanType.setName(null);

        // Create the ReechargePlanType, which fails.

        restReechargePlanTypeMockMvc.perform(post("/api/reecharge-plan-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reechargePlanType)))
            .andExpect(status().isBadRequest());

        List<ReechargePlanType> reechargePlanTypeList = reechargePlanTypeRepository.findAll();
        assertThat(reechargePlanTypeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDataPlanIsRequired() throws Exception {
        int databaseSizeBeforeTest = reechargePlanTypeRepository.findAll().size();
        // set the field null
        reechargePlanType.setDataPlan(null);

        // Create the ReechargePlanType, which fails.

        restReechargePlanTypeMockMvc.perform(post("/api/reecharge-plan-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reechargePlanType)))
            .andExpect(status().isBadRequest());

        List<ReechargePlanType> reechargePlanTypeList = reechargePlanTypeRepository.findAll();
        assertThat(reechargePlanTypeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllReechargePlanTypes() throws Exception {
        // Initialize the database
        reechargePlanTypeRepository.saveAndFlush(reechargePlanType);

        // Get all the reechargePlanTypeList
        restReechargePlanTypeMockMvc.perform(get("/api/reecharge-plan-types?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(reechargePlanType.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].dataPlan").value(hasItem(DEFAULT_DATA_PLAN.booleanValue())));
    }

    @Test
    @Transactional
    public void getReechargePlanType() throws Exception {
        // Initialize the database
        reechargePlanTypeRepository.saveAndFlush(reechargePlanType);

        // Get the reechargePlanType
        restReechargePlanTypeMockMvc.perform(get("/api/reecharge-plan-types/{id}", reechargePlanType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(reechargePlanType.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.dataPlan").value(DEFAULT_DATA_PLAN.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingReechargePlanType() throws Exception {
        // Get the reechargePlanType
        restReechargePlanTypeMockMvc.perform(get("/api/reecharge-plan-types/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateReechargePlanType() throws Exception {
        // Initialize the database
        reechargePlanTypeService.save(reechargePlanType);

        int databaseSizeBeforeUpdate = reechargePlanTypeRepository.findAll().size();

        // Update the reechargePlanType
        ReechargePlanType updatedReechargePlanType = reechargePlanTypeRepository.findOne(reechargePlanType.getId());
        // Disconnect from session so that the updates on updatedReechargePlanType are not directly saved in db
        em.detach(updatedReechargePlanType);
        updatedReechargePlanType
            .name(UPDATED_NAME)
            .dataPlan(UPDATED_DATA_PLAN);

        restReechargePlanTypeMockMvc.perform(put("/api/reecharge-plan-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedReechargePlanType)))
            .andExpect(status().isOk());

        // Validate the ReechargePlanType in the database
        List<ReechargePlanType> reechargePlanTypeList = reechargePlanTypeRepository.findAll();
        assertThat(reechargePlanTypeList).hasSize(databaseSizeBeforeUpdate);
        ReechargePlanType testReechargePlanType = reechargePlanTypeList.get(reechargePlanTypeList.size() - 1);
        assertThat(testReechargePlanType.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testReechargePlanType.isDataPlan()).isEqualTo(UPDATED_DATA_PLAN);
    }

    @Test
    @Transactional
    public void updateNonExistingReechargePlanType() throws Exception {
        int databaseSizeBeforeUpdate = reechargePlanTypeRepository.findAll().size();

        // Create the ReechargePlanType

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restReechargePlanTypeMockMvc.perform(put("/api/reecharge-plan-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reechargePlanType)))
            .andExpect(status().isCreated());

        // Validate the ReechargePlanType in the database
        List<ReechargePlanType> reechargePlanTypeList = reechargePlanTypeRepository.findAll();
        assertThat(reechargePlanTypeList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteReechargePlanType() throws Exception {
        // Initialize the database
        reechargePlanTypeService.save(reechargePlanType);

        int databaseSizeBeforeDelete = reechargePlanTypeRepository.findAll().size();

        // Get the reechargePlanType
        restReechargePlanTypeMockMvc.perform(delete("/api/reecharge-plan-types/{id}", reechargePlanType.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ReechargePlanType> reechargePlanTypeList = reechargePlanTypeRepository.findAll();
        assertThat(reechargePlanTypeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ReechargePlanType.class);
        ReechargePlanType reechargePlanType1 = new ReechargePlanType();
        reechargePlanType1.setId(1L);
        ReechargePlanType reechargePlanType2 = new ReechargePlanType();
        reechargePlanType2.setId(reechargePlanType1.getId());
        assertThat(reechargePlanType1).isEqualTo(reechargePlanType2);
        reechargePlanType2.setId(2L);
        assertThat(reechargePlanType1).isNotEqualTo(reechargePlanType2);
        reechargePlanType1.setId(null);
        assertThat(reechargePlanType1).isNotEqualTo(reechargePlanType2);
    }
}
