package com.creatives.apsstr.cbcl.web.rest;

import com.creatives.apsstr.cbcl.CbclApp;

import com.creatives.apsstr.cbcl.domain.ReturnType;
import com.creatives.apsstr.cbcl.repository.ReturnTypeRepository;
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
 * Test class for the ReturnTypeResource REST controller.
 *
 * @see ReturnTypeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CbclApp.class)
public class ReturnTypeResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private ReturnTypeRepository returnTypeRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restReturnTypeMockMvc;

    private ReturnType returnType;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ReturnTypeResource returnTypeResource = new ReturnTypeResource(returnTypeRepository);
        this.restReturnTypeMockMvc = MockMvcBuilders.standaloneSetup(returnTypeResource)
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
    public static ReturnType createEntity(EntityManager em) {
        ReturnType returnType = new ReturnType()
            .name(DEFAULT_NAME);
        return returnType;
    }

    @Before
    public void initTest() {
        returnType = createEntity(em);
    }

    @Test
    @Transactional
    public void createReturnType() throws Exception {
        int databaseSizeBeforeCreate = returnTypeRepository.findAll().size();

        // Create the ReturnType
        restReturnTypeMockMvc.perform(post("/api/return-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(returnType)))
            .andExpect(status().isCreated());

        // Validate the ReturnType in the database
        List<ReturnType> returnTypeList = returnTypeRepository.findAll();
        assertThat(returnTypeList).hasSize(databaseSizeBeforeCreate + 1);
        ReturnType testReturnType = returnTypeList.get(returnTypeList.size() - 1);
        assertThat(testReturnType.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createReturnTypeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = returnTypeRepository.findAll().size();

        // Create the ReturnType with an existing ID
        returnType.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restReturnTypeMockMvc.perform(post("/api/return-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(returnType)))
            .andExpect(status().isBadRequest());

        // Validate the ReturnType in the database
        List<ReturnType> returnTypeList = returnTypeRepository.findAll();
        assertThat(returnTypeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = returnTypeRepository.findAll().size();
        // set the field null
        returnType.setName(null);

        // Create the ReturnType, which fails.

        restReturnTypeMockMvc.perform(post("/api/return-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(returnType)))
            .andExpect(status().isBadRequest());

        List<ReturnType> returnTypeList = returnTypeRepository.findAll();
        assertThat(returnTypeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllReturnTypes() throws Exception {
        // Initialize the database
        returnTypeRepository.saveAndFlush(returnType);

        // Get all the returnTypeList
        restReturnTypeMockMvc.perform(get("/api/return-types?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(returnType.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }

    @Test
    @Transactional
    public void getReturnType() throws Exception {
        // Initialize the database
        returnTypeRepository.saveAndFlush(returnType);

        // Get the returnType
        restReturnTypeMockMvc.perform(get("/api/return-types/{id}", returnType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(returnType.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingReturnType() throws Exception {
        // Get the returnType
        restReturnTypeMockMvc.perform(get("/api/return-types/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateReturnType() throws Exception {
        // Initialize the database
        returnTypeRepository.saveAndFlush(returnType);
        int databaseSizeBeforeUpdate = returnTypeRepository.findAll().size();

        // Update the returnType
        ReturnType updatedReturnType = returnTypeRepository.findOne(returnType.getId());
        // Disconnect from session so that the updates on updatedReturnType are not directly saved in db
        em.detach(updatedReturnType);
        updatedReturnType
            .name(UPDATED_NAME);

        restReturnTypeMockMvc.perform(put("/api/return-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedReturnType)))
            .andExpect(status().isOk());

        // Validate the ReturnType in the database
        List<ReturnType> returnTypeList = returnTypeRepository.findAll();
        assertThat(returnTypeList).hasSize(databaseSizeBeforeUpdate);
        ReturnType testReturnType = returnTypeList.get(returnTypeList.size() - 1);
        assertThat(testReturnType.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingReturnType() throws Exception {
        int databaseSizeBeforeUpdate = returnTypeRepository.findAll().size();

        // Create the ReturnType

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restReturnTypeMockMvc.perform(put("/api/return-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(returnType)))
            .andExpect(status().isCreated());

        // Validate the ReturnType in the database
        List<ReturnType> returnTypeList = returnTypeRepository.findAll();
        assertThat(returnTypeList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteReturnType() throws Exception {
        // Initialize the database
        returnTypeRepository.saveAndFlush(returnType);
        int databaseSizeBeforeDelete = returnTypeRepository.findAll().size();

        // Get the returnType
        restReturnTypeMockMvc.perform(delete("/api/return-types/{id}", returnType.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ReturnType> returnTypeList = returnTypeRepository.findAll();
        assertThat(returnTypeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ReturnType.class);
        ReturnType returnType1 = new ReturnType();
        returnType1.setId(1L);
        ReturnType returnType2 = new ReturnType();
        returnType2.setId(returnType1.getId());
        assertThat(returnType1).isEqualTo(returnType2);
        returnType2.setId(2L);
        assertThat(returnType1).isNotEqualTo(returnType2);
        returnType1.setId(null);
        assertThat(returnType1).isNotEqualTo(returnType2);
    }
}
