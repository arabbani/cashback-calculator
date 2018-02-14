package com.creatives.apsstr.cbcl.web.rest;

import com.creatives.apsstr.cbcl.CbclApp;

import com.creatives.apsstr.cbcl.domain.OfferPolicy;
import com.creatives.apsstr.cbcl.repository.OfferPolicyRepository;
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
 * Test class for the OfferPolicyResource REST controller.
 *
 * @see OfferPolicyResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CbclApp.class)
public class OfferPolicyResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private OfferPolicyRepository offerPolicyRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restOfferPolicyMockMvc;

    private OfferPolicy offerPolicy;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final OfferPolicyResource offerPolicyResource = new OfferPolicyResource(offerPolicyRepository);
        this.restOfferPolicyMockMvc = MockMvcBuilders.standaloneSetup(offerPolicyResource)
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
    public static OfferPolicy createEntity(EntityManager em) {
        OfferPolicy offerPolicy = new OfferPolicy()
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION);
        return offerPolicy;
    }

    @Before
    public void initTest() {
        offerPolicy = createEntity(em);
    }

    @Test
    @Transactional
    public void createOfferPolicy() throws Exception {
        int databaseSizeBeforeCreate = offerPolicyRepository.findAll().size();

        // Create the OfferPolicy
        restOfferPolicyMockMvc.perform(post("/api/offer-policies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(offerPolicy)))
            .andExpect(status().isCreated());

        // Validate the OfferPolicy in the database
        List<OfferPolicy> offerPolicyList = offerPolicyRepository.findAll();
        assertThat(offerPolicyList).hasSize(databaseSizeBeforeCreate + 1);
        OfferPolicy testOfferPolicy = offerPolicyList.get(offerPolicyList.size() - 1);
        assertThat(testOfferPolicy.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testOfferPolicy.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createOfferPolicyWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = offerPolicyRepository.findAll().size();

        // Create the OfferPolicy with an existing ID
        offerPolicy.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restOfferPolicyMockMvc.perform(post("/api/offer-policies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(offerPolicy)))
            .andExpect(status().isBadRequest());

        // Validate the OfferPolicy in the database
        List<OfferPolicy> offerPolicyList = offerPolicyRepository.findAll();
        assertThat(offerPolicyList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkDescriptionIsRequired() throws Exception {
        int databaseSizeBeforeTest = offerPolicyRepository.findAll().size();
        // set the field null
        offerPolicy.setDescription(null);

        // Create the OfferPolicy, which fails.

        restOfferPolicyMockMvc.perform(post("/api/offer-policies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(offerPolicy)))
            .andExpect(status().isBadRequest());

        List<OfferPolicy> offerPolicyList = offerPolicyRepository.findAll();
        assertThat(offerPolicyList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllOfferPolicies() throws Exception {
        // Initialize the database
        offerPolicyRepository.saveAndFlush(offerPolicy);

        // Get all the offerPolicyList
        restOfferPolicyMockMvc.perform(get("/api/offer-policies?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(offerPolicy.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }

    @Test
    @Transactional
    public void getOfferPolicy() throws Exception {
        // Initialize the database
        offerPolicyRepository.saveAndFlush(offerPolicy);

        // Get the offerPolicy
        restOfferPolicyMockMvc.perform(get("/api/offer-policies/{id}", offerPolicy.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(offerPolicy.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingOfferPolicy() throws Exception {
        // Get the offerPolicy
        restOfferPolicyMockMvc.perform(get("/api/offer-policies/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateOfferPolicy() throws Exception {
        // Initialize the database
        offerPolicyRepository.saveAndFlush(offerPolicy);
        int databaseSizeBeforeUpdate = offerPolicyRepository.findAll().size();

        // Update the offerPolicy
        OfferPolicy updatedOfferPolicy = offerPolicyRepository.findOne(offerPolicy.getId());
        // Disconnect from session so that the updates on updatedOfferPolicy are not directly saved in db
        em.detach(updatedOfferPolicy);
        updatedOfferPolicy
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION);

        restOfferPolicyMockMvc.perform(put("/api/offer-policies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedOfferPolicy)))
            .andExpect(status().isOk());

        // Validate the OfferPolicy in the database
        List<OfferPolicy> offerPolicyList = offerPolicyRepository.findAll();
        assertThat(offerPolicyList).hasSize(databaseSizeBeforeUpdate);
        OfferPolicy testOfferPolicy = offerPolicyList.get(offerPolicyList.size() - 1);
        assertThat(testOfferPolicy.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testOfferPolicy.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingOfferPolicy() throws Exception {
        int databaseSizeBeforeUpdate = offerPolicyRepository.findAll().size();

        // Create the OfferPolicy

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restOfferPolicyMockMvc.perform(put("/api/offer-policies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(offerPolicy)))
            .andExpect(status().isCreated());

        // Validate the OfferPolicy in the database
        List<OfferPolicy> offerPolicyList = offerPolicyRepository.findAll();
        assertThat(offerPolicyList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteOfferPolicy() throws Exception {
        // Initialize the database
        offerPolicyRepository.saveAndFlush(offerPolicy);
        int databaseSizeBeforeDelete = offerPolicyRepository.findAll().size();

        // Get the offerPolicy
        restOfferPolicyMockMvc.perform(delete("/api/offer-policies/{id}", offerPolicy.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<OfferPolicy> offerPolicyList = offerPolicyRepository.findAll();
        assertThat(offerPolicyList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(OfferPolicy.class);
        OfferPolicy offerPolicy1 = new OfferPolicy();
        offerPolicy1.setId(1L);
        OfferPolicy offerPolicy2 = new OfferPolicy();
        offerPolicy2.setId(offerPolicy1.getId());
        assertThat(offerPolicy1).isEqualTo(offerPolicy2);
        offerPolicy2.setId(2L);
        assertThat(offerPolicy1).isNotEqualTo(offerPolicy2);
        offerPolicy1.setId(null);
        assertThat(offerPolicy1).isNotEqualTo(offerPolicy2);
    }
}
