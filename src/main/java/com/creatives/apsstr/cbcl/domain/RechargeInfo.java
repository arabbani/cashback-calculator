package com.creatives.apsstr.cbcl.domain;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A RechargeInfo.
 */
@Entity
@Table(name = "recharge_info")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class RechargeInfo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "recharge_info_circle", joinColumns = @JoinColumn(name = "recharge_infos_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "circles_id", referencedColumnName = "id"))
    private Set<Circle> circles = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "recharge_info_recharge_plan_type", joinColumns = @JoinColumn(name = "recharge_infos_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "recharge_plan_types_id", referencedColumnName = "id"))
    private Set<RechargePlanType> rechargePlanTypes = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Set<Circle> getCircles() {
        return circles;
    }

    public RechargeInfo circles(Set<Circle> circles) {
        this.circles = circles;
        return this;
    }

    public RechargeInfo addCircle(Circle circle) {
        this.circles.add(circle);
        return this;
    }

    public RechargeInfo removeCircle(Circle circle) {
        this.circles.remove(circle);
        return this;
    }

    public void setCircles(Set<Circle> circles) {
        this.circles = circles;
    }

    public Set<RechargePlanType> getRechargePlanTypes() {
        return rechargePlanTypes;
    }

    public RechargeInfo rechargePlanTypes(Set<RechargePlanType> rechargePlanTypes) {
        this.rechargePlanTypes = rechargePlanTypes;
        return this;
    }

    public RechargeInfo addRechargePlanType(RechargePlanType rechargePlanType) {
        this.rechargePlanTypes.add(rechargePlanType);
        return this;
    }

    public RechargeInfo removeRechargePlanType(RechargePlanType rechargePlanType) {
        this.rechargePlanTypes.remove(rechargePlanType);
        return this;
    }

    public void setRechargePlanTypes(Set<RechargePlanType> rechargePlanTypes) {
        this.rechargePlanTypes = rechargePlanTypes;
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
        RechargeInfo rechargeInfo = (RechargeInfo) o;
        if (rechargeInfo.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), rechargeInfo.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "RechargeInfo{" + "id=" + getId() + "}";
    }
}
