package com.creatives.apsstr.cbcl.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A UserInfo.
 */
@Entity
@Table(name = "user_info")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class UserInfo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private City city;

    @OneToOne
    @JoinColumn(unique = true)
    private User user;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "user_info_merchant",
               joinColumns = @JoinColumn(name="user_infos_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="merchants_id", referencedColumnName="id"))
    private Set<Merchant> merchants = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "user_info_card",
               joinColumns = @JoinColumn(name="user_infos_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="cards_id", referencedColumnName="id"))
    private Set<Card> cards = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "user_info_operating_system",
               joinColumns = @JoinColumn(name="user_infos_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="operating_systems_id", referencedColumnName="id"))
    private Set<OperatingSystem> operatingSystems = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public City getCity() {
        return city;
    }

    public UserInfo city(City city) {
        this.city = city;
        return this;
    }

    public void setCity(City city) {
        this.city = city;
    }

    public User getUser() {
        return user;
    }

    public UserInfo user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<Merchant> getMerchants() {
        return merchants;
    }

    public UserInfo merchants(Set<Merchant> merchants) {
        this.merchants = merchants;
        return this;
    }

    public UserInfo addMerchant(Merchant merchant) {
        this.merchants.add(merchant);
        return this;
    }

    public UserInfo removeMerchant(Merchant merchant) {
        this.merchants.remove(merchant);
        return this;
    }

    public void setMerchants(Set<Merchant> merchants) {
        this.merchants = merchants;
    }

    public Set<Card> getCards() {
        return cards;
    }

    public UserInfo cards(Set<Card> cards) {
        this.cards = cards;
        return this;
    }

    public UserInfo addCard(Card card) {
        this.cards.add(card);
        return this;
    }

    public UserInfo removeCard(Card card) {
        this.cards.remove(card);
        return this;
    }

    public void setCards(Set<Card> cards) {
        this.cards = cards;
    }

    public Set<OperatingSystem> getOperatingSystems() {
        return operatingSystems;
    }

    public UserInfo operatingSystems(Set<OperatingSystem> operatingSystems) {
        this.operatingSystems = operatingSystems;
        return this;
    }

    public UserInfo addOperatingSystem(OperatingSystem operatingSystem) {
        this.operatingSystems.add(operatingSystem);
        return this;
    }

    public UserInfo removeOperatingSystem(OperatingSystem operatingSystem) {
        this.operatingSystems.remove(operatingSystem);
        return this;
    }

    public void setOperatingSystems(Set<OperatingSystem> operatingSystems) {
        this.operatingSystems = operatingSystems;
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
        UserInfo userInfo = (UserInfo) o;
        if (userInfo.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), userInfo.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "UserInfo{" +
            "id=" + getId() +
            "}";
    }
}
