package com.creatives.apsstr.cbcl.web.rest;

import com.creatives.apsstr.cbcl.CbclApp;

import com.creatives.apsstr.cbcl.domain.ReturnMode;
import com.creatives.apsstr.cbcl.repository.ReturnModeRepository;
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
 * Test class for the ReturnModeResource REST controller.
 *
 * @see ReturnModeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CbclApp.class)
public class ReturnModeResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private ReturnModeRepository returnModeRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restReturnModeMockMvc;

    private ReturnMode returnMode;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ReturnModeResource returnModeResource = new ReturnModeResource(returnModeRepository);
        this.restReturnModeMockMvc = MockMvcBuilders.standaloneSetup(returnModeResource)
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
    public static ReturnMode createEntity(EntityManager em) {
        ReturnMode returnMode = new ReturnMode()
            .name(DEFAULT_NAME);
        return returnMode;
    }

    @Before
    public void initTest() {
        returnMode = createEntity(em);
    }

    @Test
    @Transactional
    public void createReturnMode() throws Exception {
        int databaseSizeBeforeCreate = returnModeRepository.findAll().size();

        // Create the ReturnMode
        restReturnModeMockMvc.perform(post("/api/return-modes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(returnMode)))
            .andExpect(status().isCreated());

        // Validate the ReturnMode in the database
        List<ReturnMode> returnModeList = returnModeRepository.findAll();
        assertThat(returnModeList).hasSize(databaseSizeBeforeCreate + 1);
        ReturnMode testReturnMode = returnModeList.get(returnModeList.size() - 1);
        assertThat(testReturnMode.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createReturnModeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = returnModeRepository.findAll().size();

        // Create the ReturnMode with an existing ID
        returnMode.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restReturnModeMockMvc.perform(post("/api/return-modes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(returnMode)))
            .andExpect(status().isBadRequest());

        // Validate the ReturnMode in the database
        List<ReturnMode> returnModeList = returnModeRepository.findAll();
        assertThat(returnModeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = returnModeRepository.findAll().size();
        // set the field null
        returnMode.setName(null);

        // Create the ReturnMode, which fails.

        restReturnModeMockMvc.perform(post("/api/return-modes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(returnMode)))
            .andExpect(status().isBadRequest());

        List<ReturnMode> returnModeList = returnModeRepository.findAll();
        assertThat(returnModeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllReturnModes() throws Exception {
        // Initialize the database
        returnModeRepository.saveAndFlush(returnMode);

        // Get all the returnModeList
        restReturnModeMockMvc.perform(get("/api/return-modes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(returnMode.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }

    @Test
    @Transactional
    public void getReturnMode() throws Exception {
        // Initialize the database
        returnModeRepository.saveAndFlush(returnMode);

        // Get the returnMode
        restReturnModeMockMvc.perform(get("/api/return-modes/{id}", returnMode.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(returnMode.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingReturnMode() throws Exception {
        // Get the returnMode
        restReturnModeMockMvc.perform(get("/api/return-modes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateReturnMode() throws Exception {
        // Initialize the database
        returnModeRepository.saveAndFlush(returnMode);
        int databaseSizeBeforeUpdate = returnModeRepository.findAll().size();

        // Update the returnMode
        ReturnMode updatedReturnMode = returnModeRepository.findOne(returnMode.getId());
        // Disconnect from session so that the updates on updatedReturnMode are not directly saved in db
        em.detach(updatedReturnMode);
        updatedReturnMode
            .name(UPDATED_NAME);

        restReturnModeMockMvc.perform(put("/api/return-modes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedReturnMode)))
            .andExpect(status().isOk());

        // Validate the ReturnMode in the database
        List<ReturnMode> returnModeList = returnModeRepository.findAll();
        assertThat(returnModeList).hasSize(databaseSizeBeforeUpdate);
        ReturnMode testReturnMode = returnModeList.get(returnModeList.size() - 1);
        assertThat(testReturnMode.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingReturnMode() throws Exception {
        int databaseSizeBeforeUpdate = returnModeRepository.findAll().size();

        // Create the ReturnMode

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restReturnModeMockMvc.perform(put("/api/return-modes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(returnMode)))
            .andExpect(status().isCreated());

        // Validate the ReturnMode in the database
        List<ReturnMode> returnModeList = returnModeRepository.findAll();
        assertThat(returnModeList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteReturnMode() throws Exception {
        // Initialize the database
        returnModeRepository.saveAndFlush(returnMode);
        int databaseSizeBeforeDelete = returnModeRepository.findAll().size();

        // Get the returnMode
        restReturnModeMockMvc.perform(delete("/api/return-modes/{id}", returnMode.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ReturnMode> returnModeList = returnModeRepository.findAll();
        assertThat(returnModeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ReturnMode.class);
        ReturnMode returnMode1 = new ReturnMode();
        returnMode1.setId(1L);
        ReturnMode returnMode2 = new ReturnMode();
        returnMode2.setId(returnMode1.getId());
        assertThat(returnMode1).isEqualTo(returnMode2);
        returnMode2.setId(2L);
        assertThat(returnMode1).isNotEqualTo(returnMode2);
        returnMode1.setId(null);
        assertThat(returnMode1).isNotEqualTo(returnMode2);
    }
}
