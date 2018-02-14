package com.creatives.apsstr.cbcl.web.rest;

import com.creatives.apsstr.cbcl.CbclApp;

import com.creatives.apsstr.cbcl.domain.OfferReturn;
import com.creatives.apsstr.cbcl.repository.OfferReturnRepository;
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
 * Test class for the OfferReturnResource REST controller.
 *
 * @see OfferReturnResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CbclApp.class)
public class OfferReturnResourceIntTest {

    @Autowired
    private OfferReturnRepository offerReturnRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restOfferReturnMockMvc;

    private OfferReturn offerReturn;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final OfferReturnResource offerReturnResource = new OfferReturnResource(offerReturnRepository);
        this.restOfferReturnMockMvc = MockMvcBuilders.standaloneSetup(offerReturnResource)
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
    public static OfferReturn createEntity(EntityManager em) {
        OfferReturn offerReturn = new OfferReturn();
        return offerReturn;
    }

    @Before
    public void initTest() {
        offerReturn = createEntity(em);
    }

    @Test
    @Transactional
    public void createOfferReturn() throws Exception {
        int databaseSizeBeforeCreate = offerReturnRepository.findAll().size();

        // Create the OfferReturn
        restOfferReturnMockMvc.perform(post("/api/offer-returns")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(offerReturn)))
            .andExpect(status().isCreated());

        // Validate the OfferReturn in the database
        List<OfferReturn> offerReturnList = offerReturnRepository.findAll();
        assertThat(offerReturnList).hasSize(databaseSizeBeforeCreate + 1);
        OfferReturn testOfferReturn = offerReturnList.get(offerReturnList.size() - 1);
    }

    @Test
    @Transactional
    public void createOfferReturnWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = offerReturnRepository.findAll().size();

        // Create the OfferReturn with an existing ID
        offerReturn.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restOfferReturnMockMvc.perform(post("/api/offer-returns")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(offerReturn)))
            .andExpect(status().isBadRequest());

        // Validate the OfferReturn in the database
        List<OfferReturn> offerReturnList = offerReturnRepository.findAll();
        assertThat(offerReturnList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllOfferReturns() throws Exception {
        // Initialize the database
        offerReturnRepository.saveAndFlush(offerReturn);

        // Get all the offerReturnList
        restOfferReturnMockMvc.perform(get("/api/offer-returns?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(offerReturn.getId().intValue())));
    }

    @Test
    @Transactional
    public void getOfferReturn() throws Exception {
        // Initialize the database
        offerReturnRepository.saveAndFlush(offerReturn);

        // Get the offerReturn
        restOfferReturnMockMvc.perform(get("/api/offer-returns/{id}", offerReturn.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(offerReturn.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingOfferReturn() throws Exception {
        // Get the offerReturn
        restOfferReturnMockMvc.perform(get("/api/offer-returns/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateOfferReturn() throws Exception {
        // Initialize the database
        offerReturnRepository.saveAndFlush(offerReturn);
        int databaseSizeBeforeUpdate = offerReturnRepository.findAll().size();

        // Update the offerReturn
        OfferReturn updatedOfferReturn = offerReturnRepository.findOne(offerReturn.getId());
        // Disconnect from session so that the updates on updatedOfferReturn are not directly saved in db
        em.detach(updatedOfferReturn);

        restOfferReturnMockMvc.perform(put("/api/offer-returns")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedOfferReturn)))
            .andExpect(status().isOk());

        // Validate the OfferReturn in the database
        List<OfferReturn> offerReturnList = offerReturnRepository.findAll();
        assertThat(offerReturnList).hasSize(databaseSizeBeforeUpdate);
        OfferReturn testOfferReturn = offerReturnList.get(offerReturnList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingOfferReturn() throws Exception {
        int databaseSizeBeforeUpdate = offerReturnRepository.findAll().size();

        // Create the OfferReturn

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restOfferReturnMockMvc.perform(put("/api/offer-returns")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(offerReturn)))
            .andExpect(status().isCreated());

        // Validate the OfferReturn in the database
        List<OfferReturn> offerReturnList = offerReturnRepository.findAll();
        assertThat(offerReturnList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteOfferReturn() throws Exception {
        // Initialize the database
        offerReturnRepository.saveAndFlush(offerReturn);
        int databaseSizeBeforeDelete = offerReturnRepository.findAll().size();

        // Get the offerReturn
        restOfferReturnMockMvc.perform(delete("/api/offer-returns/{id}", offerReturn.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<OfferReturn> offerReturnList = offerReturnRepository.findAll();
        assertThat(offerReturnList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(OfferReturn.class);
        OfferReturn offerReturn1 = new OfferReturn();
        offerReturn1.setId(1L);
        OfferReturn offerReturn2 = new OfferReturn();
        offerReturn2.setId(offerReturn1.getId());
        assertThat(offerReturn1).isEqualTo(offerReturn2);
        offerReturn2.setId(2L);
        assertThat(offerReturn1).isNotEqualTo(offerReturn2);
        offerReturn1.setId(null);
        assertThat(offerReturn1).isNotEqualTo(offerReturn2);
    }
}
