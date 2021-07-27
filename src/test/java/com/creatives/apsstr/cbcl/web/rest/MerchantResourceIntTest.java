package com.creatives.apsstr.cbcl.web.rest;

import com.creatives.apsstr.cbcl.CbclApp;

import com.creatives.apsstr.cbcl.domain.Merchant;
import com.creatives.apsstr.cbcl.repository.MerchantRepository;
import com.creatives.apsstr.cbcl.service.MerchantService;
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
 * Test class for the MerchantResource REST controller.
 *
 * @see MerchantResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CbclApp.class)
public class MerchantResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_URL = "AAAAAAAAAA";
    private static final String UPDATED_URL = "BBBBBBBBBB";

    private static final Boolean DEFAULT_ACTIVE = false;
    private static final Boolean UPDATED_ACTIVE = true;

    @Autowired
    private MerchantRepository merchantRepository;

    @Autowired
    private MerchantService merchantService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restMerchantMockMvc;

    private Merchant merchant;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MerchantResource merchantResource = new MerchantResource(merchantService);
        this.restMerchantMockMvc = MockMvcBuilders.standaloneSetup(merchantResource)
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
    public static Merchant createEntity(EntityManager em) {
        Merchant merchant = new Merchant()
            .name(DEFAULT_NAME)
            .url(DEFAULT_URL)
            .active(DEFAULT_ACTIVE);
        return merchant;
    }

    @Before
    public void initTest() {
        merchant = createEntity(em);
    }

    @Test
    @Transactional
    public void createMerchant() throws Exception {
        int databaseSizeBeforeCreate = merchantRepository.findAll().size();

        // Create the Merchant
        restMerchantMockMvc.perform(post("/api/merchants")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(merchant)))
            .andExpect(status().isCreated());

        // Validate the Merchant in the database
        List<Merchant> merchantList = merchantRepository.findAll();
        assertThat(merchantList).hasSize(databaseSizeBeforeCreate + 1);
        Merchant testMerchant = merchantList.get(merchantList.size() - 1);
        assertThat(testMerchant.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testMerchant.getUrl()).isEqualTo(DEFAULT_URL);
        assertThat(testMerchant.isActive()).isEqualTo(DEFAULT_ACTIVE);
    }

    @Test
    @Transactional
    public void createMerchantWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = merchantRepository.findAll().size();

        // Create the Merchant with an existing ID
        merchant.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMerchantMockMvc.perform(post("/api/merchants")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(merchant)))
            .andExpect(status().isBadRequest());

        // Validate the Merchant in the database
        List<Merchant> merchantList = merchantRepository.findAll();
        assertThat(merchantList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = merchantRepository.findAll().size();
        // set the field null
        merchant.setName(null);

        // Create the Merchant, which fails.

        restMerchantMockMvc.perform(post("/api/merchants")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(merchant)))
            .andExpect(status().isBadRequest());

        List<Merchant> merchantList = merchantRepository.findAll();
        assertThat(merchantList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkActiveIsRequired() throws Exception {
        int databaseSizeBeforeTest = merchantRepository.findAll().size();
        // set the field null
        merchant.setActive(null);

        // Create the Merchant, which fails.

        restMerchantMockMvc.perform(post("/api/merchants")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(merchant)))
            .andExpect(status().isBadRequest());

        List<Merchant> merchantList = merchantRepository.findAll();
        assertThat(merchantList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllMerchants() throws Exception {
        // Initialize the database
        merchantRepository.saveAndFlush(merchant);

        // Get all the merchantList
        restMerchantMockMvc.perform(get("/api/merchants?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(merchant.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].url").value(hasItem(DEFAULT_URL.toString())))
            .andExpect(jsonPath("$.[*].active").value(hasItem(DEFAULT_ACTIVE.booleanValue())));
    }

    @Test
    @Transactional
    public void getMerchant() throws Exception {
        // Initialize the database
        merchantRepository.saveAndFlush(merchant);

        // Get the merchant
        restMerchantMockMvc.perform(get("/api/merchants/{id}", merchant.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(merchant.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.url").value(DEFAULT_URL.toString()))
            .andExpect(jsonPath("$.active").value(DEFAULT_ACTIVE.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingMerchant() throws Exception {
        // Get the merchant
        restMerchantMockMvc.perform(get("/api/merchants/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMerchant() throws Exception {
        // Initialize the database
        merchantService.save(merchant);

        int databaseSizeBeforeUpdate = merchantRepository.findAll().size();

        // Update the merchant
        Merchant updatedMerchant = merchantRepository.findOne(merchant.getId());
        // Disconnect from session so that the updates on updatedMerchant are not directly saved in db
        em.detach(updatedMerchant);
        updatedMerchant
            .name(UPDATED_NAME)
            .url(UPDATED_URL)
            .active(UPDATED_ACTIVE);

        restMerchantMockMvc.perform(put("/api/merchants")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMerchant)))
            .andExpect(status().isOk());

        // Validate the Merchant in the database
        List<Merchant> merchantList = merchantRepository.findAll();
        assertThat(merchantList).hasSize(databaseSizeBeforeUpdate);
        Merchant testMerchant = merchantList.get(merchantList.size() - 1);
        assertThat(testMerchant.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testMerchant.getUrl()).isEqualTo(UPDATED_URL);
        assertThat(testMerchant.isActive()).isEqualTo(UPDATED_ACTIVE);
    }

    @Test
    @Transactional
    public void updateNonExistingMerchant() throws Exception {
        int databaseSizeBeforeUpdate = merchantRepository.findAll().size();

        // Create the Merchant

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restMerchantMockMvc.perform(put("/api/merchants")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(merchant)))
            .andExpect(status().isCreated());

        // Validate the Merchant in the database
        List<Merchant> merchantList = merchantRepository.findAll();
        assertThat(merchantList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteMerchant() throws Exception {
        // Initialize the database
        merchantService.save(merchant);

        int databaseSizeBeforeDelete = merchantRepository.findAll().size();

        // Get the merchant
        restMerchantMockMvc.perform(delete("/api/merchants/{id}", merchant.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Merchant> merchantList = merchantRepository.findAll();
        assertThat(merchantList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Merchant.class);
        Merchant merchant1 = new Merchant();
        merchant1.setId(1L);
        Merchant merchant2 = new Merchant();
        merchant2.setId(merchant1.getId());
        assertThat(merchant1).isEqualTo(merchant2);
        merchant2.setId(2L);
        assertThat(merchant1).isNotEqualTo(merchant2);
        merchant1.setId(null);
        assertThat(merchant1).isNotEqualTo(merchant2);
    }
}
