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

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.voodoodyne.jackson.jsog.JSOGGenerator;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A BusInfo.
 */
@Entity
@Table(name = "bus_info")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@JsonIdentityInfo(generator = JSOGGenerator.class)
public class BusInfo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "bus_info_from", joinColumns = @JoinColumn(name = "bus_infos_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "froms_id", referencedColumnName = "id"))
    private Set<City> froms = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "bus_info_to", joinColumns = @JoinColumn(name = "bus_infos_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "tos_id", referencedColumnName = "id"))
    private Set<City> tos = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Set<City> getFroms() {
        return froms;
    }

    public BusInfo froms(Set<City> cities) {
        this.froms = cities;
        return this;
    }

    public BusInfo addFrom(City city) {
        this.froms.add(city);
        return this;
    }

    public BusInfo removeFrom(City city) {
        this.froms.remove(city);
        return this;
    }

    public void setFroms(Set<City> cities) {
        this.froms = cities;
    }

    public Set<City> getTos() {
        return tos;
    }

    public BusInfo tos(Set<City> cities) {
        this.tos = cities;
        return this;
    }

    public BusInfo addTo(City city) {
        this.tos.add(city);
        return this;
    }

    public BusInfo removeTo(City city) {
        this.tos.remove(city);
        return this;
    }

    public void setTos(Set<City> cities) {
        this.tos = cities;
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
        BusInfo busInfo = (BusInfo) o;
        if (busInfo.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), busInfo.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "BusInfo{" + "id=" + getId() + "}";
    }
}
