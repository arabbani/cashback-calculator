package com.creatives.apsstr.cbcl.web.rest;

import com.creatives.apsstr.cbcl.CbclApp;

import com.creatives.apsstr.cbcl.domain.OfferType;
import com.creatives.apsstr.cbcl.repository.OfferTypeRepository;
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
 * Test class for the OfferTypeResource REST controller.
 *
 * @see OfferTypeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CbclApp.class)
public class OfferTypeResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private OfferTypeRepository offerTypeRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restOfferTypeMockMvc;

    private OfferType offerType;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final OfferTypeResource offerTypeResource = new OfferTypeResource(offerTypeRepository);
        this.restOfferTypeMockMvc = MockMvcBuilders.standaloneSetup(offerTypeResource)
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
    public static OfferType createEntity(EntityManager em) {
        OfferType offerType = new OfferType()
            .name(DEFAULT_NAME);
        return offerType;
    }

    @Before
    public void initTest() {
        offerType = createEntity(em);
    }

    @Test
    @Transactional
    public void createOfferType() throws Exception {
        int databaseSizeBeforeCreate = offerTypeRepository.findAll().size();

        // Create the OfferType
        restOfferTypeMockMvc.perform(post("/api/offer-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(offerType)))
            .andExpect(status().isCreated());

        // Validate the OfferType in the database
        List<OfferType> offerTypeList = offerTypeRepository.findAll();
        assertThat(offerTypeList).hasSize(databaseSizeBeforeCreate + 1);
        OfferType testOfferType = offerTypeList.get(offerTypeList.size() - 1);
        assertThat(testOfferType.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createOfferTypeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = offerTypeRepository.findAll().size();

        // Create the OfferType with an existing ID
        offerType.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restOfferTypeMockMvc.perform(post("/api/offer-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(offerType)))
            .andExpect(status().isBadRequest());

        // Validate the OfferType in the database
        List<OfferType> offerTypeList = offerTypeRepository.findAll();
        assertThat(offerTypeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = offerTypeRepository.findAll().size();
        // set the field null
        offerType.setName(null);

        // Create the OfferType, which fails.

        restOfferTypeMockMvc.perform(post("/api/offer-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(offerType)))
            .andExpect(status().isBadRequest());

        List<OfferType> offerTypeList = offerTypeRepository.findAll();
        assertThat(offerTypeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllOfferTypes() throws Exception {
        // Initialize the database
        offerTypeRepository.saveAndFlush(offerType);

        // Get all the offerTypeList
        restOfferTypeMockMvc.perform(get("/api/offer-types?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(offerType.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }

    @Test
    @Transactional
    public void getOfferType() throws Exception {
        // Initialize the database
        offerTypeRepository.saveAndFlush(offerType);

        // Get the offerType
        restOfferTypeMockMvc.perform(get("/api/offer-types/{id}", offerType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(offerType.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingOfferType() throws Exception {
        // Get the offerType
        restOfferTypeMockMvc.perform(get("/api/offer-types/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateOfferType() throws Exception {
        // Initialize the database
        offerTypeRepository.saveAndFlush(offerType);
        int databaseSizeBeforeUpdate = offerTypeRepository.findAll().size();

        // Update the offerType
        OfferType updatedOfferType = offerTypeRepository.findOne(offerType.getId());
        // Disconnect from session so that the updates on updatedOfferType are not directly saved in db
        em.detach(updatedOfferType);
        updatedOfferType
            .name(UPDATED_NAME);

        restOfferTypeMockMvc.perform(put("/api/offer-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedOfferType)))
            .andExpect(status().isOk());

        // Validate the OfferType in the database
        List<OfferType> offerTypeList = offerTypeRepository.findAll();
        assertThat(offerTypeList).hasSize(databaseSizeBeforeUpdate);
        OfferType testOfferType = offerTypeList.get(offerTypeList.size() - 1);
        assertThat(testOfferType.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingOfferType() throws Exception {
        int databaseSizeBeforeUpdate = offerTypeRepository.findAll().size();

        // Create the OfferType

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restOfferTypeMockMvc.perform(put("/api/offer-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(offerType)))
            .andExpect(status().isCreated());

        // Validate the OfferType in the database
        List<OfferType> offerTypeList = offerTypeRepository.findAll();
        assertThat(offerTypeList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteOfferType() throws Exception {
        // Initialize the database
        offerTypeRepository.saveAndFlush(offerType);
        int databaseSizeBeforeDelete = offerTypeRepository.findAll().size();

        // Get the offerType
        restOfferTypeMockMvc.perform(delete("/api/offer-types/{id}", offerType.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<OfferType> offerTypeList = offerTypeRepository.findAll();
        assertThat(offerTypeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(OfferType.class);
        OfferType offerType1 = new OfferType();
        offerType1.setId(1L);
        OfferType offerType2 = new OfferType();
        offerType2.setId(offerType1.getId());
        assertThat(offerType1).isEqualTo(offerType2);
        offerType2.setId(2L);
        assertThat(offerType1).isNotEqualTo(offerType2);
        offerType1.setId(null);
        assertThat(offerType1).isNotEqualTo(offerType2);
    }
}
