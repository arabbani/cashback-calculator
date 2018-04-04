package com.creatives.apsstr.cbcl.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.creatives.apsstr.cbcl.domain.Circle;
import com.creatives.apsstr.cbcl.security.AuthoritiesConstants;
import com.creatives.apsstr.cbcl.service.CircleService;
import com.creatives.apsstr.cbcl.web.rest.errors.BadRequestAlertException;
import com.creatives.apsstr.cbcl.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Circle.
 */
@RestController
@RequestMapping("/api")
public class CircleResource {

    private final Logger log = LoggerFactory.getLogger(CircleResource.class);

    private static final String ENTITY_NAME = "circle";

    private final CircleService circleService;

    public CircleResource(CircleService circleService) {
        this.circleService = circleService;
    }

    /**
     * POST  /circles : Create a new circle.
     *
     * @param circle the circle to create
     * @return the ResponseEntity with status 201 (Created) and with body the new circle, or with status 400 (Bad Request) if the circle has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/circles")
    @Timed
    @Secured(AuthoritiesConstants.ADMIN)
    public ResponseEntity<Circle> createCircle(@Valid @RequestBody Circle circle) throws URISyntaxException {
        log.debug("REST request to save Circle : {}", circle);
        if (circle.getId() != null) {
            throw new BadRequestAlertException("A new circle cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Circle result = circleService.save(circle);
        return ResponseEntity.created(new URI("/api/circles/" + result.getId()))
                .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString())).body(result);
    }

    /**
     * PUT  /circles : Updates an existing circle.
     *
     * @param circle the circle to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated circle,
     * or with status 400 (Bad Request) if the circle is not valid,
     * or with status 500 (Internal Server Error) if the circle couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/circles")
    @Timed
    @Secured(AuthoritiesConstants.ADMIN)
    public ResponseEntity<Circle> updateCircle(@Valid @RequestBody Circle circle) throws URISyntaxException {
        log.debug("REST request to update Circle : {}", circle);
        if (circle.getId() == null) {
            return createCircle(circle);
        }
        Circle result = circleService.save(circle);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, circle.getId().toString()))
                .body(result);
    }

    /**
     * GET  /circles : get all the circles.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of circles in body
     */
    @GetMapping("/circles")
    @Timed
    public List<Circle> getAllCircles() {
        log.debug("REST request to get all Circles");
        return circleService.findAll();
    }

    /**
     * GET  /circles/:id : get the "id" circle.
     *
     * @param id the id of the circle to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the circle, or with status 404 (Not Found)
     */
    @GetMapping("/circles/{id}")
    @Timed
    @Secured(AuthoritiesConstants.ADMIN)
    public ResponseEntity<Circle> getCircle(@PathVariable Long id) {
        log.debug("REST request to get Circle : {}", id);
        Circle circle = circleService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(circle));
    }

    /**
     * DELETE  /circles/:id : delete the "id" circle.
     *
     * @param id the id of the circle to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/circles/{id}")
    @Timed
    @Secured(AuthoritiesConstants.ADMIN)
    public ResponseEntity<Void> deleteCircle(@PathVariable Long id) {
        log.debug("REST request to delete Circle : {}", id);
        circleService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
