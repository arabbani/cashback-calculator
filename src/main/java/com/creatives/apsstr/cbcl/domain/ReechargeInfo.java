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
 * A ReechargeInfo.
 */
@Entity
@Table(name = "reecharge_info")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ReechargeInfo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "reecharge_info_circle", joinColumns = @JoinColumn(name = "reecharge_infos_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "circles_id", referencedColumnName = "id"))
    private Set<Circle> circles = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "reecharge_info_reecharge_plan_type", joinColumns = @JoinColumn(name = "reecharge_infos_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "reecharge_plan_types_id", referencedColumnName = "id"))
    private Set<ReechargePlanType> reechargePlanTypes = new HashSet<>();

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

    public ReechargeInfo circles(Set<Circle> circles) {
        this.circles = circles;
        return this;
    }

    public ReechargeInfo addCircle(Circle circle) {
        this.circles.add(circle);
        return this;
    }

    public ReechargeInfo removeCircle(Circle circle) {
        this.circles.remove(circle);
        return this;
    }

    public void setCircles(Set<Circle> circles) {
        this.circles = circles;
    }

    public Set<ReechargePlanType> getReechargePlanTypes() {
        return reechargePlanTypes;
    }

    public ReechargeInfo reechargePlanTypes(Set<ReechargePlanType> reechargePlanTypes) {
        this.reechargePlanTypes = reechargePlanTypes;
        return this;
    }

    public ReechargeInfo addReechargePlanType(ReechargePlanType reechargePlanType) {
        this.reechargePlanTypes.add(reechargePlanType);
        return this;
    }

    public ReechargeInfo removeReechargePlanType(ReechargePlanType reechargePlanType) {
        this.reechargePlanTypes.remove(reechargePlanType);
        return this;
    }

    public void setReechargePlanTypes(Set<ReechargePlanType> reechargePlanTypes) {
        this.reechargePlanTypes = reechargePlanTypes;
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
        ReechargeInfo reechargeInfo = (ReechargeInfo) o;
        if (reechargeInfo.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), reechargeInfo.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ReechargeInfo{" + "id=" + getId() + "}";
    }
}
