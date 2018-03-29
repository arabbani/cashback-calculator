package com.creatives.apsstr.cbcl.web.rest;

import com.creatives.apsstr.cbcl.CbclApp;

import com.creatives.apsstr.cbcl.domain.Affiliate;
import com.creatives.apsstr.cbcl.repository.AffiliateRepository;
import com.creatives.apsstr.cbcl.service.AffiliateService;
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
 * Test class for the AffiliateResource REST controller.
 *
 * @see AffiliateResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CbclApp.class)
public class AffiliateResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_URL = "AAAAAAAAAA";
    private static final String UPDATED_URL = "BBBBBBBBBB";

    private static final Boolean DEFAULT_ACTIVE = false;
    private static final Boolean UPDATED_ACTIVE = true;

    @Autowired
    private AffiliateRepository affiliateRepository;

    @Autowired
    private AffiliateService affiliateService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restAffiliateMockMvc;

    private Affiliate affiliate;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AffiliateResource affiliateResource = new AffiliateResource(affiliateService);
        this.restAffiliateMockMvc = MockMvcBuilders.standaloneSetup(affiliateResource)
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
    public static Affiliate createEntity(EntityManager em) {
        Affiliate affiliate = new Affiliate()
            .name(DEFAULT_NAME)
            .url(DEFAULT_URL)
            .active(DEFAULT_ACTIVE);
        return affiliate;
    }

    @Before
    public void initTest() {
        affiliate = createEntity(em);
    }

    @Test
    @Transactional
    public void createAffiliate() throws Exception {
        int databaseSizeBeforeCreate = affiliateRepository.findAll().size();

        // Create the Affiliate
        restAffiliateMockMvc.perform(post("/api/affiliates")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(affiliate)))
            .andExpect(status().isCreated());

        // Validate the Affiliate in the database
        List<Affiliate> affiliateList = affiliateRepository.findAll();
        assertThat(affiliateList).hasSize(databaseSizeBeforeCreate + 1);
        Affiliate testAffiliate = affiliateList.get(affiliateList.size() - 1);
        assertThat(testAffiliate.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testAffiliate.getUrl()).isEqualTo(DEFAULT_URL);
        assertThat(testAffiliate.isActive()).isEqualTo(DEFAULT_ACTIVE);
    }

    @Test
    @Transactional
    public void createAffiliateWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = affiliateRepository.findAll().size();

        // Create the Affiliate with an existing ID
        affiliate.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAffiliateMockMvc.perform(post("/api/affiliates")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(affiliate)))
            .andExpect(status().isBadRequest());

        // Validate the Affiliate in the database
        List<Affiliate> affiliateList = affiliateRepository.findAll();
        assertThat(affiliateList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = affiliateRepository.findAll().size();
        // set the field null
        affiliate.setName(null);

        // Create the Affiliate, which fails.

        restAffiliateMockMvc.perform(post("/api/affiliates")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(affiliate)))
            .andExpect(status().isBadRequest());

        List<Affiliate> affiliateList = affiliateRepository.findAll();
        assertThat(affiliateList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkActiveIsRequired() throws Exception {
        int databaseSizeBeforeTest = affiliateRepository.findAll().size();
        // set the field null
        affiliate.setActive(null);

        // Create the Affiliate, which fails.

        restAffiliateMockMvc.perform(post("/api/affiliates")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(affiliate)))
            .andExpect(status().isBadRequest());

        List<Affiliate> affiliateList = affiliateRepository.findAll();
        assertThat(affiliateList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllAffiliates() throws Exception {
        // Initialize the database
        affiliateRepository.saveAndFlush(affiliate);

        // Get all the affiliateList
        restAffiliateMockMvc.perform(get("/api/affiliates?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(affiliate.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].url").value(hasItem(DEFAULT_URL.toString())))
            .andExpect(jsonPath("$.[*].active").value(hasItem(DEFAULT_ACTIVE.booleanValue())));
    }

    @Test
    @Transactional
    public void getAffiliate() throws Exception {
        // Initialize the database
        affiliateRepository.saveAndFlush(affiliate);

        // Get the affiliate
        restAffiliateMockMvc.perform(get("/api/affiliates/{id}", affiliate.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(affiliate.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.url").value(DEFAULT_URL.toString()))
            .andExpect(jsonPath("$.active").value(DEFAULT_ACTIVE.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingAffiliate() throws Exception {
        // Get the affiliate
        restAffiliateMockMvc.perform(get("/api/affiliates/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAffiliate() throws Exception {
        // Initialize the database
        affiliateService.save(affiliate);

        int databaseSizeBeforeUpdate = affiliateRepository.findAll().size();

        // Update the affiliate
        Affiliate updatedAffiliate = affiliateRepository.findOne(affiliate.getId());
        // Disconnect from session so that the updates on updatedAffiliate are not directly saved in db
        em.detach(updatedAffiliate);
        updatedAffiliate
            .name(UPDATED_NAME)
            .url(UPDATED_URL)
            .active(UPDATED_ACTIVE);

        restAffiliateMockMvc.perform(put("/api/affiliates")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAffiliate)))
            .andExpect(status().isOk());

        // Validate the Affiliate in the database
        List<Affiliate> affiliateList = affiliateRepository.findAll();
        assertThat(affiliateList).hasSize(databaseSizeBeforeUpdate);
        Affiliate testAffiliate = affiliateList.get(affiliateList.size() - 1);
        assertThat(testAffiliate.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testAffiliate.getUrl()).isEqualTo(UPDATED_URL);
        assertThat(testAffiliate.isActive()).isEqualTo(UPDATED_ACTIVE);
    }

    @Test
    @Transactional
    public void updateNonExistingAffiliate() throws Exception {
        int databaseSizeBeforeUpdate = affiliateRepository.findAll().size();

        // Create the Affiliate

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restAffiliateMockMvc.perform(put("/api/affiliates")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(affiliate)))
            .andExpect(status().isCreated());

        // Validate the Affiliate in the database
        List<Affiliate> affiliateList = affiliateRepository.findAll();
        assertThat(affiliateList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteAffiliate() throws Exception {
        // Initialize the database
        affiliateService.save(affiliate);

        int databaseSizeBeforeDelete = affiliateRepository.findAll().size();

        // Get the affiliate
        restAffiliateMockMvc.perform(delete("/api/affiliates/{id}", affiliate.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Affiliate> affiliateList = affiliateRepository.findAll();
        assertThat(affiliateList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Affiliate.class);
        Affiliate affiliate1 = new Affiliate();
        affiliate1.setId(1L);
        Affiliate affiliate2 = new Affiliate();
        affiliate2.setId(affiliate1.getId());
        assertThat(affiliate1).isEqualTo(affiliate2);
        affiliate2.setId(2L);
        assertThat(affiliate1).isNotEqualTo(affiliate2);
        affiliate1.setId(null);
        assertThat(affiliate1).isNotEqualTo(affiliate2);
    }
}
