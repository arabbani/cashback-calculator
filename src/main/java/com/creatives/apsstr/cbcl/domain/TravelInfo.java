package com.creatives.apsstr.cbcl.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A TravelInfo.
 */
@Entity
@Table(name = "travel_info")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class TravelInfo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "travel_info_type",
               joinColumns = @JoinColumn(name="travel_infos_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="types_id", referencedColumnName="id"))
    private Set<TravelType> types = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "travel_info_region",
               joinColumns = @JoinColumn(name="travel_infos_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="regions_id", referencedColumnName="id"))
    private Set<Region> regions = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "travel_info_origin",
               joinColumns = @JoinColumn(name="travel_infos_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="origins_id", referencedColumnName="id"))
    private Set<Region> origins = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Set<TravelType> getTypes() {
        return types;
    }

    public TravelInfo types(Set<TravelType> travelTypes) {
        this.types = travelTypes;
        return this;
    }

    public TravelInfo addType(TravelType travelType) {
        this.types.add(travelType);
        return this;
    }

    public TravelInfo removeType(TravelType travelType) {
        this.types.remove(travelType);
        return this;
    }

    public void setTypes(Set<TravelType> travelTypes) {
        this.types = travelTypes;
    }

    public Set<Region> getRegions() {
        return regions;
    }

    public TravelInfo regions(Set<Region> regions) {
        this.regions = regions;
        return this;
    }

    public TravelInfo addRegion(Region region) {
        this.regions.add(region);
        return this;
    }

    public TravelInfo removeRegion(Region region) {
        this.regions.remove(region);
        return this;
    }

    public void setRegions(Set<Region> regions) {
        this.regions = regions;
    }

    public Set<Region> getOrigins() {
        return origins;
    }

    public TravelInfo origins(Set<Region> regions) {
        this.origins = regions;
        return this;
    }

    public TravelInfo addOrigin(Region region) {
        this.origins.add(region);
        return this;
    }

    public TravelInfo removeOrigin(Region region) {
        this.origins.remove(region);
        return this;
    }

    public void setOrigins(Set<Region> regions) {
        this.origins = regions;
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
        TravelInfo travelInfo = (TravelInfo) o;
        if (travelInfo.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), travelInfo.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TravelInfo{" +
            "id=" + getId() +
            "}";
    }
}
