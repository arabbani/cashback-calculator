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
 * A Affiliate.
 */
@Entity
@Table(name = "affiliate")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Affiliate implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(max = 255)
    @Column(name = "name", length = 255, nullable = false)
    private String name;

    @Size(max = 2000)
    @Column(name = "url", length = 2000)
    private String url;

    @NotNull
    @Column(name = "active", nullable = false)
    private Boolean active;

    @OneToMany(mappedBy = "affiliate")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<AffiliateCredential> credentials = new HashSet<>();

    @OneToMany(mappedBy = "affiliate")
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

    public Affiliate name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUrl() {
        return url;
    }

    public Affiliate url(String url) {
        this.url = url;
        return this;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Boolean isActive() {
        return active;
    }

    public Affiliate active(Boolean active) {
        this.active = active;
        return this;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public Set<AffiliateCredential> getCredentials() {
        return credentials;
    }

    public Affiliate credentials(Set<AffiliateCredential> affiliateCredentials) {
        this.credentials = affiliateCredentials;
        return this;
    }

    public Affiliate addCredential(AffiliateCredential affiliateCredential) {
        this.credentials.add(affiliateCredential);
        affiliateCredential.setAffiliate(this);
        return this;
    }

    public Affiliate removeCredential(AffiliateCredential affiliateCredential) {
        this.credentials.remove(affiliateCredential);
        affiliateCredential.setAffiliate(null);
        return this;
    }

    public void setCredentials(Set<AffiliateCredential> affiliateCredentials) {
        this.credentials = affiliateCredentials;
    }

    public Set<Offer> getOffers() {
        return offers;
    }

    public Affiliate offers(Set<Offer> offers) {
        this.offers = offers;
        return this;
    }

    public Affiliate addOffer(Offer offer) {
        this.offers.add(offer);
        offer.setAffiliate(this);
        return this;
    }

    public Affiliate removeOffer(Offer offer) {
        this.offers.remove(offer);
        offer.setAffiliate(null);
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
        Affiliate affiliate = (Affiliate) o;
        if (affiliate.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), affiliate.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Affiliate{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", url='" + getUrl() + "'" +
            ", active='" + isActive() + "'" +
            "}";
    }
}
