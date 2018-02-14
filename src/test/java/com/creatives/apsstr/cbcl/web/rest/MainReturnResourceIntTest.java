package com.creatives.apsstr.cbcl.web.rest;

import com.creatives.apsstr.cbcl.CbclApp;

import com.creatives.apsstr.cbcl.domain.MainReturn;
import com.creatives.apsstr.cbcl.repository.MainReturnRepository;
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
 * Test class for the MainReturnResource REST controller.
 *
 * @see MainReturnResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CbclApp.class)
public class MainReturnResourceIntTest {

    private static final Integer DEFAULT_AMOUNT = 1;
    private static final Integer UPDATED_AMOUNT = 2;

    private static final Boolean DEFAULT_EXACT = false;
    private static final Boolean UPDATED_EXACT = true;

    private static final Integer DEFAULT_DEFAULT_AMOUNT = 1;
    private static final Integer UPDATED_DEFAULT_AMOUNT = 2;

    @Autowired
    private MainReturnRepository mainReturnRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restMainReturnMockMvc;

    private MainReturn mainReturn;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MainReturnResource mainReturnResource = new MainReturnResource(mainReturnRepository);
        this.restMainReturnMockMvc = MockMvcBuilders.standaloneSetup(mainReturnResource)
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
    public static MainReturn createEntity(EntityManager em) {
        MainReturn mainReturn = new MainReturn()
            .amount(DEFAULT_AMOUNT)
            .exact(DEFAULT_EXACT)
            .defaultAmount(DEFAULT_DEFAULT_AMOUNT);
        return mainReturn;
    }

    @Before
    public void initTest() {
        mainReturn = createEntity(em);
    }

