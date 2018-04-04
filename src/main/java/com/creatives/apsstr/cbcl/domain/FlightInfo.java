package com.creatives.apsstr.cbcl.domain;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.FetchType;
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
 * A FlightInfo.
 */
@Entity
@Table(name = "flight_info")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class FlightInfo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToMany(fetch = FetchType.EAGER)
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "flight_info_type", joinColumns = @JoinColumn(name = "flight_infos_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "types_id", referencedColumnName = "id"))
    private Set<Region> types = new HashSet<>();

    @ManyToMany(fetch = FetchType.EAGER)
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "flight_info_origin", joinColumns = @JoinColumn(name = "flight_infos_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "origins_id", referencedColumnName = "id"))
    private Set<Region> origins = new HashSet<>();

    @ManyToMany(fetch = FetchType.EAGER)
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "flight_info_travel_class", joinColumns = @JoinColumn(name = "flight_infos_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "travel_classes_id", referencedColumnName = "id"))
    private Set<FlightClass> travelClasses = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Set<Region> getTypes() {
        return types;
    }

    public FlightInfo types(Set<Region> regions) {
        this.types = regions;
        return this;
    }

    public FlightInfo addType(Region region) {
        this.types.add(region);
        return this;
    }

    public FlightInfo removeType(Region region) {
        this.types.remove(region);
        return this;
    }

    public void setTypes(Set<Region> regions) {
        this.types = regions;
    }

    public Set<Region> getOrigins() {
        return origins;
    }

    public FlightInfo origins(Set<Region> regions) {
        this.origins = regions;
        return this;
    }

    public FlightInfo addOrigin(Region region) {
        this.origins.add(region);
        return this;
    }

    public FlightInfo removeOrigin(Region region) {
        this.origins.remove(region);
        return this;
    }

    public void setOrigins(Set<Region> regions) {
        this.origins = regions;
    }

    public Set<FlightClass> getTravelClasses() {
        return travelClasses;
    }

    public FlightInfo travelClasses(Set<FlightClass> flightClasses) {
        this.travelClasses = flightClasses;
        return this;
    }

    public FlightInfo addTravelClass(FlightClass flightClass) {
        this.travelClasses.add(flightClass);
        return this;
    }

    public FlightInfo removeTravelClass(FlightClass flightClass) {
        this.travelClasses.remove(flightClass);
        return this;
    }

    public void setTravelClasses(Set<FlightClass> flightClasses) {
        this.travelClasses = flightClasses;
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
        FlightInfo flightInfo = (FlightInfo) o;
        if (flightInfo.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), flightInfo.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "FlightInfo{" + "id=" + getId() + "}";
    }
}
