package com.creatives.apsstr.cbcl.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A ReechargePlanType.
 */
@Entity
@Table(name = "reecharge_plan_type")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ReechargePlanType implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(max = 150)
    @Column(name = "name", length = 150, nullable = false)
    private String name;

    @NotNull
    @Column(name = "data_plan", nullable = false)
    private Boolean dataPlan;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public ReechargePlanType name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Boolean isDataPlan() {
        return dataPlan;
    }

    public ReechargePlanType dataPlan(Boolean dataPlan) {
        this.dataPlan = dataPlan;
        return this;
    }

    public void setDataPlan(Boolean dataPlan) {
        this.dataPlan = dataPlan;
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
        ReechargePlanType reechargePlanType = (ReechargePlanType) o;
        if (reechargePlanType.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), reechargePlanType.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ReechargePlanType{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", dataPlan='" + isDataPlan() + "'" +
            "}";
    }
}
