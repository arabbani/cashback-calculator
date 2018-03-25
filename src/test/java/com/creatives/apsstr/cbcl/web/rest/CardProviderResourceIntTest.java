package com.creatives.apsstr.cbcl.web.rest;

import com.creatives.apsstr.cbcl.CbclApp;

import com.creatives.apsstr.cbcl.domain.CardProvider;
import com.creatives.apsstr.cbcl.repository.CardProviderRepository;
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
 * Test class for the CardProviderResource REST controller.
 *
 * @see CardProviderResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CbclApp.class)
public class CardProviderResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private CardProviderRepository cardProviderRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCardProviderMockMvc;

    private CardProvider cardProvider;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CardProviderResource cardProviderResource = new CardProviderResource(cardProviderRepository);
        this.restCardProviderMockMvc = MockMvcBuilders.standaloneSetup(cardProviderResource)
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
    public static CardProvider createEntity(EntityManager em) {
        CardProvider cardProvider = new CardProvider()
            .name(DEFAULT_NAME);
        return cardProvider;
    }

    @Before
    public void initTest() {
        cardProvider = createEntity(em);
    }

    @Test
    @Transactional
    public void createCardProvider() throws Exception {
        int databaseSizeBeforeCreate = cardProviderRepository.findAll().size();

        // Create the CardProvider
        restCardProviderMockMvc.perform(post("/api/card-providers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cardProvider)))
            .andExpect(status().isCreated());

        // Validate the CardProvider in the database
        List<CardProvider> cardProviderList = cardProviderRepository.findAll();
        assertThat(cardProviderList).hasSize(databaseSizeBeforeCreate + 1);
        CardProvider testCardProvider = cardProviderList.get(cardProviderList.size() - 1);
        assertThat(testCardProvider.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createCardProviderWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = cardProviderRepository.findAll().size();

        // Create the CardProvider with an existing ID
        cardProvider.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCardProviderMockMvc.perform(post("/api/card-providers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cardProvider)))
            .andExpect(status().isBadRequest());

        // Validate the CardProvider in the database
        List<CardProvider> cardProviderList = cardProviderRepository.findAll();
        assertThat(cardProviderList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = cardProviderRepository.findAll().size();
        // set the field null
        cardProvider.setName(null);

        // Create the CardProvider, which fails.

        restCardProviderMockMvc.perform(post("/api/card-providers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cardProvider)))
            .andExpect(status().isBadRequest());

        List<CardProvider> cardProviderList = cardProviderRepository.findAll();
        assertThat(cardProviderList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCardProviders() throws Exception {
        // Initialize the database
        cardProviderRepository.saveAndFlush(cardProvider);

        // Get all the cardProviderList
        restCardProviderMockMvc.perform(get("/api/card-providers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cardProvider.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }

    @Test
    @Transactional
    public void getCardProvider() throws Exception {
        // Initialize the database
        cardProviderRepository.saveAndFlush(cardProvider);

        // Get the cardProvider
        restCardProviderMockMvc.perform(get("/api/card-providers/{id}", cardProvider.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(cardProvider.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCardProvider() throws Exception {
        // Get the cardProvider
        restCardProviderMockMvc.perform(get("/api/card-providers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCardProvider() throws Exception {
        // Initialize the database
        cardProviderRepository.saveAndFlush(cardProvider);
        int databaseSizeBeforeUpdate = cardProviderRepository.findAll().size();

        // Update the cardProvider
        CardProvider updatedCardProvider = cardProviderRepository.findOne(cardProvider.getId());
        // Disconnect from session so that the updates on updatedCardProvider are not directly saved in db
        em.detach(updatedCardProvider);
        updatedCardProvider
            .name(UPDATED_NAME);

        restCardProviderMockMvc.perform(put("/api/card-providers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCardProvider)))
            .andExpect(status().isOk());

        // Validate the CardProvider in the database
        List<CardProvider> cardProviderList = cardProviderRepository.findAll();
        assertThat(cardProviderList).hasSize(databaseSizeBeforeUpdate);
        CardProvider testCardProvider = cardProviderList.get(cardProviderList.size() - 1);
        assertThat(testCardProvider.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingCardProvider() throws Exception {
        int databaseSizeBeforeUpdate = cardProviderRepository.findAll().size();

        // Create the CardProvider

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCardProviderMockMvc.perform(put("/api/card-providers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cardProvider)))
            .andExpect(status().isCreated());

        // Validate the CardProvider in the database
        List<CardProvider> cardProviderList = cardProviderRepository.findAll();
        assertThat(cardProviderList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteCardProvider() throws Exception {
        // Initialize the database
        cardProviderRepository.saveAndFlush(cardProvider);
        int databaseSizeBeforeDelete = cardProviderRepository.findAll().size();

        // Get the cardProvider
        restCardProviderMockMvc.perform(delete("/api/card-providers/{id}", cardProvider.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<CardProvider> cardProviderList = cardProviderRepository.findAll();
        assertThat(cardProviderList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CardProvider.class);
        CardProvider cardProvider1 = new CardProvider();
        cardProvider1.setId(1L);
        CardProvider cardProvider2 = new CardProvider();
        cardProvider2.setId(cardProvider1.getId());
        assertThat(cardProvider1).isEqualTo(cardProvider2);
        cardProvider2.setId(2L);
        assertThat(cardProvider1).isNotEqualTo(cardProvider2);
        cardProvider1.setId(null);
        assertThat(cardProvider1).isNotEqualTo(cardProvider2);
    }
}
