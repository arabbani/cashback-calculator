package com.creatives.apsstr.cbcl.web.rest;

import com.creatives.apsstr.cbcl.CbclApp;

import com.creatives.apsstr.cbcl.domain.RechargePlanType;
import com.creatives.apsstr.cbcl.repository.RechargePlanTypeRepository;
import com.creatives.apsstr.cbcl.service.RechargePlanTypeService;
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
 * Test class for the RechargePlanTypeResource REST controller.
 *
 * @see RechargePlanTypeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CbclApp.class)
public class RechargePlanTypeResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Boolean DEFAULT_DATA_PLAN = false;
    private static final Boolean UPDATED_DATA_PLAN = true;

    @Autowired
    private RechargePlanTypeRepository rechargePlanTypeRepository;

    @Autowired
    private RechargePlanTypeService rechargePlanTypeService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restRechargePlanTypeMockMvc;

    private RechargePlanType rechargePlanType;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RechargePlanTypeResource rechargePlanTypeResource = new RechargePlanTypeResource(rechargePlanTypeService);
        this.restRechargePlanTypeMockMvc = MockMvcBuilders.standaloneSetup(rechargePlanTypeResource)
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
    public static RechargePlanType createEntity(EntityManager em) {
        RechargePlanType rechargePlanType = new RechargePlanType()
            .name(DEFAULT_NAME)
            .dataPlan(DEFAULT_DATA_PLAN);
        return rechargePlanType;
    }

    @Before
    public void initTest() {
        rechargePlanType = createEntity(em);
    }

    @Test
    @Transactional
    public void createRechargePlanType() throws Exception {
        int databaseSizeBeforeCreate = rechargePlanTypeRepository.findAll().size();

        // Create the RechargePlanType
        restRechargePlanTypeMockMvc.perform(post("/api/recharge-plan-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rechargePlanType)))
            .andExpect(status().isCreated());

        // Validate the RechargePlanType in the database
        List<RechargePlanType> rechargePlanTypeList = rechargePlanTypeRepository.findAll();
        assertThat(rechargePlanTypeList).hasSize(databaseSizeBeforeCreate + 1);
        RechargePlanType testRechargePlanType = rechargePlanTypeList.get(rechargePlanTypeList.size() - 1);
        assertThat(testRechargePlanType.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testRechargePlanType.isDataPlan()).isEqualTo(DEFAULT_DATA_PLAN);
    }

    @Test
    @Transactional
    public void createRechargePlanTypeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = rechargePlanTypeRepository.findAll().size();

        // Create the RechargePlanType with an existing ID
        rechargePlanType.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRechargePlanTypeMockMvc.perform(post("/api/recharge-plan-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rechargePlanType)))
            .andExpect(status().isBadRequest());

        // Validate the RechargePlanType in the database
        List<RechargePlanType> rechargePlanTypeList = rechargePlanTypeRepository.findAll();
        assertThat(rechargePlanTypeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = rechargePlanTypeRepository.findAll().size();
        // set the field null
        rechargePlanType.setName(null);

        // Create the RechargePlanType, which fails.

        restRechargePlanTypeMockMvc.perform(post("/api/recharge-plan-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rechargePlanType)))
            .andExpect(status().isBadRequest());

        List<RechargePlanType> rechargePlanTypeList = rechargePlanTypeRepository.findAll();
        assertThat(rechargePlanTypeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDataPlanIsRequired() throws Exception {
        int databaseSizeBeforeTest = rechargePlanTypeRepository.findAll().size();
        // set the field null
        rechargePlanType.setDataPlan(null);

        // Create the RechargePlanType, which fails.

        restRechargePlanTypeMockMvc.perform(post("/api/recharge-plan-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rechargePlanType)))
            .andExpect(status().isBadRequest());

        List<RechargePlanType> rechargePlanTypeList = rechargePlanTypeRepository.findAll();
        assertThat(rechargePlanTypeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllRechargePlanTypes() throws Exception {
        // Initialize the database
        rechargePlanTypeRepository.saveAndFlush(rechargePlanType);

        // Get all the rechargePlanTypeList
        restRechargePlanTypeMockMvc.perform(get("/api/recharge-plan-types?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(rechargePlanType.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].dataPlan").value(hasItem(DEFAULT_DATA_PLAN.booleanValue())));
    }

    @Test
    @Transactional
    public void getRechargePlanType() throws Exception {
        // Initialize the database
        rechargePlanTypeRepository.saveAndFlush(rechargePlanType);

        // Get the rechargePlanType
        restRechargePlanTypeMockMvc.perform(get("/api/recharge-plan-types/{id}", rechargePlanType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(rechargePlanType.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.dataPlan").value(DEFAULT_DATA_PLAN.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingRechargePlanType() throws Exception {
        // Get the rechargePlanType
        restRechargePlanTypeMockMvc.perform(get("/api/recharge-plan-types/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRechargePlanType() throws Exception {
        // Initialize the database
        rechargePlanTypeService.save(rechargePlanType);

        int databaseSizeBeforeUpdate = rechargePlanTypeRepository.findAll().size();

        // Update the rechargePlanType
        RechargePlanType updatedRechargePlanType = rechargePlanTypeRepository.findOne(rechargePlanType.getId());
        // Disconnect from session so that the updates on updatedRechargePlanType are not directly saved in db
        em.detach(updatedRechargePlanType);
        updatedRechargePlanType
            .name(UPDATED_NAME)
            .dataPlan(UPDATED_DATA_PLAN);

        restRechargePlanTypeMockMvc.perform(put("/api/recharge-plan-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedRechargePlanType)))
            .andExpect(status().isOk());

        // Validate the RechargePlanType in the database
        List<RechargePlanType> rechargePlanTypeList = rechargePlanTypeRepository.findAll();
        assertThat(rechargePlanTypeList).hasSize(databaseSizeBeforeUpdate);
        RechargePlanType testRechargePlanType = rechargePlanTypeList.get(rechargePlanTypeList.size() - 1);
        assertThat(testRechargePlanType.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testRechargePlanType.isDataPlan()).isEqualTo(UPDATED_DATA_PLAN);
    }

    @Test
    @Transactional
    public void updateNonExistingRechargePlanType() throws Exception {
        int databaseSizeBeforeUpdate = rechargePlanTypeRepository.findAll().size();

        // Create the RechargePlanType

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restRechargePlanTypeMockMvc.perform(put("/api/recharge-plan-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rechargePlanType)))
            .andExpect(status().isCreated());

        // Validate the RechargePlanType in the database
        List<RechargePlanType> rechargePlanTypeList = rechargePlanTypeRepository.findAll();
        assertThat(rechargePlanTypeList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteRechargePlanType() throws Exception {
        // Initialize the database
        rechargePlanTypeService.save(rechargePlanType);

        int databaseSizeBeforeDelete = rechargePlanTypeRepository.findAll().size();

        // Get the rechargePlanType
        restRechargePlanTypeMockMvc.perform(delete("/api/recharge-plan-types/{id}", rechargePlanType.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<RechargePlanType> rechargePlanTypeList = rechargePlanTypeRepository.findAll();
        assertThat(rechargePlanTypeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(RechargePlanType.class);
        RechargePlanType rechargePlanType1 = new RechargePlanType();
        rechargePlanType1.setId(1L);
        RechargePlanType rechargePlanType2 = new RechargePlanType();
        rechargePlanType2.setId(rechargePlanType1.getId());
        assertThat(rechargePlanType1).isEqualTo(rechargePlanType2);
        rechargePlanType2.setId(2L);
        assertThat(rechargePlanType1).isNotEqualTo(rechargePlanType2);
        rechargePlanType1.setId(null);
        assertThat(rechargePlanType1).isNotEqualTo(rechargePlanType2);
    }
}
