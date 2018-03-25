package com.creatives.apsstr.cbcl.domain;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.voodoodyne.jackson.jsog.JSOGGenerator;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A TravelInfo.
 */
@Entity
@Table(name = "travel_info")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@JsonIdentityInfo(generator = JSOGGenerator.class)
public class TravelInfo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(unique = true)
    private FlightInfo flightInfo;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(unique = true)
    private BusInfo busInfo;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "travel_info_type", joinColumns = @JoinColumn(name = "travel_infos_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "types_id", referencedColumnName = "id"))
    private Set<TravelType> types = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public FlightInfo getFlightInfo() {
        return flightInfo;
    }

    public TravelInfo flightInfo(FlightInfo flightInfo) {
        this.flightInfo = flightInfo;
        return this;
    }

    public void setFlightInfo(FlightInfo flightInfo) {
        this.flightInfo = flightInfo;
    }

    public BusInfo getBusInfo() {
        return busInfo;
    }

    public TravelInfo busInfo(BusInfo busInfo) {
        this.busInfo = busInfo;
        return this;
    }

    public void setBusInfo(BusInfo busInfo) {
        this.busInfo = busInfo;
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
        return "TravelInfo{" + "id=" + getId() + "}";
    }
}
