package com.creatives.apsstr.cbcl.web.rest;

import com.creatives.apsstr.cbcl.CbclApp;

import com.creatives.apsstr.cbcl.domain.ReturnInfo;
import com.creatives.apsstr.cbcl.repository.ReturnInfoRepository;
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
 * Test class for the ReturnInfoResource REST controller.
 *
 * @see ReturnInfoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CbclApp.class)
public class ReturnInfoResourceIntTest {

    @Autowired
    private ReturnInfoRepository returnInfoRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restReturnInfoMockMvc;

    private ReturnInfo returnInfo;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ReturnInfoResource returnInfoResource = new ReturnInfoResource(returnInfoRepository);
        this.restReturnInfoMockMvc = MockMvcBuilders.standaloneSetup(returnInfoResource)
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
    public static ReturnInfo createEntity(EntityManager em) {
        ReturnInfo returnInfo = new ReturnInfo();
        return returnInfo;
    }

    @Before
    public void initTest() {
        returnInfo = createEntity(em);
    }

    @Test
    @Transactional
    public void createReturnInfo() throws Exception {
        int databaseSizeBeforeCreate = returnInfoRepository.findAll().size();

        // Create the ReturnInfo
        restReturnInfoMockMvc.perform(post("/api/return-infos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(returnInfo)))
            .andExpect(status().isCreated());

        // Validate the ReturnInfo in the database
        List<ReturnInfo> returnInfoList = returnInfoRepository.findAll();
        assertThat(returnInfoList).hasSize(databaseSizeBeforeCreate + 1);
        ReturnInfo testReturnInfo = returnInfoList.get(returnInfoList.size() - 1);
    }

    @Test
    @Transactional
    public void createReturnInfoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = returnInfoRepository.findAll().size();

        // Create the ReturnInfo with an existing ID
        returnInfo.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restReturnInfoMockMvc.perform(post("/api/return-infos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(returnInfo)))
            .andExpect(status().isBadRequest());

        // Validate the ReturnInfo in the database
        List<ReturnInfo> returnInfoList = returnInfoRepository.findAll();
        assertThat(returnInfoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllReturnInfos() throws Exception {
        // Initialize the database
        returnInfoRepository.saveAndFlush(returnInfo);

        // Get all the returnInfoList
        restReturnInfoMockMvc.perform(get("/api/return-infos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(returnInfo.getId().intValue())));
    }

    @Test
    @Transactional
    public void getReturnInfo() throws Exception {
        // Initialize the database
        returnInfoRepository.saveAndFlush(returnInfo);

        // Get the returnInfo
        restReturnInfoMockMvc.perform(get("/api/return-infos/{id}", returnInfo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(returnInfo.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingReturnInfo() throws Exception {
        // Get the returnInfo
        restReturnInfoMockMvc.perform(get("/api/return-infos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateReturnInfo() throws Exception {
        // Initialize the database
        returnInfoRepository.saveAndFlush(returnInfo);
        int databaseSizeBeforeUpdate = returnInfoRepository.findAll().size();

        // Update the returnInfo
        ReturnInfo updatedReturnInfo = returnInfoRepository.findOne(returnInfo.getId());
        // Disconnect from session so that the updates on updatedReturnInfo are not directly saved in db
        em.detach(updatedReturnInfo);

        restReturnInfoMockMvc.perform(put("/api/return-infos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedReturnInfo)))
            .andExpect(status().isOk());

        // Validate the ReturnInfo in the database
        List<ReturnInfo> returnInfoList = returnInfoRepository.findAll();
        assertThat(returnInfoList).hasSize(databaseSizeBeforeUpdate);
        ReturnInfo testReturnInfo = returnInfoList.get(returnInfoList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingReturnInfo() throws Exception {
        int databaseSizeBeforeUpdate = returnInfoRepository.findAll().size();

        // Create the ReturnInfo

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restReturnInfoMockMvc.perform(put("/api/return-infos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(returnInfo)))
            .andExpect(status().isCreated());

        // Validate the ReturnInfo in the database
        List<ReturnInfo> returnInfoList = returnInfoRepository.findAll();
        assertThat(returnInfoList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteReturnInfo() throws Exception {
        // Initialize the database
        returnInfoRepository.saveAndFlush(returnInfo);
        int databaseSizeBeforeDelete = returnInfoRepository.findAll().size();

        // Get the returnInfo
        restReturnInfoMockMvc.perform(delete("/api/return-infos/{id}", returnInfo.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ReturnInfo> returnInfoList = returnInfoRepository.findAll();
        assertThat(returnInfoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ReturnInfo.class);
        ReturnInfo returnInfo1 = new ReturnInfo();
        returnInfo1.setId(1L);
        ReturnInfo returnInfo2 = new ReturnInfo();
        returnInfo2.setId(returnInfo1.getId());
        assertThat(returnInfo1).isEqualTo(returnInfo2);
        returnInfo2.setId(2L);
        assertThat(returnInfo1).isNotEqualTo(returnInfo2);
        returnInfo1.setId(null);
        assertThat(returnInfo1).isNotEqualTo(returnInfo2);
    }
}
