package com.creatives.apsstr.cbcl.web.rest;

import com.creatives.apsstr.cbcl.CbclApp;

import com.creatives.apsstr.cbcl.domain.AffiliateCredential;
import com.creatives.apsstr.cbcl.repository.AffiliateCredentialRepository;
import com.creatives.apsstr.cbcl.service.AffiliateCredentialService;
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
 * Test class for the AffiliateCredentialResource REST controller.
 *
 * @see AffiliateCredentialResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CbclApp.class)
public class AffiliateCredentialResourceIntTest {

    private static final String DEFAULT_TRACKING_ID = "AAAAAAAAAA";
    private static final String UPDATED_TRACKING_ID = "BBBBBBBBBB";

    private static final String DEFAULT_TOKEN = "AAAAAAAAAA";
    private static final String UPDATED_TOKEN = "BBBBBBBBBB";

    private static final String DEFAULT_API_KEY = "AAAAAAAAAA";
    private static final String UPDATED_API_KEY = "BBBBBBBBBB";

    private static final Boolean DEFAULT_ACTIVE = false;
    private static final Boolean UPDATED_ACTIVE = true;

    @Autowired
    private AffiliateCredentialRepository affiliateCredentialRepository;

    @Autowired
    private AffiliateCredentialService affiliateCredentialService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restAffiliateCredentialMockMvc;

    private AffiliateCredential affiliateCredential;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AffiliateCredentialResource affiliateCredentialResource = new AffiliateCredentialResource(affiliateCredentialService);
        this.restAffiliateCredentialMockMvc = MockMvcBuilders.standaloneSetup(affiliateCredentialResource)
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
    public static AffiliateCredential createEntity(EntityManager em) {
        AffiliateCredential affiliateCredential = new AffiliateCredential()
            .trackingId(DEFAULT_TRACKING_ID)
            .token(DEFAULT_TOKEN)
            .apiKey(DEFAULT_API_KEY)
            .active(DEFAULT_ACTIVE);
        return affiliateCredential;
    }

    @Before
    public void initTest() {
        affiliateCredential = createEntity(em);
    }

    @Test
    @Transactional
    public void createAffiliateCredential() throws Exception {
        int databaseSizeBeforeCreate = affiliateCredentialRepository.findAll().size();

        // Create the AffiliateCredential
        restAffiliateCredentialMockMvc.perform(post("/api/affiliate-credentials")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(affiliateCredential)))
            .andExpect(status().isCreated());

