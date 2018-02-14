package com.creatives.apsstr.cbcl.web.rest;

import com.creatives.apsstr.cbcl.CbclApp;

import com.creatives.apsstr.cbcl.domain.Date;
import com.creatives.apsstr.cbcl.repository.DateRepository;
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
 * Test class for the DateResource REST controller.
 *
 * @see DateResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CbclApp.class)
public class DateResourceIntTest {

    private static final Integer DEFAULT_DATE = 1;
    private static final Integer UPDATED_DATE = 2;

    @Autowired
    private DateRepository dateRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restDateMockMvc;

    private Date date;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DateResource dateResource = new DateResource(dateRepository);
        this.restDateMockMvc = MockMvcBuilders.standaloneSetup(dateResource)
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
    public static Date createEntity(EntityManager em) {
        Date date = new Date()
            .date(DEFAULT_DATE);
        return date;
    }

    @Before
    public void initTest() {
        date = createEntity(em);
    }

    @Test
    @Transactional
    public void createDate() throws Exception {
        int databaseSizeBeforeCreate = dateRepository.findAll().size();

        // Create the Date
        restDateMockMvc.perform(post("/api/dates")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(date)))
            .andExpect(status().isCreated());

        // Validate the Date in the database
        List<Date> dateList = dateRepository.findAll();
        assertThat(dateList).hasSize(databaseSizeBeforeCreate + 1);
        Date testDate = dateList.get(dateList.size() - 1);
        assertThat(testDate.getDate()).isEqualTo(DEFAULT_DATE);
    }

    @Test
    @Transactional
    public void createDateWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = dateRepository.findAll().size();

        // Create the Date with an existing ID
        date.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDateMockMvc.perform(post("/api/dates")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(date)))
            .andExpect(status().isBadRequest());

        // Validate the Date in the database
        List<Date> dateList = dateRepository.findAll();
        assertThat(dateList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = dateRepository.findAll().size();
        // set the field null
        date.setDate(null);

        // Create the Date, which fails.

        restDateMockMvc.perform(post("/api/dates")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(date)))
            .andExpect(status().isBadRequest());

        List<Date> dateList = dateRepository.findAll();
        assertThat(dateList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllDates() throws Exception {
        // Initialize the database
        dateRepository.saveAndFlush(date);

        // Get all the dateList
        restDateMockMvc.perform(get("/api/dates?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(date.getId().intValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE)));
    }

    @Test
    @Transactional
    public void getDate() throws Exception {
        // Initialize the database
        dateRepository.saveAndFlush(date);

        // Get the date
        restDateMockMvc.perform(get("/api/dates/{id}", date.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(date.getId().intValue()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE));
    }

    @Test
    @Transactional
    public void getNonExistingDate() throws Exception {
        // Get the date
        restDateMockMvc.perform(get("/api/dates/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDate() throws Exception {
        // Initialize the database
        dateRepository.saveAndFlush(date);
        int databaseSizeBeforeUpdate = dateRepository.findAll().size();

        // Update the date
        Date updatedDate = dateRepository.findOne(date.getId());
        // Disconnect from session so that the updates on updatedDate are not directly saved in db
        em.detach(updatedDate);
        updatedDate
            .date(UPDATED_DATE);

        restDateMockMvc.perform(put("/api/dates")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDate)))
            .andExpect(status().isOk());

        // Validate the Date in the database
        List<Date> dateList = dateRepository.findAll();
        assertThat(dateList).hasSize(databaseSizeBeforeUpdate);
        Date testDate = dateList.get(dateList.size() - 1);
        assertThat(testDate.getDate()).isEqualTo(UPDATED_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingDate() throws Exception {
        int databaseSizeBeforeUpdate = dateRepository.findAll().size();

        // Create the Date

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restDateMockMvc.perform(put("/api/dates")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(date)))
            .andExpect(status().isCreated());

        // Validate the Date in the database
        List<Date> dateList = dateRepository.findAll();
        assertThat(dateList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteDate() throws Exception {
        // Initialize the database
        dateRepository.saveAndFlush(date);
        int databaseSizeBeforeDelete = dateRepository.findAll().size();

        // Get the date
        restDateMockMvc.perform(delete("/api/dates/{id}", date.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Date> dateList = dateRepository.findAll();
        assertThat(dateList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Date.class);
        Date date1 = new Date();
        date1.setId(1L);
        Date date2 = new Date();
        date2.setId(date1.getId());
        assertThat(date1).isEqualTo(date2);
        date2.setId(2L);
        assertThat(date1).isNotEqualTo(date2);
        date1.setId(null);
        assertThat(date1).isNotEqualTo(date2);
    }
}
