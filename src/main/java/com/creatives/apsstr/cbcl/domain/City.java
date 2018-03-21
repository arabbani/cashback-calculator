package com.creatives.apsstr.cbcl.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A City.
 */
@Entity
@Table(name = "city")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class City implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(max = 100)
    @Column(name = "name", length = 100, nullable = false)
    private String name;

    @OneToMany(mappedBy = "city")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<UserInfo> users = new HashSet<>();

    @ManyToOne
    private State state;

    @ManyToMany(mappedBy = "cities")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Offer> offers = new HashSet<>();

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

    public City name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<UserInfo> getUsers() {
        return users;
    }

    public City users(Set<UserInfo> userInfos) {
        this.users = userInfos;
        return this;
    }

    public City addUser(UserInfo userInfo) {
        this.users.add(userInfo);
        userInfo.setCity(this);
        return this;
    }

    public City removeUser(UserInfo userInfo) {
        this.users.remove(userInfo);
        userInfo.setCity(null);
        return this;
    }

    public void setUsers(Set<UserInfo> userInfos) {
        this.users = userInfos;
    }

    public State getState() {
        return state;
    }

    public City state(State state) {
        this.state = state;
        return this;
    }

    public void setState(State state) {
        this.state = state;
    }

    public Set<Offer> getOffers() {
        return offers;
    }

    public City offers(Set<Offer> offers) {
        this.offers = offers;
        return this;
    }

    public City addOffer(Offer offer) {
        this.offers.add(offer);
        offer.getCities().add(this);
        return this;
    }

    public City removeOffer(Offer offer) {
        this.offers.remove(offer);
        offer.getCities().remove(this);
        return this;
    }

    public void setOffers(Set<Offer> offers) {
        this.offers = offers;
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
        City city = (City) o;
        if (city.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), city.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "City{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
