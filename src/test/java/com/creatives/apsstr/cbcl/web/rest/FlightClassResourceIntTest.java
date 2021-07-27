package com.creatives.apsstr.cbcl.web.rest;

import com.creatives.apsstr.cbcl.CbclApp;

import com.creatives.apsstr.cbcl.domain.FlightClass;
import com.creatives.apsstr.cbcl.repository.FlightClassRepository;
import com.creatives.apsstr.cbcl.service.FlightClassService;
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
 * Test class for the FlightClassResource REST controller.
 *
 * @see FlightClassResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CbclApp.class)
public class FlightClassResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private FlightClassRepository flightClassRepository;

    @Autowired
    private FlightClassService flightClassService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restFlightClassMockMvc;

    private FlightClass flightClass;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FlightClassResource flightClassResource = new FlightClassResource(flightClassService);
        this.restFlightClassMockMvc = MockMvcBuilders.standaloneSetup(flightClassResource)
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
    public static FlightClass createEntity(EntityManager em) {
        FlightClass flightClass = new FlightClass()
            .name(DEFAULT_NAME);
        return flightClass;
    }

    @Before
    public void initTest() {
        flightClass = createEntity(em);
    }

    @Test
    @Transactional
    public void createFlightClass() throws Exception {
        int databaseSizeBeforeCreate = flightClassRepository.findAll().size();

        // Create the FlightClass
        restFlightClassMockMvc.perform(post("/api/flight-classes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(flightClass)))
            .andExpect(status().isCreated());

        // Validate the FlightClass in the database
        List<FlightClass> flightClassList = flightClassRepository.findAll();
        assertThat(flightClassList).hasSize(databaseSizeBeforeCreate + 1);
        FlightClass testFlightClass = flightClassList.get(flightClassList.size() - 1);
        assertThat(testFlightClass.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createFlightClassWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = flightClassRepository.findAll().size();

        // Create the FlightClass with an existing ID
        flightClass.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFlightClassMockMvc.perform(post("/api/flight-classes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(flightClass)))
            .andExpect(status().isBadRequest());

        // Validate the FlightClass in the database
        List<FlightClass> flightClassList = flightClassRepository.findAll();
        assertThat(flightClassList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = flightClassRepository.findAll().size();
        // set the field null
        flightClass.setName(null);

        // Create the FlightClass, which fails.

        restFlightClassMockMvc.perform(post("/api/flight-classes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(flightClass)))
            .andExpect(status().isBadRequest());

        List<FlightClass> flightClassList = flightClassRepository.findAll();
        assertThat(flightClassList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllFlightClasses() throws Exception {
        // Initialize the database
        flightClassRepository.saveAndFlush(flightClass);

        // Get all the flightClassList
        restFlightClassMockMvc.perform(get("/api/flight-classes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(flightClass.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }

    @Test
    @Transactional
    public void getFlightClass() throws Exception {
        // Initialize the database
        flightClassRepository.saveAndFlush(flightClass);

        // Get the flightClass
        restFlightClassMockMvc.perform(get("/api/flight-classes/{id}", flightClass.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(flightClass.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingFlightClass() throws Exception {
        // Get the flightClass
        restFlightClassMockMvc.perform(get("/api/flight-classes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFlightClass() throws Exception {
        // Initialize the database
        flightClassService.save(flightClass);

        int databaseSizeBeforeUpdate = flightClassRepository.findAll().size();

        // Update the flightClass
        FlightClass updatedFlightClass = flightClassRepository.findOne(flightClass.getId());
        // Disconnect from session so that the updates on updatedFlightClass are not directly saved in db
        em.detach(updatedFlightClass);
        updatedFlightClass
            .name(UPDATED_NAME);

        restFlightClassMockMvc.perform(put("/api/flight-classes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedFlightClass)))
            .andExpect(status().isOk());

        // Validate the FlightClass in the database
        List<FlightClass> flightClassList = flightClassRepository.findAll();
        assertThat(flightClassList).hasSize(databaseSizeBeforeUpdate);
        FlightClass testFlightClass = flightClassList.get(flightClassList.size() - 1);
        assertThat(testFlightClass.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingFlightClass() throws Exception {
        int databaseSizeBeforeUpdate = flightClassRepository.findAll().size();

        // Create the FlightClass

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restFlightClassMockMvc.perform(put("/api/flight-classes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(flightClass)))
            .andExpect(status().isCreated());

        // Validate the FlightClass in the database
        List<FlightClass> flightClassList = flightClassRepository.findAll();
        assertThat(flightClassList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteFlightClass() throws Exception {
        // Initialize the database
        flightClassService.save(flightClass);

        int databaseSizeBeforeDelete = flightClassRepository.findAll().size();

        // Get the flightClass
        restFlightClassMockMvc.perform(delete("/api/flight-classes/{id}", flightClass.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<FlightClass> flightClassList = flightClassRepository.findAll();
        assertThat(flightClassList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(FlightClass.class);
        FlightClass flightClass1 = new FlightClass();
        flightClass1.setId(1L);
        FlightClass flightClass2 = new FlightClass();
        flightClass2.setId(flightClass1.getId());
        assertThat(flightClass1).isEqualTo(flightClass2);
        flightClass2.setId(2L);
        assertThat(flightClass1).isNotEqualTo(flightClass2);
        flightClass1.setId(null);
        assertThat(flightClass1).isNotEqualTo(flightClass2);
    }
}
