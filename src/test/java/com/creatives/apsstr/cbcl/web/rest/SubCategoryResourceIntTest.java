package com.creatives.apsstr.cbcl.web.rest;

import com.creatives.apsstr.cbcl.CbclApp;

import com.creatives.apsstr.cbcl.domain.SubCategory;
import com.creatives.apsstr.cbcl.repository.SubCategoryRepository;
import com.creatives.apsstr.cbcl.service.SubCategoryService;
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
 * Test class for the SubCategoryResource REST controller.
 *
 * @see SubCategoryResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CbclApp.class)
public class SubCategoryResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CODE = "BBBBBBBBBB";

    @Autowired
    private SubCategoryRepository subCategoryRepository;

    @Autowired
    private SubCategoryService subCategoryService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restSubCategoryMockMvc;

    private SubCategory subCategory;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SubCategoryResource subCategoryResource = new SubCategoryResource(subCategoryService);
        this.restSubCategoryMockMvc = MockMvcBuilders.standaloneSetup(subCategoryResource)
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
    public static SubCategory createEntity(EntityManager em) {
        SubCategory subCategory = new SubCategory()
            .name(DEFAULT_NAME)
            .code(DEFAULT_CODE);
        return subCategory;
    }

    @Before
    public void initTest() {
        subCategory = createEntity(em);
    }

    @Test
    @Transactional
    public void createSubCategory() throws Exception {
        int databaseSizeBeforeCreate = subCategoryRepository.findAll().size();

        // Create the SubCategory
        restSubCategoryMockMvc.perform(post("/api/sub-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subCategory)))
            .andExpect(status().isCreated());

        // Validate the SubCategory in the database
        List<SubCategory> subCategoryList = subCategoryRepository.findAll();
        assertThat(subCategoryList).hasSize(databaseSizeBeforeCreate + 1);
        SubCategory testSubCategory = subCategoryList.get(subCategoryList.size() - 1);
        assertThat(testSubCategory.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testSubCategory.getCode()).isEqualTo(DEFAULT_CODE);
    }

    @Test
    @Transactional
    public void createSubCategoryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = subCategoryRepository.findAll().size();

        // Create the SubCategory with an existing ID
        subCategory.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSubCategoryMockMvc.perform(post("/api/sub-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subCategory)))
            .andExpect(status().isBadRequest());

        // Validate the SubCategory in the database
        List<SubCategory> subCategoryList = subCategoryRepository.findAll();
        assertThat(subCategoryList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = subCategoryRepository.findAll().size();
        // set the field null
        subCategory.setName(null);

        // Create the SubCategory, which fails.

        restSubCategoryMockMvc.perform(post("/api/sub-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subCategory)))
            .andExpect(status().isBadRequest());

        List<SubCategory> subCategoryList = subCategoryRepository.findAll();
        assertThat(subCategoryList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCodeIsRequired() throws Exception {
        int databaseSizeBeforeTest = subCategoryRepository.findAll().size();
        // set the field null
        subCategory.setCode(null);

        // Create the SubCategory, which fails.

        restSubCategoryMockMvc.perform(post("/api/sub-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subCategory)))
            .andExpect(status().isBadRequest());

        List<SubCategory> subCategoryList = subCategoryRepository.findAll();
        assertThat(subCategoryList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllSubCategories() throws Exception {
        // Initialize the database
        subCategoryRepository.saveAndFlush(subCategory);

        // Get all the subCategoryList
        restSubCategoryMockMvc.perform(get("/api/sub-categories?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(subCategory.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE.toString())));
    }

    @Test
    @Transactional
    public void getSubCategory() throws Exception {
        // Initialize the database
        subCategoryRepository.saveAndFlush(subCategory);

        // Get the subCategory
        restSubCategoryMockMvc.perform(get("/api/sub-categories/{id}", subCategory.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(subCategory.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingSubCategory() throws Exception {
        // Get the subCategory
        restSubCategoryMockMvc.perform(get("/api/sub-categories/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSubCategory() throws Exception {
        // Initialize the database
        subCategoryService.save(subCategory);

        int databaseSizeBeforeUpdate = subCategoryRepository.findAll().size();

        // Update the subCategory
        SubCategory updatedSubCategory = subCategoryRepository.findOne(subCategory.getId());
        // Disconnect from session so that the updates on updatedSubCategory are not directly saved in db
        em.detach(updatedSubCategory);
        updatedSubCategory
            .name(UPDATED_NAME)
            .code(UPDATED_CODE);

        restSubCategoryMockMvc.perform(put("/api/sub-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSubCategory)))
            .andExpect(status().isOk());

        // Validate the SubCategory in the database
        List<SubCategory> subCategoryList = subCategoryRepository.findAll();
        assertThat(subCategoryList).hasSize(databaseSizeBeforeUpdate);
        SubCategory testSubCategory = subCategoryList.get(subCategoryList.size() - 1);
        assertThat(testSubCategory.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testSubCategory.getCode()).isEqualTo(UPDATED_CODE);
    }

    @Test
    @Transactional
    public void updateNonExistingSubCategory() throws Exception {
        int databaseSizeBeforeUpdate = subCategoryRepository.findAll().size();

        // Create the SubCategory

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restSubCategoryMockMvc.perform(put("/api/sub-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subCategory)))
            .andExpect(status().isCreated());

        // Validate the SubCategory in the database
        List<SubCategory> subCategoryList = subCategoryRepository.findAll();
        assertThat(subCategoryList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteSubCategory() throws Exception {
        // Initialize the database
        subCategoryService.save(subCategory);

        int databaseSizeBeforeDelete = subCategoryRepository.findAll().size();

        // Get the subCategory
        restSubCategoryMockMvc.perform(delete("/api/sub-categories/{id}", subCategory.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<SubCategory> subCategoryList = subCategoryRepository.findAll();
        assertThat(subCategoryList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SubCategory.class);
        SubCategory subCategory1 = new SubCategory();
        subCategory1.setId(1L);
        SubCategory subCategory2 = new SubCategory();
        subCategory2.setId(subCategory1.getId());
        assertThat(subCategory1).isEqualTo(subCategory2);
        subCategory2.setId(2L);
        assertThat(subCategory1).isNotEqualTo(subCategory2);
        subCategory1.setId(null);
        assertThat(subCategory1).isNotEqualTo(subCategory2);
    }
}
