package com.creatives.apsstr.cbcl.web.rest;

import com.creatives.apsstr.cbcl.CbclApp;

import com.creatives.apsstr.cbcl.domain.ReturnExtras;
import com.creatives.apsstr.cbcl.repository.ReturnExtrasRepository;
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
 * Test class for the ReturnExtrasResource REST controller.
 *
 * @see ReturnExtrasResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CbclApp.class)
public class ReturnExtrasResourceIntTest {

    private static final Integer DEFAULT_MINIMUM_EXPENSE = 1;
    private static final Integer UPDATED_MINIMUM_EXPENSE = 2;

    private static final Boolean DEFAULT_EXACT = false;
    private static final Boolean UPDATED_EXACT = true;

    private static final Integer DEFAULT_MAXIMUM_EXPENSE = 1;
    private static final Integer UPDATED_MAXIMUM_EXPENSE = 2;

    private static final Integer DEFAULT_MINIMUM_RETURN = 1;
    private static final Integer UPDATED_MINIMUM_RETURN = 2;

    private static final Integer DEFAULT_MAXIMUM_RETURN = 1;
    private static final Integer UPDATED_MAXIMUM_RETURN = 2;

    private static final Integer DEFAULT_MINIMUM_TICKET_REQUIRED = 1;
    private static final Integer UPDATED_MINIMUM_TICKET_REQUIRED = 2;

    private static final Integer DEFAULT_MINIMUM_RIDE_REQUIRED = 1;
    private static final Integer UPDATED_MINIMUM_RIDE_REQUIRED = 2;

    @Autowired
    private ReturnExtrasRepository returnExtrasRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restReturnExtrasMockMvc;

    private ReturnExtras returnExtras;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ReturnExtrasResource returnExtrasResource = new ReturnExtrasResource(returnExtrasRepository);
        this.restReturnExtrasMockMvc = MockMvcBuilders.standaloneSetup(returnExtrasResource)
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
    public static ReturnExtras createEntity(EntityManager em) {
        ReturnExtras returnExtras = new ReturnExtras()
            .minimumExpense(DEFAULT_MINIMUM_EXPENSE)
            .exact(DEFAULT_EXACT)
            .maximumExpense(DEFAULT_MAXIMUM_EXPENSE)
            .minimumReturn(DEFAULT_MINIMUM_RETURN)
            .maximumReturn(DEFAULT_MAXIMUM_RETURN)
            .minimumTicketRequired(DEFAULT_MINIMUM_TICKET_REQUIRED)
            .minimumRideRequired(DEFAULT_MINIMUM_RIDE_REQUIRED);
        return returnExtras;
    }

    @Before
    public void initTest() {
        returnExtras = createEntity(em);
    }

    @Test
    @Transactional
    public void createReturnExtras() throws Exception {
        int databaseSizeBeforeCreate = returnExtrasRepository.findAll().size();

        // Create the ReturnExtras
        restReturnExtrasMockMvc.perform(post("/api/return-extras")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(returnExtras)))
            .andExpect(status().isCreated());

