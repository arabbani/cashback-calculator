package com.creatives.apsstr.cbcl.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A ReturnExtras.
 */
@Entity
@Table(name = "return_extras")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ReturnExtras implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "minimum_expense")
    private Integer minimumExpense;

    @Column(name = "exact")
    private Boolean exact;

    @Column(name = "maximum_expense")
    private Integer maximumExpense;

    @Column(name = "minimum_return")
    private Integer minimumReturn;

    @Column(name = "maximum_return")
    private Integer maximumReturn;

    @Column(name = "minimum_ticket_required")
    private Integer minimumTicketRequired;

    @Column(name = "minimum_ride_required")
    private Integer minimumRideRequired;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getMinimumExpense() {
        return minimumExpense;
    }

    public ReturnExtras minimumExpense(Integer minimumExpense) {
        this.minimumExpense = minimumExpense;
        return this;
    }

    public void setMinimumExpense(Integer minimumExpense) {
        this.minimumExpense = minimumExpense;
    }

    public Boolean isExact() {
        return exact;
    }

    public ReturnExtras exact(Boolean exact) {
        this.exact = exact;
        return this;
    }

    public void setExact(Boolean exact) {
        this.exact = exact;
    }

    public Integer getMaximumExpense() {
        return maximumExpense;
    }

    public ReturnExtras maximumExpense(Integer maximumExpense) {
        this.maximumExpense = maximumExpense;
        return this;
    }

    public void setMaximumExpense(Integer maximumExpense) {
        this.maximumExpense = maximumExpense;
    }

    public Integer getMinimumReturn() {
        return minimumReturn;
    }

    public ReturnExtras minimumReturn(Integer minimumReturn) {
        this.minimumReturn = minimumReturn;
        return this;
    }

    public void setMinimumReturn(Integer minimumReturn) {
        this.minimumReturn = minimumReturn;
    }

    public Integer getMaximumReturn() {
        return maximumReturn;
    }

    public ReturnExtras maximumReturn(Integer maximumReturn) {
        this.maximumReturn = maximumReturn;
        return this;
    }

    public void setMaximumReturn(Integer maximumReturn) {
        this.maximumReturn = maximumReturn;
    }

    public Integer getMinimumTicketRequired() {
        return minimumTicketRequired;
    }

    public ReturnExtras minimumTicketRequired(Integer minimumTicketRequired) {
        this.minimumTicketRequired = minimumTicketRequired;
        return this;
    }

    public void setMinimumTicketRequired(Integer minimumTicketRequired) {
        this.minimumTicketRequired = minimumTicketRequired;
    }

    public Integer getMinimumRideRequired() {
        return minimumRideRequired;
    }

    public ReturnExtras minimumRideRequired(Integer minimumRideRequired) {
        this.minimumRideRequired = minimumRideRequired;
        return this;
    }

    public void setMinimumRideRequired(Integer minimumRideRequired) {
        this.minimumRideRequired = minimumRideRequired;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        ReturnExtras returnExtras = (ReturnExtras) o;
        if (returnExtras.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), returnExtras.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ReturnExtras{" +
            "id=" + getId() +
            ", minimumExpense=" + getMinimumExpense() +
            ", exact='" + isExact() + "'" +
            ", maximumExpense=" + getMaximumExpense() +
            ", minimumReturn=" + getMinimumReturn() +
            ", maximumReturn=" + getMaximumReturn() +
            ", minimumTicketRequired=" + getMinimumTicketRequired() +
            ", minimumRideRequired=" + getMinimumRideRequired() +
            "}";
    }
}
