package com.creatives.apsstr.cbcl.web.rest;

import com.creatives.apsstr.cbcl.CbclApp;

import com.creatives.apsstr.cbcl.domain.BankType;
import com.creatives.apsstr.cbcl.repository.BankTypeRepository;
import com.creatives.apsstr.cbcl.service.BankTypeService;
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
 * Test class for the BankTypeResource REST controller.
 *
 * @see BankTypeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CbclApp.class)
public class BankTypeResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private BankTypeRepository bankTypeRepository;

    @Autowired
    private BankTypeService bankTypeService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restBankTypeMockMvc;

    private BankType bankType;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final BankTypeResource bankTypeResource = new BankTypeResource(bankTypeService);
        this.restBankTypeMockMvc = MockMvcBuilders.standaloneSetup(bankTypeResource)
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
    public static BankType createEntity(EntityManager em) {
        BankType bankType = new BankType()
            .name(DEFAULT_NAME);
        return bankType;
    }

    @Before
    public void initTest() {
        bankType = createEntity(em);
    }

    @Test
    @Transactional
    public void createBankType() throws Exception {
        int databaseSizeBeforeCreate = bankTypeRepository.findAll().size();

        // Create the BankType
        restBankTypeMockMvc.perform(post("/api/bank-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bankType)))
            .andExpect(status().isCreated());

        // Validate the BankType in the database
        List<BankType> bankTypeList = bankTypeRepository.findAll();
        assertThat(bankTypeList).hasSize(databaseSizeBeforeCreate + 1);
        BankType testBankType = bankTypeList.get(bankTypeList.size() - 1);
        assertThat(testBankType.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createBankTypeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = bankTypeRepository.findAll().size();

        // Create the BankType with an existing ID
        bankType.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBankTypeMockMvc.perform(post("/api/bank-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bankType)))
            .andExpect(status().isBadRequest());

        // Validate the BankType in the database
        List<BankType> bankTypeList = bankTypeRepository.findAll();
        assertThat(bankTypeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = bankTypeRepository.findAll().size();
        // set the field null
        bankType.setName(null);

        // Create the BankType, which fails.

        restBankTypeMockMvc.perform(post("/api/bank-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bankType)))
            .andExpect(status().isBadRequest());

        List<BankType> bankTypeList = bankTypeRepository.findAll();
        assertThat(bankTypeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllBankTypes() throws Exception {
        // Initialize the database
        bankTypeRepository.saveAndFlush(bankType);

        // Get all the bankTypeList
        restBankTypeMockMvc.perform(get("/api/bank-types?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(bankType.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }

    @Test
    @Transactional
    public void getBankType() throws Exception {
        // Initialize the database
        bankTypeRepository.saveAndFlush(bankType);

        // Get the bankType
        restBankTypeMockMvc.perform(get("/api/bank-types/{id}", bankType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(bankType.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingBankType() throws Exception {
        // Get the bankType
        restBankTypeMockMvc.perform(get("/api/bank-types/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBankType() throws Exception {
        // Initialize the database
        bankTypeService.save(bankType);

        int databaseSizeBeforeUpdate = bankTypeRepository.findAll().size();

        // Update the bankType
        BankType updatedBankType = bankTypeRepository.findOne(bankType.getId());
        // Disconnect from session so that the updates on updatedBankType are not directly saved in db
        em.detach(updatedBankType);
        updatedBankType
            .name(UPDATED_NAME);

        restBankTypeMockMvc.perform(put("/api/bank-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedBankType)))
            .andExpect(status().isOk());

        // Validate the BankType in the database
        List<BankType> bankTypeList = bankTypeRepository.findAll();
        assertThat(bankTypeList).hasSize(databaseSizeBeforeUpdate);
        BankType testBankType = bankTypeList.get(bankTypeList.size() - 1);
        assertThat(testBankType.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingBankType() throws Exception {
        int databaseSizeBeforeUpdate = bankTypeRepository.findAll().size();

        // Create the BankType

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restBankTypeMockMvc.perform(put("/api/bank-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bankType)))
            .andExpect(status().isCreated());

        // Validate the BankType in the database
        List<BankType> bankTypeList = bankTypeRepository.findAll();
        assertThat(bankTypeList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteBankType() throws Exception {
        // Initialize the database
        bankTypeService.save(bankType);

        int databaseSizeBeforeDelete = bankTypeRepository.findAll().size();

        // Get the bankType
        restBankTypeMockMvc.perform(delete("/api/bank-types/{id}", bankType.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<BankType> bankTypeList = bankTypeRepository.findAll();
        assertThat(bankTypeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(BankType.class);
        BankType bankType1 = new BankType();
        bankType1.setId(1L);
        BankType bankType2 = new BankType();
        bankType2.setId(bankType1.getId());
        assertThat(bankType1).isEqualTo(bankType2);
        bankType2.setId(2L);
        assertThat(bankType1).isNotEqualTo(bankType2);
        bankType1.setId(null);
        assertThat(bankType1).isNotEqualTo(bankType2);
    }
}
