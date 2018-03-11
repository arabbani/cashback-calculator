package com.creatives.apsstr.cbcl.web.rest;

import com.creatives.apsstr.cbcl.CbclApp;

import com.creatives.apsstr.cbcl.domain.Offer;
import com.creatives.apsstr.cbcl.repository.OfferRepository;
import com.creatives.apsstr.cbcl.service.OfferService;
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
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;

import static com.creatives.apsstr.cbcl.web.rest.TestUtil.sameInstant;
import static com.creatives.apsstr.cbcl.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the OfferResource REST controller.
 *
 * @see OfferResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CbclApp.class)
public class OfferResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_ADMIN_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_ADMIN_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CODE = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_START_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_START_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_END_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_END_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final Integer DEFAULT_MAXIMUM_USES_PER_USER = 1;
    private static final Integer UPDATED_MAXIMUM_USES_PER_USER = 2;

    private static final Integer DEFAULT_MAXIMUM_USES_PER_DAY = 1;
    private static final Integer UPDATED_MAXIMUM_USES_PER_DAY = 2;

    private static final Integer DEFAULT_MAXIMUM_USES_PER_WEEK = 1;
    private static final Integer UPDATED_MAXIMUM_USES_PER_WEEK = 2;

    private static final Integer DEFAULT_MAXIMUM_USES_PER_MONTH = 1;
    private static final Integer UPDATED_MAXIMUM_USES_PER_MONTH = 2;

    private static final Integer DEFAULT_MAXIMUM_USES_PER_NUMBER = 1;
    private static final Integer UPDATED_MAXIMUM_USES_PER_NUMBER = 2;

    private static final Boolean DEFAULT_NEW_USER_ONLY = false;
    private static final Boolean UPDATED_NEW_USER_ONLY = true;

    private static final Boolean DEFAULT_APP_ONLY = false;
    private static final Boolean UPDATED_APP_ONLY = true;

    private static final Boolean DEFAULT_WEBSITE_ONLY = false;
    private static final Boolean UPDATED_WEBSITE_ONLY = true;

    private static final Long DEFAULT_NUMBER_OF_USES = 1L;
    private static final Long UPDATED_NUMBER_OF_USES = 2L;

    private static final Boolean DEFAULT_DUMMY = false;
    private static final Boolean UPDATED_DUMMY = true;

    private static final Boolean DEFAULT_APSSTR_EXCLUSIVE = false;
    private static final Boolean UPDATED_APSSTR_EXCLUSIVE = true;

    private static final String DEFAULT_URL = "AAAAAAAAAA";
    private static final String UPDATED_URL = "BBBBBBBBBB";

    @Autowired
    private OfferRepository offerRepository;

    @Autowired
    private OfferService offerService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restOfferMockMvc;

    private Offer offer;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final OfferResource offerResource = new OfferResource(offerService);
        this.restOfferMockMvc = MockMvcBuilders.standaloneSetup(offerResource)
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
    public static Offer createEntity(EntityManager em) {
        Offer offer = new Offer()
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION)
            .adminDescription(DEFAULT_ADMIN_DESCRIPTION)
            .code(DEFAULT_CODE)
            .startDate(DEFAULT_START_DATE)
            .endDate(DEFAULT_END_DATE)
            .maximumUsesPerUser(DEFAULT_MAXIMUM_USES_PER_USER)
            .maximumUsesPerDay(DEFAULT_MAXIMUM_USES_PER_DAY)
            .maximumUsesPerWeek(DEFAULT_MAXIMUM_USES_PER_WEEK)
            .maximumUsesPerMonth(DEFAULT_MAXIMUM_USES_PER_MONTH)
            .maximumUsesPerNumber(DEFAULT_MAXIMUM_USES_PER_NUMBER)
            .newUserOnly(DEFAULT_NEW_USER_ONLY)
            .appOnly(DEFAULT_APP_ONLY)
            .websiteOnly(DEFAULT_WEBSITE_ONLY)
            .numberOfUses(DEFAULT_NUMBER_OF_USES)
            .dummy(DEFAULT_DUMMY)
            .apsstrExclusive(DEFAULT_APSSTR_EXCLUSIVE)
            .url(DEFAULT_URL);
        return offer;
    }

    @Before
    public void initTest() {
        offer = createEntity(em);
    }

    @Test
    @Transactional
    public void createOffer() throws Exception {
        int databaseSizeBeforeCreate = offerRepository.findAll().size();

        // Create the Offer
        restOfferMockMvc.perform(post("/api/offers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(offer)))
            .andExpect(status().isCreated());

        // Validate the Offer in the database
        List<Offer> offerList = offerRepository.findAll();
        assertThat(offerList).hasSize(databaseSizeBeforeCreate + 1);
        Offer testOffer = offerList.get(offerList.size() - 1);
        assertThat(testOffer.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testOffer.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testOffer.getAdminDescription()).isEqualTo(DEFAULT_ADMIN_DESCRIPTION);
        assertThat(testOffer.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testOffer.getStartDate()).isEqualTo(DEFAULT_START_DATE);
        assertThat(testOffer.getEndDate()).isEqualTo(DEFAULT_END_DATE);
        assertThat(testOffer.getMaximumUsesPerUser()).isEqualTo(DEFAULT_MAXIMUM_USES_PER_USER);
        assertThat(testOffer.getMaximumUsesPerDay()).isEqualTo(DEFAULT_MAXIMUM_USES_PER_DAY);
        assertThat(testOffer.getMaximumUsesPerWeek()).isEqualTo(DEFAULT_MAXIMUM_USES_PER_WEEK);
        assertThat(testOffer.getMaximumUsesPerMonth()).isEqualTo(DEFAULT_MAXIMUM_USES_PER_MONTH);
        assertThat(testOffer.getMaximumUsesPerNumber()).isEqualTo(DEFAULT_MAXIMUM_USES_PER_NUMBER);
        assertThat(testOffer.isNewUserOnly()).isEqualTo(DEFAULT_NEW_USER_ONLY);
        assertThat(testOffer.isAppOnly()).isEqualTo(DEFAULT_APP_ONLY);
        assertThat(testOffer.isWebsiteOnly()).isEqualTo(DEFAULT_WEBSITE_ONLY);
        assertThat(testOffer.getNumberOfUses()).isEqualTo(DEFAULT_NUMBER_OF_USES);
        assertThat(testOffer.isDummy()).isEqualTo(DEFAULT_DUMMY);
        assertThat(testOffer.isApsstrExclusive()).isEqualTo(DEFAULT_APSSTR_EXCLUSIVE);
        assertThat(testOffer.getUrl()).isEqualTo(DEFAULT_URL);
    }

    @Test
    @Transactional
    public void createOfferWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = offerRepository.findAll().size();

        // Create the Offer with an existing ID
        offer.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restOfferMockMvc.perform(post("/api/offers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(offer)))
            .andExpect(status().isBadRequest());

        // Validate the Offer in the database
        List<Offer> offerList = offerRepository.findAll();
        assertThat(offerList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = offerRepository.findAll().size();
        // set the field null
        offer.setName(null);

        // Create the Offer, which fails.

        restOfferMockMvc.perform(post("/api/offers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(offer)))
            .andExpect(status().isBadRequest());

        List<Offer> offerList = offerRepository.findAll();
        assertThat(offerList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStartDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = offerRepository.findAll().size();
        // set the field null
        offer.setStartDate(null);

        // Create the Offer, which fails.

        restOfferMockMvc.perform(post("/api/offers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(offer)))
            .andExpect(status().isBadRequest());

        List<Offer> offerList = offerRepository.findAll();
        assertThat(offerList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEndDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = offerRepository.findAll().size();
        // set the field null
        offer.setEndDate(null);

        // Create the Offer, which fails.

        restOfferMockMvc.perform(post("/api/offers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(offer)))
            .andExpect(status().isBadRequest());

        List<Offer> offerList = offerRepository.findAll();
        assertThat(offerList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNewUserOnlyIsRequired() throws Exception {
        int databaseSizeBeforeTest = offerRepository.findAll().size();
        // set the field null
        offer.setNewUserOnly(null);

        // Create the Offer, which fails.

        restOfferMockMvc.perform(post("/api/offers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(offer)))
            .andExpect(status().isBadRequest());

        List<Offer> offerList = offerRepository.findAll();
        assertThat(offerList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkAppOnlyIsRequired() throws Exception {
        int databaseSizeBeforeTest = offerRepository.findAll().size();
        // set the field null
        offer.setAppOnly(null);

        // Create the Offer, which fails.

        restOfferMockMvc.perform(post("/api/offers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(offer)))
            .andExpect(status().isBadRequest());

        List<Offer> offerList = offerRepository.findAll();
        assertThat(offerList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkWebsiteOnlyIsRequired() throws Exception {
        int databaseSizeBeforeTest = offerRepository.findAll().size();
        // set the field null
        offer.setWebsiteOnly(null);

        // Create the Offer, which fails.

        restOfferMockMvc.perform(post("/api/offers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(offer)))
            .andExpect(status().isBadRequest());

        List<Offer> offerList = offerRepository.findAll();
        assertThat(offerList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDummyIsRequired() throws Exception {
        int databaseSizeBeforeTest = offerRepository.findAll().size();
        // set the field null
        offer.setDummy(null);

        // Create the Offer, which fails.

        restOfferMockMvc.perform(post("/api/offers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(offer)))
            .andExpect(status().isBadRequest());

        List<Offer> offerList = offerRepository.findAll();
        assertThat(offerList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkApsstrExclusiveIsRequired() throws Exception {
        int databaseSizeBeforeTest = offerRepository.findAll().size();
        // set the field null
        offer.setApsstrExclusive(null);

        // Create the Offer, which fails.

        restOfferMockMvc.perform(post("/api/offers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(offer)))
            .andExpect(status().isBadRequest());

        List<Offer> offerList = offerRepository.findAll();
        assertThat(offerList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllOffers() throws Exception {
        // Initialize the database
        offerRepository.saveAndFlush(offer);

        // Get all the offerList
        restOfferMockMvc.perform(get("/api/offers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(offer.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].adminDescription").value(hasItem(DEFAULT_ADMIN_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE.toString())))
            .andExpect(jsonPath("$.[*].startDate").value(hasItem(sameInstant(DEFAULT_START_DATE))))
            .andExpect(jsonPath("$.[*].endDate").value(hasItem(sameInstant(DEFAULT_END_DATE))))
            .andExpect(jsonPath("$.[*].maximumUsesPerUser").value(hasItem(DEFAULT_MAXIMUM_USES_PER_USER)))
            .andExpect(jsonPath("$.[*].maximumUsesPerDay").value(hasItem(DEFAULT_MAXIMUM_USES_PER_DAY)))
            .andExpect(jsonPath("$.[*].maximumUsesPerWeek").value(hasItem(DEFAULT_MAXIMUM_USES_PER_WEEK)))
            .andExpect(jsonPath("$.[*].maximumUsesPerMonth").value(hasItem(DEFAULT_MAXIMUM_USES_PER_MONTH)))
            .andExpect(jsonPath("$.[*].maximumUsesPerNumber").value(hasItem(DEFAULT_MAXIMUM_USES_PER_NUMBER)))
            .andExpect(jsonPath("$.[*].newUserOnly").value(hasItem(DEFAULT_NEW_USER_ONLY.booleanValue())))
            .andExpect(jsonPath("$.[*].appOnly").value(hasItem(DEFAULT_APP_ONLY.booleanValue())))
            .andExpect(jsonPath("$.[*].websiteOnly").value(hasItem(DEFAULT_WEBSITE_ONLY.booleanValue())))
            .andExpect(jsonPath("$.[*].numberOfUses").value(hasItem(DEFAULT_NUMBER_OF_USES.intValue())))
            .andExpect(jsonPath("$.[*].dummy").value(hasItem(DEFAULT_DUMMY.booleanValue())))
            .andExpect(jsonPath("$.[*].apsstrExclusive").value(hasItem(DEFAULT_APSSTR_EXCLUSIVE.booleanValue())))
            .andExpect(jsonPath("$.[*].url").value(hasItem(DEFAULT_URL.toString())));
    }

    @Test
    @Transactional
    public void getOffer() throws Exception {
        // Initialize the database
        offerRepository.saveAndFlush(offer);

        // Get the offer
        restOfferMockMvc.perform(get("/api/offers/{id}", offer.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(offer.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.adminDescription").value(DEFAULT_ADMIN_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE.toString()))
            .andExpect(jsonPath("$.startDate").value(sameInstant(DEFAULT_START_DATE)))
            .andExpect(jsonPath("$.endDate").value(sameInstant(DEFAULT_END_DATE)))
            .andExpect(jsonPath("$.maximumUsesPerUser").value(DEFAULT_MAXIMUM_USES_PER_USER))
            .andExpect(jsonPath("$.maximumUsesPerDay").value(DEFAULT_MAXIMUM_USES_PER_DAY))
            .andExpect(jsonPath("$.maximumUsesPerWeek").value(DEFAULT_MAXIMUM_USES_PER_WEEK))
            .andExpect(jsonPath("$.maximumUsesPerMonth").value(DEFAULT_MAXIMUM_USES_PER_MONTH))
            .andExpect(jsonPath("$.maximumUsesPerNumber").value(DEFAULT_MAXIMUM_USES_PER_NUMBER))
            .andExpect(jsonPath("$.newUserOnly").value(DEFAULT_NEW_USER_ONLY.booleanValue()))
            .andExpect(jsonPath("$.appOnly").value(DEFAULT_APP_ONLY.booleanValue()))
            .andExpect(jsonPath("$.websiteOnly").value(DEFAULT_WEBSITE_ONLY.booleanValue()))
            .andExpect(jsonPath("$.numberOfUses").value(DEFAULT_NUMBER_OF_USES.intValue()))
            .andExpect(jsonPath("$.dummy").value(DEFAULT_DUMMY.booleanValue()))
            .andExpect(jsonPath("$.apsstrExclusive").value(DEFAULT_APSSTR_EXCLUSIVE.booleanValue()))
            .andExpect(jsonPath("$.url").value(DEFAULT_URL.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingOffer() throws Exception {
        // Get the offer
        restOfferMockMvc.perform(get("/api/offers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateOffer() throws Exception {
        // Initialize the database
        offerService.save(offer);

        int databaseSizeBeforeUpdate = offerRepository.findAll().size();

        // Update the offer
        Offer updatedOffer = offerRepository.findOne(offer.getId());
        // Disconnect from session so that the updates on updatedOffer are not directly saved in db
        em.detach(updatedOffer);
        updatedOffer
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .adminDescription(UPDATED_ADMIN_DESCRIPTION)
            .code(UPDATED_CODE)
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE)
            .maximumUsesPerUser(UPDATED_MAXIMUM_USES_PER_USER)
            .maximumUsesPerDay(UPDATED_MAXIMUM_USES_PER_DAY)
            .maximumUsesPerWeek(UPDATED_MAXIMUM_USES_PER_WEEK)
            .maximumUsesPerMonth(UPDATED_MAXIMUM_USES_PER_MONTH)
            .maximumUsesPerNumber(UPDATED_MAXIMUM_USES_PER_NUMBER)
            .newUserOnly(UPDATED_NEW_USER_ONLY)
            .appOnly(UPDATED_APP_ONLY)
            .websiteOnly(UPDATED_WEBSITE_ONLY)
            .numberOfUses(UPDATED_NUMBER_OF_USES)
            .dummy(UPDATED_DUMMY)
            .apsstrExclusive(UPDATED_APSSTR_EXCLUSIVE)
            .url(UPDATED_URL);

        restOfferMockMvc.perform(put("/api/offers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedOffer)))
            .andExpect(status().isOk());

        // Validate the Offer in the database
        List<Offer> offerList = offerRepository.findAll();
        assertThat(offerList).hasSize(databaseSizeBeforeUpdate);
        Offer testOffer = offerList.get(offerList.size() - 1);
        assertThat(testOffer.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testOffer.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testOffer.getAdminDescription()).isEqualTo(UPDATED_ADMIN_DESCRIPTION);
        assertThat(testOffer.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testOffer.getStartDate()).isEqualTo(UPDATED_START_DATE);
        assertThat(testOffer.getEndDate()).isEqualTo(UPDATED_END_DATE);
        assertThat(testOffer.getMaximumUsesPerUser()).isEqualTo(UPDATED_MAXIMUM_USES_PER_USER);
        assertThat(testOffer.getMaximumUsesPerDay()).isEqualTo(UPDATED_MAXIMUM_USES_PER_DAY);
        assertThat(testOffer.getMaximumUsesPerWeek()).isEqualTo(UPDATED_MAXIMUM_USES_PER_WEEK);
        assertThat(testOffer.getMaximumUsesPerMonth()).isEqualTo(UPDATED_MAXIMUM_USES_PER_MONTH);
        assertThat(testOffer.getMaximumUsesPerNumber()).isEqualTo(UPDATED_MAXIMUM_USES_PER_NUMBER);
        assertThat(testOffer.isNewUserOnly()).isEqualTo(UPDATED_NEW_USER_ONLY);
        assertThat(testOffer.isAppOnly()).isEqualTo(UPDATED_APP_ONLY);
        assertThat(testOffer.isWebsiteOnly()).isEqualTo(UPDATED_WEBSITE_ONLY);
        assertThat(testOffer.getNumberOfUses()).isEqualTo(UPDATED_NUMBER_OF_USES);
        assertThat(testOffer.isDummy()).isEqualTo(UPDATED_DUMMY);
        assertThat(testOffer.isApsstrExclusive()).isEqualTo(UPDATED_APSSTR_EXCLUSIVE);
        assertThat(testOffer.getUrl()).isEqualTo(UPDATED_URL);
    }

    @Test
    @Transactional
    public void updateNonExistingOffer() throws Exception {
        int databaseSizeBeforeUpdate = offerRepository.findAll().size();

        // Create the Offer

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restOfferMockMvc.perform(put("/api/offers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(offer)))
            .andExpect(status().isCreated());

        // Validate the Offer in the database
        List<Offer> offerList = offerRepository.findAll();
        assertThat(offerList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteOffer() throws Exception {
        // Initialize the database
        offerService.save(offer);

        int databaseSizeBeforeDelete = offerRepository.findAll().size();

        // Get the offer
        restOfferMockMvc.perform(delete("/api/offers/{id}", offer.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Offer> offerList = offerRepository.findAll();
        assertThat(offerList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Offer.class);
        Offer offer1 = new Offer();
        offer1.setId(1L);
        Offer offer2 = new Offer();
        offer2.setId(offer1.getId());
        assertThat(offer1).isEqualTo(offer2);
        offer2.setId(2L);
        assertThat(offer1).isNotEqualTo(offer2);
        offer1.setId(null);
        assertThat(offer1).isNotEqualTo(offer2);
    }
}