    @Test
    @Transactional
    public void createMainReturn() throws Exception {
        int databaseSizeBeforeCreate = mainReturnRepository.findAll().size();

        // Create the MainReturn
        restMainReturnMockMvc.perform(post("/api/main-returns")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mainReturn)))
            .andExpect(status().isCreated());

        // Validate the MainReturn in the database
        List<MainReturn> mainReturnList = mainReturnRepository.findAll();
        assertThat(mainReturnList).hasSize(databaseSizeBeforeCreate + 1);
        MainReturn testMainReturn = mainReturnList.get(mainReturnList.size() - 1);
        assertThat(testMainReturn.getAmount()).isEqualTo(DEFAULT_AMOUNT);
        assertThat(testMainReturn.isExact()).isEqualTo(DEFAULT_EXACT);
        assertThat(testMainReturn.getDefaultAmount()).isEqualTo(DEFAULT_DEFAULT_AMOUNT);
    }

    @Test
    @Transactional
    public void createMainReturnWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = mainReturnRepository.findAll().size();

        // Create the MainReturn with an existing ID
        mainReturn.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMainReturnMockMvc.perform(post("/api/main-returns")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mainReturn)))
            .andExpect(status().isBadRequest());

        // Validate the MainReturn in the database
        List<MainReturn> mainReturnList = mainReturnRepository.findAll();
        assertThat(mainReturnList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkExactIsRequired() throws Exception {
        int databaseSizeBeforeTest = mainReturnRepository.findAll().size();
        // set the field null
        mainReturn.setExact(null);

        // Create the MainReturn, which fails.

        restMainReturnMockMvc.perform(post("/api/main-returns")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mainReturn)))
            .andExpect(status().isBadRequest());

        List<MainReturn> mainReturnList = mainReturnRepository.findAll();
        assertThat(mainReturnList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllMainReturns() throws Exception {
        // Initialize the database
        mainReturnRepository.saveAndFlush(mainReturn);

        // Get all the mainReturnList
        restMainReturnMockMvc.perform(get("/api/main-returns?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(mainReturn.getId().intValue())))
            .andExpect(jsonPath("$.[*].amount").value(hasItem(DEFAULT_AMOUNT)))
            .andExpect(jsonPath("$.[*].exact").value(hasItem(DEFAULT_EXACT.booleanValue())))
            .andExpect(jsonPath("$.[*].defaultAmount").value(hasItem(DEFAULT_DEFAULT_AMOUNT)));
    }

    @Test
    @Transactional
    public void getMainReturn() throws Exception {
        // Initialize the database
        mainReturnRepository.saveAndFlush(mainReturn);

        // Get the mainReturn
        restMainReturnMockMvc.perform(get("/api/main-returns/{id}", mainReturn.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(mainReturn.getId().intValue()))
            .andExpect(jsonPath("$.amount").value(DEFAULT_AMOUNT))
            .andExpect(jsonPath("$.exact").value(DEFAULT_EXACT.booleanValue()))
            .andExpect(jsonPath("$.defaultAmount").value(DEFAULT_DEFAULT_AMOUNT));
    }

    @Test
    @Transactional
    public void getNonExistingMainReturn() throws Exception {
        // Get the mainReturn
        restMainReturnMockMvc.perform(get("/api/main-returns/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMainReturn() throws Exception {
        // Initialize the database
        mainReturnRepository.saveAndFlush(mainReturn);
        int databaseSizeBeforeUpdate = mainReturnRepository.findAll().size();

        // Update the mainReturn
        MainReturn updatedMainReturn = mainReturnRepository.findOne(mainReturn.getId());
        // Disconnect from session so that the updates on updatedMainReturn are not directly saved in db
        em.detach(updatedMainReturn);
        updatedMainReturn
            .amount(UPDATED_AMOUNT)
            .exact(UPDATED_EXACT)
            .defaultAmount(UPDATED_DEFAULT_AMOUNT);

        restMainReturnMockMvc.perform(put("/api/main-returns")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMainReturn)))
            .andExpect(status().isOk());

        // Validate the MainReturn in the database
        List<MainReturn> mainReturnList = mainReturnRepository.findAll();
        assertThat(mainReturnList).hasSize(databaseSizeBeforeUpdate);
        MainReturn testMainReturn = mainReturnList.get(mainReturnList.size() - 1);
        assertThat(testMainReturn.getAmount()).isEqualTo(UPDATED_AMOUNT);
        assertThat(testMainReturn.isExact()).isEqualTo(UPDATED_EXACT);
        assertThat(testMainReturn.getDefaultAmount()).isEqualTo(UPDATED_DEFAULT_AMOUNT);
    }

    @Test
    @Transactional
    public void updateNonExistingMainReturn() throws Exception {
        int databaseSizeBeforeUpdate = mainReturnRepository.findAll().size();

        // Create the MainReturn

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restMainReturnMockMvc.perform(put("/api/main-returns")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mainReturn)))
            .andExpect(status().isCreated());

        // Validate the MainReturn in the database
        List<MainReturn> mainReturnList = mainReturnRepository.findAll();
        assertThat(mainReturnList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteMainReturn() throws Exception {
        // Initialize the database
        mainReturnRepository.saveAndFlush(mainReturn);
        int databaseSizeBeforeDelete = mainReturnRepository.findAll().size();

        // Get the mainReturn
        restMainReturnMockMvc.perform(delete("/api/main-returns/{id}", mainReturn.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<MainReturn> mainReturnList = mainReturnRepository.findAll();
        assertThat(mainReturnList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MainReturn.class);
        MainReturn mainReturn1 = new MainReturn();
        mainReturn1.setId(1L);
        MainReturn mainReturn2 = new MainReturn();
        mainReturn2.setId(mainReturn1.getId());
        assertThat(mainReturn1).isEqualTo(mainReturn2);
        mainReturn2.setId(2L);
        assertThat(mainReturn1).isNotEqualTo(mainReturn2);
        mainReturn1.setId(null);
        assertThat(mainReturn1).isNotEqualTo(mainReturn2);
    }
}
