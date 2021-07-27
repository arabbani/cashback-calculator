package com.creatives.apsstr.cbcl.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

/**
 * A HotelInfo.
 */
@Entity
@Table(name = "hotel_info")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class HotelInfo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "hotel_info_type", joinColumns = @JoinColumn(name = "hotel_infos_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "types_id", referencedColumnName = "id"))
    private Set<Region> types = new HashSet<>();

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

    public HotelInfo types(Set<Region> regions) {
        this.types = regions;
        return this;
    }

    public HotelInfo addType(Region region) {
        this.types.add(region);
        return this;
    }

    public HotelInfo removeType(Region region) {
        this.types.remove(region);
        return this;
    }

    public void setTypes(Set<Region> regions) {
        this.types = regions;
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
        HotelInfo hotelInfo = (HotelInfo) o;
        if (hotelInfo.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), hotelInfo.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "HotelInfo{" + "id=" + getId() + "}";
    }
}
