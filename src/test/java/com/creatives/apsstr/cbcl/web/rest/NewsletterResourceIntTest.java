package com.creatives.apsstr.cbcl.web.rest;

import com.creatives.apsstr.cbcl.CbclApp;

import com.creatives.apsstr.cbcl.domain.Newsletter;
import com.creatives.apsstr.cbcl.repository.NewsletterRepository;
import com.creatives.apsstr.cbcl.service.NewsletterService;
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
 * Test class for the NewsletterResource REST controller.
 *
 * @see NewsletterResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CbclApp.class)
public class NewsletterResourceIntTest {

    private static final String DEFAULT_EMAIL_ID = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL_ID = "BBBBBBBBBB";

    private static final Long DEFAULT_PHONE_NUMBER = 1L;
    private static final Long UPDATED_PHONE_NUMBER = 2L;

    private static final Integer DEFAULT_MAIL_PER_WEEK = 1;
    private static final Integer UPDATED_MAIL_PER_WEEK = 2;

    private static final Integer DEFAULT_NUMBER_OF_MAILS_SENT = 1;
    private static final Integer UPDATED_NUMBER_OF_MAILS_SENT = 2;

    private static final Boolean DEFAULT_ACTIVE = false;
    private static final Boolean UPDATED_ACTIVE = true;

    @Autowired
    private NewsletterRepository newsletterRepository;

    @Autowired
    private NewsletterService newsletterService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restNewsletterMockMvc;

    private Newsletter newsletter;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final NewsletterResource newsletterResource = new NewsletterResource(newsletterService);
        this.restNewsletterMockMvc = MockMvcBuilders.standaloneSetup(newsletterResource)
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
    public static Newsletter createEntity(EntityManager em) {
        Newsletter newsletter = new Newsletter()
            .emailId(DEFAULT_EMAIL_ID)
            .phoneNumber(DEFAULT_PHONE_NUMBER)
            .mailPerWeek(DEFAULT_MAIL_PER_WEEK)
            .numberOfMailsSent(DEFAULT_NUMBER_OF_MAILS_SENT)
            .active(DEFAULT_ACTIVE);
        return newsletter;
    }

    @Before
    public void initTest() {
        newsletter = createEntity(em);
    }

