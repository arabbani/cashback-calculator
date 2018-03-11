package com.creatives.apsstr.cbcl.web.rest;

import com.creatives.apsstr.cbcl.CbclApp;

import com.creatives.apsstr.cbcl.domain.OperatingSystemType;
import com.creatives.apsstr.cbcl.repository.OperatingSystemTypeRepository;
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
 * Test class for the OperatingSystemTypeResource REST controller.
 *
 * @see OperatingSystemTypeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CbclApp.class)
public class OperatingSystemTypeResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private OperatingSystemTypeRepository operatingSystemTypeRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restOperatingSystemTypeMockMvc;

    private OperatingSystemType operatingSystemType;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final OperatingSystemTypeResource operatingSystemTypeResource = new OperatingSystemTypeResource(operatingSystemTypeRepository);
        this.restOperatingSystemTypeMockMvc = MockMvcBuilders.standaloneSetup(operatingSystemTypeResource)
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
    public static OperatingSystemType createEntity(EntityManager em) {
        OperatingSystemType operatingSystemType = new OperatingSystemType()
            .name(DEFAULT_NAME);
        return operatingSystemType;
    }

    @Before
    public void initTest() {
        operatingSystemType = createEntity(em);
    }

    @Test
    @Transactional
    public void createOperatingSystemType() throws Exception {
        int databaseSizeBeforeCreate = operatingSystemTypeRepository.findAll().size();

        // Create the OperatingSystemType
        restOperatingSystemTypeMockMvc.perform(post("/api/operating-system-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(operatingSystemType)))
            .andExpect(status().isCreated());

        // Validate the OperatingSystemType in the database
        List<OperatingSystemType> operatingSystemTypeList = operatingSystemTypeRepository.findAll();
        assertThat(operatingSystemTypeList).hasSize(databaseSizeBeforeCreate + 1);
        OperatingSystemType testOperatingSystemType = operatingSystemTypeList.get(operatingSystemTypeList.size() - 1);
        assertThat(testOperatingSystemType.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createOperatingSystemTypeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = operatingSystemTypeRepository.findAll().size();

        // Create the OperatingSystemType with an existing ID
        operatingSystemType.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restOperatingSystemTypeMockMvc.perform(post("/api/operating-system-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(operatingSystemType)))
            .andExpect(status().isBadRequest());

        // Validate the OperatingSystemType in the database
        List<OperatingSystemType> operatingSystemTypeList = operatingSystemTypeRepository.findAll();
        assertThat(operatingSystemTypeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = operatingSystemTypeRepository.findAll().size();
        // set the field null
        operatingSystemType.setName(null);

        // Create the OperatingSystemType, which fails.

        restOperatingSystemTypeMockMvc.perform(post("/api/operating-system-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(operatingSystemType)))
            .andExpect(status().isBadRequest());

        List<OperatingSystemType> operatingSystemTypeList = operatingSystemTypeRepository.findAll();
        assertThat(operatingSystemTypeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllOperatingSystemTypes() throws Exception {
        // Initialize the database
        operatingSystemTypeRepository.saveAndFlush(operatingSystemType);

        // Get all the operatingSystemTypeList
        restOperatingSystemTypeMockMvc.perform(get("/api/operating-system-types?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(operatingSystemType.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }

    @Test
    @Transactional
    public void getOperatingSystemType() throws Exception {
        // Initialize the database
        operatingSystemTypeRepository.saveAndFlush(operatingSystemType);

        // Get the operatingSystemType
        restOperatingSystemTypeMockMvc.perform(get("/api/operating-system-types/{id}", operatingSystemType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(operatingSystemType.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingOperatingSystemType() throws Exception {
        // Get the operatingSystemType
        restOperatingSystemTypeMockMvc.perform(get("/api/operating-system-types/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateOperatingSystemType() throws Exception {
        // Initialize the database
        operatingSystemTypeRepository.saveAndFlush(operatingSystemType);
        int databaseSizeBeforeUpdate = operatingSystemTypeRepository.findAll().size();

        // Update the operatingSystemType
        OperatingSystemType updatedOperatingSystemType = operatingSystemTypeRepository.findOne(operatingSystemType.getId());
        // Disconnect from session so that the updates on updatedOperatingSystemType are not directly saved in db
        em.detach(updatedOperatingSystemType);
        updatedOperatingSystemType
            .name(UPDATED_NAME);

        restOperatingSystemTypeMockMvc.perform(put("/api/operating-system-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedOperatingSystemType)))
            .andExpect(status().isOk());

        // Validate the OperatingSystemType in the database
        List<OperatingSystemType> operatingSystemTypeList = operatingSystemTypeRepository.findAll();
        assertThat(operatingSystemTypeList).hasSize(databaseSizeBeforeUpdate);
        OperatingSystemType testOperatingSystemType = operatingSystemTypeList.get(operatingSystemTypeList.size() - 1);
        assertThat(testOperatingSystemType.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingOperatingSystemType() throws Exception {
        int databaseSizeBeforeUpdate = operatingSystemTypeRepository.findAll().size();

        // Create the OperatingSystemType

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restOperatingSystemTypeMockMvc.perform(put("/api/operating-system-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(operatingSystemType)))
            .andExpect(status().isCreated());

        // Validate the OperatingSystemType in the database
        List<OperatingSystemType> operatingSystemTypeList = operatingSystemTypeRepository.findAll();
        assertThat(operatingSystemTypeList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteOperatingSystemType() throws Exception {
        // Initialize the database
        operatingSystemTypeRepository.saveAndFlush(operatingSystemType);
        int databaseSizeBeforeDelete = operatingSystemTypeRepository.findAll().size();

        // Get the operatingSystemType
        restOperatingSystemTypeMockMvc.perform(delete("/api/operating-system-types/{id}", operatingSystemType.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<OperatingSystemType> operatingSystemTypeList = operatingSystemTypeRepository.findAll();
        assertThat(operatingSystemTypeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(OperatingSystemType.class);
        OperatingSystemType operatingSystemType1 = new OperatingSystemType();
        operatingSystemType1.setId(1L);
        OperatingSystemType operatingSystemType2 = new OperatingSystemType();
        operatingSystemType2.setId(operatingSystemType1.getId());
        assertThat(operatingSystemType1).isEqualTo(operatingSystemType2);
        operatingSystemType2.setId(2L);
        assertThat(operatingSystemType1).isNotEqualTo(operatingSystemType2);
        operatingSystemType1.setId(null);
        assertThat(operatingSystemType1).isNotEqualTo(operatingSystemType2);
    }
}
