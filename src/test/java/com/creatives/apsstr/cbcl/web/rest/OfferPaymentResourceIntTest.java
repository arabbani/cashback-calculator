package com.creatives.apsstr.cbcl.web.rest;

import com.creatives.apsstr.cbcl.CbclApp;

import com.creatives.apsstr.cbcl.domain.OfferPayment;
import com.creatives.apsstr.cbcl.repository.OfferPaymentRepository;
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
 * Test class for the OfferPaymentResource REST controller.
 *
 * @see OfferPaymentResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CbclApp.class)
public class OfferPaymentResourceIntTest {

    @Autowired
    private OfferPaymentRepository offerPaymentRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restOfferPaymentMockMvc;

    private OfferPayment offerPayment;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final OfferPaymentResource offerPaymentResource = new OfferPaymentResource(offerPaymentRepository);
        this.restOfferPaymentMockMvc = MockMvcBuilders.standaloneSetup(offerPaymentResource)
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
    public static OfferPayment createEntity(EntityManager em) {
        OfferPayment offerPayment = new OfferPayment();
        return offerPayment;
    }

    @Before
    public void initTest() {
        offerPayment = createEntity(em);
    }

    @Test
    @Transactional
    public void createOfferPayment() throws Exception {
        int databaseSizeBeforeCreate = offerPaymentRepository.findAll().size();

        // Create the OfferPayment
        restOfferPaymentMockMvc.perform(post("/api/offer-payments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(offerPayment)))
            .andExpect(status().isCreated());

        // Validate the OfferPayment in the database
        List<OfferPayment> offerPaymentList = offerPaymentRepository.findAll();
        assertThat(offerPaymentList).hasSize(databaseSizeBeforeCreate + 1);
        OfferPayment testOfferPayment = offerPaymentList.get(offerPaymentList.size() - 1);
    }

    @Test
    @Transactional
    public void createOfferPaymentWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = offerPaymentRepository.findAll().size();

        // Create the OfferPayment with an existing ID
        offerPayment.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restOfferPaymentMockMvc.perform(post("/api/offer-payments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(offerPayment)))
            .andExpect(status().isBadRequest());

        // Validate the OfferPayment in the database
        List<OfferPayment> offerPaymentList = offerPaymentRepository.findAll();
        assertThat(offerPaymentList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllOfferPayments() throws Exception {
        // Initialize the database
        offerPaymentRepository.saveAndFlush(offerPayment);

        // Get all the offerPaymentList
        restOfferPaymentMockMvc.perform(get("/api/offer-payments?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(offerPayment.getId().intValue())));
    }

    @Test
    @Transactional
    public void getOfferPayment() throws Exception {
        // Initialize the database
        offerPaymentRepository.saveAndFlush(offerPayment);

        // Get the offerPayment
        restOfferPaymentMockMvc.perform(get("/api/offer-payments/{id}", offerPayment.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(offerPayment.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingOfferPayment() throws Exception {
        // Get the offerPayment
        restOfferPaymentMockMvc.perform(get("/api/offer-payments/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateOfferPayment() throws Exception {
        // Initialize the database
        offerPaymentRepository.saveAndFlush(offerPayment);
        int databaseSizeBeforeUpdate = offerPaymentRepository.findAll().size();

        // Update the offerPayment
        OfferPayment updatedOfferPayment = offerPaymentRepository.findOne(offerPayment.getId());
        // Disconnect from session so that the updates on updatedOfferPayment are not directly saved in db
        em.detach(updatedOfferPayment);

        restOfferPaymentMockMvc.perform(put("/api/offer-payments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedOfferPayment)))
            .andExpect(status().isOk());

        // Validate the OfferPayment in the database
        List<OfferPayment> offerPaymentList = offerPaymentRepository.findAll();
        assertThat(offerPaymentList).hasSize(databaseSizeBeforeUpdate);
        OfferPayment testOfferPayment = offerPaymentList.get(offerPaymentList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingOfferPayment() throws Exception {
        int databaseSizeBeforeUpdate = offerPaymentRepository.findAll().size();

        // Create the OfferPayment

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restOfferPaymentMockMvc.perform(put("/api/offer-payments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(offerPayment)))
            .andExpect(status().isCreated());

        // Validate the OfferPayment in the database
        List<OfferPayment> offerPaymentList = offerPaymentRepository.findAll();
        assertThat(offerPaymentList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteOfferPayment() throws Exception {
        // Initialize the database
        offerPaymentRepository.saveAndFlush(offerPayment);
        int databaseSizeBeforeDelete = offerPaymentRepository.findAll().size();

        // Get the offerPayment
        restOfferPaymentMockMvc.perform(delete("/api/offer-payments/{id}", offerPayment.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<OfferPayment> offerPaymentList = offerPaymentRepository.findAll();
        assertThat(offerPaymentList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(OfferPayment.class);
        OfferPayment offerPayment1 = new OfferPayment();
        offerPayment1.setId(1L);
        OfferPayment offerPayment2 = new OfferPayment();
        offerPayment2.setId(offerPayment1.getId());
        assertThat(offerPayment1).isEqualTo(offerPayment2);
        offerPayment2.setId(2L);
        assertThat(offerPayment1).isNotEqualTo(offerPayment2);
        offerPayment1.setId(null);
        assertThat(offerPayment1).isNotEqualTo(offerPayment2);
    }
}