    @Test
    @Transactional
    public void createNewsletter() throws Exception {
        int databaseSizeBeforeCreate = newsletterRepository.findAll().size();

        // Create the Newsletter
        restNewsletterMockMvc.perform(post("/api/newsletters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(newsletter)))
            .andExpect(status().isCreated());

        // Validate the Newsletter in the database
        List<Newsletter> newsletterList = newsletterRepository.findAll();
        assertThat(newsletterList).hasSize(databaseSizeBeforeCreate + 1);
        Newsletter testNewsletter = newsletterList.get(newsletterList.size() - 1);
        assertThat(testNewsletter.getEmailId()).isEqualTo(DEFAULT_EMAIL_ID);
        assertThat(testNewsletter.getPhoneNumber()).isEqualTo(DEFAULT_PHONE_NUMBER);
        assertThat(testNewsletter.getMailPerWeek()).isEqualTo(DEFAULT_MAIL_PER_WEEK);
        assertThat(testNewsletter.getNumberOfMailsSent()).isEqualTo(DEFAULT_NUMBER_OF_MAILS_SENT);
        assertThat(testNewsletter.isActive()).isEqualTo(DEFAULT_ACTIVE);
    }

    @Test
    @Transactional
    public void createNewsletterWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = newsletterRepository.findAll().size();

        // Create the Newsletter with an existing ID
        newsletter.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restNewsletterMockMvc.perform(post("/api/newsletters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(newsletter)))
            .andExpect(status().isBadRequest());

        // Validate the Newsletter in the database
        List<Newsletter> newsletterList = newsletterRepository.findAll();
        assertThat(newsletterList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkActiveIsRequired() throws Exception {
        int databaseSizeBeforeTest = newsletterRepository.findAll().size();
        // set the field null
        newsletter.setActive(null);

        // Create the Newsletter, which fails.

        restNewsletterMockMvc.perform(post("/api/newsletters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(newsletter)))
            .andExpect(status().isBadRequest());

        List<Newsletter> newsletterList = newsletterRepository.findAll();
        assertThat(newsletterList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllNewsletters() throws Exception {
        // Initialize the database
        newsletterRepository.saveAndFlush(newsletter);

        // Get all the newsletterList
        restNewsletterMockMvc.perform(get("/api/newsletters?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(newsletter.getId().intValue())))
            .andExpect(jsonPath("$.[*].emailId").value(hasItem(DEFAULT_EMAIL_ID.toString())))
            .andExpect(jsonPath("$.[*].phoneNumber").value(hasItem(DEFAULT_PHONE_NUMBER.intValue())))
            .andExpect(jsonPath("$.[*].mailPerWeek").value(hasItem(DEFAULT_MAIL_PER_WEEK)))
            .andExpect(jsonPath("$.[*].numberOfMailsSent").value(hasItem(DEFAULT_NUMBER_OF_MAILS_SENT)))
            .andExpect(jsonPath("$.[*].active").value(hasItem(DEFAULT_ACTIVE.booleanValue())));
    }

    @Test
    @Transactional
    public void getNewsletter() throws Exception {
        // Initialize the database
        newsletterRepository.saveAndFlush(newsletter);

        // Get the newsletter
        restNewsletterMockMvc.perform(get("/api/newsletters/{id}", newsletter.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(newsletter.getId().intValue()))
            .andExpect(jsonPath("$.emailId").value(DEFAULT_EMAIL_ID.toString()))
            .andExpect(jsonPath("$.phoneNumber").value(DEFAULT_PHONE_NUMBER.intValue()))
            .andExpect(jsonPath("$.mailPerWeek").value(DEFAULT_MAIL_PER_WEEK))
            .andExpect(jsonPath("$.numberOfMailsSent").value(DEFAULT_NUMBER_OF_MAILS_SENT))
            .andExpect(jsonPath("$.active").value(DEFAULT_ACTIVE.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingNewsletter() throws Exception {
        // Get the newsletter
        restNewsletterMockMvc.perform(get("/api/newsletters/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateNewsletter() throws Exception {
        // Initialize the database
        newsletterService.save(newsletter);

        int databaseSizeBeforeUpdate = newsletterRepository.findAll().size();

        // Update the newsletter
        Newsletter updatedNewsletter = newsletterRepository.findOne(newsletter.getId());
        // Disconnect from session so that the updates on updatedNewsletter are not directly saved in db
        em.detach(updatedNewsletter);
        updatedNewsletter
            .emailId(UPDATED_EMAIL_ID)
            .phoneNumber(UPDATED_PHONE_NUMBER)
            .mailPerWeek(UPDATED_MAIL_PER_WEEK)
            .numberOfMailsSent(UPDATED_NUMBER_OF_MAILS_SENT)
            .active(UPDATED_ACTIVE);

        restNewsletterMockMvc.perform(put("/api/newsletters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedNewsletter)))
            .andExpect(status().isOk());

        // Validate the Newsletter in the database
        List<Newsletter> newsletterList = newsletterRepository.findAll();
        assertThat(newsletterList).hasSize(databaseSizeBeforeUpdate);
        Newsletter testNewsletter = newsletterList.get(newsletterList.size() - 1);
        assertThat(testNewsletter.getEmailId()).isEqualTo(UPDATED_EMAIL_ID);
        assertThat(testNewsletter.getPhoneNumber()).isEqualTo(UPDATED_PHONE_NUMBER);
        assertThat(testNewsletter.getMailPerWeek()).isEqualTo(UPDATED_MAIL_PER_WEEK);
        assertThat(testNewsletter.getNumberOfMailsSent()).isEqualTo(UPDATED_NUMBER_OF_MAILS_SENT);
        assertThat(testNewsletter.isActive()).isEqualTo(UPDATED_ACTIVE);
    }

    @Test
    @Transactional
    public void updateNonExistingNewsletter() throws Exception {
        int databaseSizeBeforeUpdate = newsletterRepository.findAll().size();

        // Create the Newsletter

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restNewsletterMockMvc.perform(put("/api/newsletters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(newsletter)))
            .andExpect(status().isCreated());

        // Validate the Newsletter in the database
        List<Newsletter> newsletterList = newsletterRepository.findAll();
        assertThat(newsletterList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteNewsletter() throws Exception {
        // Initialize the database
        newsletterService.save(newsletter);

        int databaseSizeBeforeDelete = newsletterRepository.findAll().size();

        // Get the newsletter
        restNewsletterMockMvc.perform(delete("/api/newsletters/{id}", newsletter.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Newsletter> newsletterList = newsletterRepository.findAll();
        assertThat(newsletterList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Newsletter.class);
        Newsletter newsletter1 = new Newsletter();
        newsletter1.setId(1L);
        Newsletter newsletter2 = new Newsletter();
        newsletter2.setId(newsletter1.getId());
        assertThat(newsletter1).isEqualTo(newsletter2);
        newsletter2.setId(2L);
        assertThat(newsletter1).isNotEqualTo(newsletter2);
        newsletter1.setId(null);
        assertThat(newsletter1).isNotEqualTo(newsletter2);
    }
}
