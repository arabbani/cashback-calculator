package com.creatives.apsstr.cbcl.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.creatives.apsstr.cbcl.domain.Date;
import com.creatives.apsstr.cbcl.service.DateService;
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
 * REST controller for managing Date.
 */
@RestController
@RequestMapping("/api")
public class DateResource {

    private final Logger log = LoggerFactory.getLogger(DateResource.class);

    private static final String ENTITY_NAME = "date";

    private final DateService dateService;

    public DateResource(DateService dateService) {
        this.dateService = dateService;
    }

    /**
     * POST  /dates : Create a new date.
     *
     * @param date the date to create
     * @return the ResponseEntity with status 201 (Created) and with body the new date, or with status 400 (Bad Request) if the date has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/dates")
    @Timed
    public ResponseEntity<Date> createDate(@Valid @RequestBody Date date) throws URISyntaxException {
        log.debug("REST request to save Date : {}", date);
        if (date.getId() != null) {
            throw new BadRequestAlertException("A new date cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Date result = dateService.save(date);
        return ResponseEntity.created(new URI("/api/dates/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /dates : Updates an existing date.
     *
     * @param date the date to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated date,
     * or with status 400 (Bad Request) if the date is not valid,
     * or with status 500 (Internal Server Error) if the date couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/dates")
    @Timed
    public ResponseEntity<Date> updateDate(@Valid @RequestBody Date date) throws URISyntaxException {
        log.debug("REST request to update Date : {}", date);
        if (date.getId() == null) {
            return createDate(date);
        }
        Date result = dateService.save(date);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, date.getId().toString()))
            .body(result);
    }

    /**
     * GET  /dates : get all the dates.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of dates in body
     */
    @GetMapping("/dates")
    @Timed
    public List<Date> getAllDates() {
        log.debug("REST request to get all Dates");
        return dateService.findAll();
        }

    /**
     * GET  /dates/:id : get the "id" date.
     *
     * @param id the id of the date to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the date, or with status 404 (Not Found)
     */
    @GetMapping("/dates/{id}")
    @Timed
    public ResponseEntity<Date> getDate(@PathVariable Long id) {
        log.debug("REST request to get Date : {}", id);
        Date date = dateService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(date));
    }

    /**
     * DELETE  /dates/:id : delete the "id" date.
     *
     * @param id the id of the date to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/dates/{id}")
    @Timed
    public ResponseEntity<Void> deleteDate(@PathVariable Long id) {
        log.debug("REST request to delete Date : {}", id);
        dateService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