        // Validate the AffiliateCredential in the database
        List<AffiliateCredential> affiliateCredentialList = affiliateCredentialRepository.findAll();
        assertThat(affiliateCredentialList).hasSize(databaseSizeBeforeCreate + 1);
        AffiliateCredential testAffiliateCredential = affiliateCredentialList.get(affiliateCredentialList.size() - 1);
        assertThat(testAffiliateCredential.getTrackingId()).isEqualTo(DEFAULT_TRACKING_ID);
        assertThat(testAffiliateCredential.getToken()).isEqualTo(DEFAULT_TOKEN);
        assertThat(testAffiliateCredential.getApiKey()).isEqualTo(DEFAULT_API_KEY);
        assertThat(testAffiliateCredential.isActive()).isEqualTo(DEFAULT_ACTIVE);
    }

    @Test
    @Transactional
    public void createAffiliateCredentialWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = affiliateCredentialRepository.findAll().size();

        // Create the AffiliateCredential with an existing ID
        affiliateCredential.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAffiliateCredentialMockMvc.perform(post("/api/affiliate-credentials")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(affiliateCredential)))
            .andExpect(status().isBadRequest());

        // Validate the AffiliateCredential in the database
        List<AffiliateCredential> affiliateCredentialList = affiliateCredentialRepository.findAll();
        assertThat(affiliateCredentialList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkActiveIsRequired() throws Exception {
        int databaseSizeBeforeTest = affiliateCredentialRepository.findAll().size();
        // set the field null
        affiliateCredential.setActive(null);

        // Create the AffiliateCredential, which fails.

        restAffiliateCredentialMockMvc.perform(post("/api/affiliate-credentials")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(affiliateCredential)))
            .andExpect(status().isBadRequest());

        List<AffiliateCredential> affiliateCredentialList = affiliateCredentialRepository.findAll();
        assertThat(affiliateCredentialList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllAffiliateCredentials() throws Exception {
        // Initialize the database
        affiliateCredentialRepository.saveAndFlush(affiliateCredential);

        // Get all the affiliateCredentialList
        restAffiliateCredentialMockMvc.perform(get("/api/affiliate-credentials?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(affiliateCredential.getId().intValue())))
            .andExpect(jsonPath("$.[*].trackingId").value(hasItem(DEFAULT_TRACKING_ID.toString())))
            .andExpect(jsonPath("$.[*].token").value(hasItem(DEFAULT_TOKEN.toString())))
            .andExpect(jsonPath("$.[*].apiKey").value(hasItem(DEFAULT_API_KEY.toString())))
            .andExpect(jsonPath("$.[*].active").value(hasItem(DEFAULT_ACTIVE.booleanValue())));
    }

    @Test
    @Transactional
    public void getAffiliateCredential() throws Exception {
        // Initialize the database
        affiliateCredentialRepository.saveAndFlush(affiliateCredential);

        // Get the affiliateCredential
        restAffiliateCredentialMockMvc.perform(get("/api/affiliate-credentials/{id}", affiliateCredential.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(affiliateCredential.getId().intValue()))
            .andExpect(jsonPath("$.trackingId").value(DEFAULT_TRACKING_ID.toString()))
            .andExpect(jsonPath("$.token").value(DEFAULT_TOKEN.toString()))
            .andExpect(jsonPath("$.apiKey").value(DEFAULT_API_KEY.toString()))
            .andExpect(jsonPath("$.active").value(DEFAULT_ACTIVE.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingAffiliateCredential() throws Exception {
        // Get the affiliateCredential
        restAffiliateCredentialMockMvc.perform(get("/api/affiliate-credentials/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAffiliateCredential() throws Exception {
        // Initialize the database
        affiliateCredentialService.save(affiliateCredential);

        int databaseSizeBeforeUpdate = affiliateCredentialRepository.findAll().size();

        // Update the affiliateCredential
        AffiliateCredential updatedAffiliateCredential = affiliateCredentialRepository.findOne(affiliateCredential.getId());
        // Disconnect from session so that the updates on updatedAffiliateCredential are not directly saved in db
        em.detach(updatedAffiliateCredential);
        updatedAffiliateCredential
            .trackingId(UPDATED_TRACKING_ID)
            .token(UPDATED_TOKEN)
            .apiKey(UPDATED_API_KEY)
            .active(UPDATED_ACTIVE);

        restAffiliateCredentialMockMvc.perform(put("/api/affiliate-credentials")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAffiliateCredential)))
            .andExpect(status().isOk());

        // Validate the AffiliateCredential in the database
        List<AffiliateCredential> affiliateCredentialList = affiliateCredentialRepository.findAll();
        assertThat(affiliateCredentialList).hasSize(databaseSizeBeforeUpdate);
        AffiliateCredential testAffiliateCredential = affiliateCredentialList.get(affiliateCredentialList.size() - 1);
        assertThat(testAffiliateCredential.getTrackingId()).isEqualTo(UPDATED_TRACKING_ID);
        assertThat(testAffiliateCredential.getToken()).isEqualTo(UPDATED_TOKEN);
        assertThat(testAffiliateCredential.getApiKey()).isEqualTo(UPDATED_API_KEY);
        assertThat(testAffiliateCredential.isActive()).isEqualTo(UPDATED_ACTIVE);
    }

    @Test
    @Transactional
    public void updateNonExistingAffiliateCredential() throws Exception {
        int databaseSizeBeforeUpdate = affiliateCredentialRepository.findAll().size();

        // Create the AffiliateCredential

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restAffiliateCredentialMockMvc.perform(put("/api/affiliate-credentials")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(affiliateCredential)))
            .andExpect(status().isCreated());

        // Validate the AffiliateCredential in the database
        List<AffiliateCredential> affiliateCredentialList = affiliateCredentialRepository.findAll();
        assertThat(affiliateCredentialList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteAffiliateCredential() throws Exception {
        // Initialize the database
        affiliateCredentialService.save(affiliateCredential);

        int databaseSizeBeforeDelete = affiliateCredentialRepository.findAll().size();

        // Get the affiliateCredential
        restAffiliateCredentialMockMvc.perform(delete("/api/affiliate-credentials/{id}", affiliateCredential.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<AffiliateCredential> affiliateCredentialList = affiliateCredentialRepository.findAll();
        assertThat(affiliateCredentialList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AffiliateCredential.class);
        AffiliateCredential affiliateCredential1 = new AffiliateCredential();
        affiliateCredential1.setId(1L);
        AffiliateCredential affiliateCredential2 = new AffiliateCredential();
        affiliateCredential2.setId(affiliateCredential1.getId());
        assertThat(affiliateCredential1).isEqualTo(affiliateCredential2);
        affiliateCredential2.setId(2L);
        assertThat(affiliateCredential1).isNotEqualTo(affiliateCredential2);
        affiliateCredential1.setId(null);
        assertThat(affiliateCredential1).isNotEqualTo(affiliateCredential2);
    }
}