        // Validate the ReturnExtras in the database
        List<ReturnExtras> returnExtrasList = returnExtrasRepository.findAll();
        assertThat(returnExtrasList).hasSize(databaseSizeBeforeCreate + 1);
        ReturnExtras testReturnExtras = returnExtrasList.get(returnExtrasList.size() - 1);
        assertThat(testReturnExtras.getMinimumExpense()).isEqualTo(DEFAULT_MINIMUM_EXPENSE);
        assertThat(testReturnExtras.isExact()).isEqualTo(DEFAULT_EXACT);
        assertThat(testReturnExtras.getMaximumExpense()).isEqualTo(DEFAULT_MAXIMUM_EXPENSE);
        assertThat(testReturnExtras.getMinimumReturn()).isEqualTo(DEFAULT_MINIMUM_RETURN);
        assertThat(testReturnExtras.getMaximumReturn()).isEqualTo(DEFAULT_MAXIMUM_RETURN);
        assertThat(testReturnExtras.getMinimumTicketRequired()).isEqualTo(DEFAULT_MINIMUM_TICKET_REQUIRED);
        assertThat(testReturnExtras.getMinimumRideRequired()).isEqualTo(DEFAULT_MINIMUM_RIDE_REQUIRED);
    }

    @Test
    @Transactional
    public void createReturnExtrasWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = returnExtrasRepository.findAll().size();

        // Create the ReturnExtras with an existing ID
        returnExtras.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restReturnExtrasMockMvc.perform(post("/api/return-extras")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(returnExtras)))
            .andExpect(status().isBadRequest());

        // Validate the ReturnExtras in the database
        List<ReturnExtras> returnExtrasList = returnExtrasRepository.findAll();
        assertThat(returnExtrasList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllReturnExtras() throws Exception {
        // Initialize the database
        returnExtrasRepository.saveAndFlush(returnExtras);

        // Get all the returnExtrasList
        restReturnExtrasMockMvc.perform(get("/api/return-extras?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(returnExtras.getId().intValue())))
            .andExpect(jsonPath("$.[*].minimumExpense").value(hasItem(DEFAULT_MINIMUM_EXPENSE)))
            .andExpect(jsonPath("$.[*].exact").value(hasItem(DEFAULT_EXACT.booleanValue())))
            .andExpect(jsonPath("$.[*].maximumExpense").value(hasItem(DEFAULT_MAXIMUM_EXPENSE)))
            .andExpect(jsonPath("$.[*].minimumReturn").value(hasItem(DEFAULT_MINIMUM_RETURN)))
            .andExpect(jsonPath("$.[*].maximumReturn").value(hasItem(DEFAULT_MAXIMUM_RETURN)))
            .andExpect(jsonPath("$.[*].minimumTicketRequired").value(hasItem(DEFAULT_MINIMUM_TICKET_REQUIRED)))
            .andExpect(jsonPath("$.[*].minimumRideRequired").value(hasItem(DEFAULT_MINIMUM_RIDE_REQUIRED)));
    }

    @Test
    @Transactional
    public void getReturnExtras() throws Exception {
        // Initialize the database
        returnExtrasRepository.saveAndFlush(returnExtras);

        // Get the returnExtras
        restReturnExtrasMockMvc.perform(get("/api/return-extras/{id}", returnExtras.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(returnExtras.getId().intValue()))
            .andExpect(jsonPath("$.minimumExpense").value(DEFAULT_MINIMUM_EXPENSE))
            .andExpect(jsonPath("$.exact").value(DEFAULT_EXACT.booleanValue()))
            .andExpect(jsonPath("$.maximumExpense").value(DEFAULT_MAXIMUM_EXPENSE))
            .andExpect(jsonPath("$.minimumReturn").value(DEFAULT_MINIMUM_RETURN))
            .andExpect(jsonPath("$.maximumReturn").value(DEFAULT_MAXIMUM_RETURN))
            .andExpect(jsonPath("$.minimumTicketRequired").value(DEFAULT_MINIMUM_TICKET_REQUIRED))
            .andExpect(jsonPath("$.minimumRideRequired").value(DEFAULT_MINIMUM_RIDE_REQUIRED));
    }

    @Test
    @Transactional
    public void getNonExistingReturnExtras() throws Exception {
        // Get the returnExtras
        restReturnExtrasMockMvc.perform(get("/api/return-extras/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateReturnExtras() throws Exception {
        // Initialize the database
        returnExtrasRepository.saveAndFlush(returnExtras);
        int databaseSizeBeforeUpdate = returnExtrasRepository.findAll().size();

        // Update the returnExtras
        ReturnExtras updatedReturnExtras = returnExtrasRepository.findOne(returnExtras.getId());
        // Disconnect from session so that the updates on updatedReturnExtras are not directly saved in db
        em.detach(updatedReturnExtras);
        updatedReturnExtras
            .minimumExpense(UPDATED_MINIMUM_EXPENSE)
            .exact(UPDATED_EXACT)
            .maximumExpense(UPDATED_MAXIMUM_EXPENSE)
            .minimumReturn(UPDATED_MINIMUM_RETURN)
            .maximumReturn(UPDATED_MAXIMUM_RETURN)
            .minimumTicketRequired(UPDATED_MINIMUM_TICKET_REQUIRED)
            .minimumRideRequired(UPDATED_MINIMUM_RIDE_REQUIRED);

        restReturnExtrasMockMvc.perform(put("/api/return-extras")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedReturnExtras)))
            .andExpect(status().isOk());

        // Validate the ReturnExtras in the database
        List<ReturnExtras> returnExtrasList = returnExtrasRepository.findAll();
        assertThat(returnExtrasList).hasSize(databaseSizeBeforeUpdate);
        ReturnExtras testReturnExtras = returnExtrasList.get(returnExtrasList.size() - 1);
        assertThat(testReturnExtras.getMinimumExpense()).isEqualTo(UPDATED_MINIMUM_EXPENSE);
        assertThat(testReturnExtras.isExact()).isEqualTo(UPDATED_EXACT);
        assertThat(testReturnExtras.getMaximumExpense()).isEqualTo(UPDATED_MAXIMUM_EXPENSE);
        assertThat(testReturnExtras.getMinimumReturn()).isEqualTo(UPDATED_MINIMUM_RETURN);
        assertThat(testReturnExtras.getMaximumReturn()).isEqualTo(UPDATED_MAXIMUM_RETURN);
        assertThat(testReturnExtras.getMinimumTicketRequired()).isEqualTo(UPDATED_MINIMUM_TICKET_REQUIRED);
        assertThat(testReturnExtras.getMinimumRideRequired()).isEqualTo(UPDATED_MINIMUM_RIDE_REQUIRED);
    }

    @Test
    @Transactional
    public void updateNonExistingReturnExtras() throws Exception {
        int databaseSizeBeforeUpdate = returnExtrasRepository.findAll().size();

        // Create the ReturnExtras

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restReturnExtrasMockMvc.perform(put("/api/return-extras")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(returnExtras)))
            .andExpect(status().isCreated());

        // Validate the ReturnExtras in the database
        List<ReturnExtras> returnExtrasList = returnExtrasRepository.findAll();
        assertThat(returnExtrasList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteReturnExtras() throws Exception {
        // Initialize the database
        returnExtrasRepository.saveAndFlush(returnExtras);
        int databaseSizeBeforeDelete = returnExtrasRepository.findAll().size();

        // Get the returnExtras
        restReturnExtrasMockMvc.perform(delete("/api/return-extras/{id}", returnExtras.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ReturnExtras> returnExtrasList = returnExtrasRepository.findAll();
        assertThat(returnExtrasList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ReturnExtras.class);
        ReturnExtras returnExtras1 = new ReturnExtras();
        returnExtras1.setId(1L);
        ReturnExtras returnExtras2 = new ReturnExtras();
        returnExtras2.setId(returnExtras1.getId());
        assertThat(returnExtras1).isEqualTo(returnExtras2);
        returnExtras2.setId(2L);
        assertThat(returnExtras1).isNotEqualTo(returnExtras2);
        returnExtras1.setId(null);
        assertThat(returnExtras1).isNotEqualTo(returnExtras2);
    }
}
