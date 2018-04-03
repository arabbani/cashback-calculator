package com.creatives.apsstr.cbcl.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.voodoodyne.jackson.jsog.JSOGGenerator;

import java.io.Serializable;
import java.util.Objects;

/**
 * A RechargePlanType.
 */
@Entity
@Table(name = "recharge_plan_type")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@JsonIdentityInfo(generator = JSOGGenerator.class)
public class RechargePlanType implements Serializable {

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

    public RechargePlanType name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Boolean isDataPlan() {
        return dataPlan;
    }

    public RechargePlanType dataPlan(Boolean dataPlan) {
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
        RechargePlanType rechargePlanType = (RechargePlanType) o;
        if (rechargePlanType.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), rechargePlanType.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "RechargePlanType{" + "id=" + getId() + ", name='" + getName() + "'" + ", dataPlan='" + isDataPlan()
                + "'" + "}";
    }
}
