package com.creatives.apsstr.cbcl.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.creatives.apsstr.cbcl.domain.Newsletter;
import com.creatives.apsstr.cbcl.service.NewsletterService;
import com.creatives.apsstr.cbcl.web.rest.errors.BadRequestAlertException;
import com.creatives.apsstr.cbcl.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Newsletter.
 */
@RestController
@RequestMapping("/api")
public class NewsletterResource {

    private final Logger log = LoggerFactory.getLogger(NewsletterResource.class);

    private static final String ENTITY_NAME = "newsletter";

    private final NewsletterService newsletterService;

    public NewsletterResource(NewsletterService newsletterService) {
        this.newsletterService = newsletterService;
    }

    /**
     * POST  /newsletters : Create a new newsletter.
     *
     * @param newsletter the newsletter to create
     * @return the ResponseEntity with status 201 (Created) and with body the new newsletter, or with status 400 (Bad Request) if the newsletter has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/newsletters")
    @Timed
    public ResponseEntity<Newsletter> createNewsletter(@Valid @RequestBody Newsletter newsletter) throws URISyntaxException {
        log.debug("REST request to save Newsletter : {}", newsletter);
        if (newsletter.getId() != null) {
            throw new BadRequestAlertException("A new newsletter cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Newsletter result = newsletterService.save(newsletter);
        return ResponseEntity.created(new URI("/api/newsletters/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /newsletters : Updates an existing newsletter.
     *
     * @param newsletter the newsletter to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated newsletter,
     * or with status 400 (Bad Request) if the newsletter is not valid,
     * or with status 500 (Internal Server Error) if the newsletter couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/newsletters")
    @Timed
    public ResponseEntity<Newsletter> updateNewsletter(@Valid @RequestBody Newsletter newsletter) throws URISyntaxException {
        log.debug("REST request to update Newsletter : {}", newsletter);
        if (newsletter.getId() == null) {
            return createNewsletter(newsletter);
        }
        Newsletter result = newsletterService.save(newsletter);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, newsletter.getId().toString()))
            .body(result);
    }

    /**
     * GET  /newsletters : get all the newsletters.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of newsletters in body
     */
    @GetMapping("/newsletters")
    @Timed
    public List<Newsletter> getAllNewsletters() {
        log.debug("REST request to get all Newsletters");
        return newsletterService.findAll();
        }

    /**
     * GET  /newsletters/:id : get the "id" newsletter.
     *
     * @param id the id of the newsletter to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the newsletter, or with status 404 (Not Found)
     */
    @GetMapping("/newsletters/{id}")
    @Timed
    public ResponseEntity<Newsletter> getNewsletter(@PathVariable Long id) {
        log.debug("REST request to get Newsletter : {}", id);
        Newsletter newsletter = newsletterService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(newsletter));
    }

    /**
     * DELETE  /newsletters/:id : delete the "id" newsletter.
     *
     * @param id the id of the newsletter to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/newsletters/{id}")
    @Timed
    public ResponseEntity<Void> deleteNewsletter(@PathVariable Long id) {
        log.debug("REST request to delete Newsletter : {}", id);
        newsletterService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
