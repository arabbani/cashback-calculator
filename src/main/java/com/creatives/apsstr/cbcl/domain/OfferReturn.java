package com.creatives.apsstr.cbcl.domain;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.voodoodyne.jackson.jsog.JSOGGenerator;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A OfferReturn.
 */
@Entity
@Table(name = "offer_return")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@JsonIdentityInfo(generator = JSOGGenerator.class)
public class OfferReturn implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(unique = true)
    private ReturnExtras extras;

    @OneToMany(mappedBy = "offerReturn", fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ReturnInfo> returnInfos = new HashSet<>();

    @ManyToOne
    @JsonBackReference
    private Offer offer;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ReturnExtras getExtras() {
        return extras;
    }

    public OfferReturn extras(ReturnExtras returnExtras) {
        this.extras = returnExtras;
        return this;
    }

    public void setExtras(ReturnExtras returnExtras) {
        this.extras = returnExtras;
    }

    public Set<ReturnInfo> getReturnInfos() {
        return returnInfos;
    }

    public OfferReturn returnInfos(Set<ReturnInfo> returnInfos) {
        this.returnInfos = returnInfos;
        return this;
    }

    public OfferReturn addReturnInfo(ReturnInfo returnInfo) {
        this.returnInfos.add(returnInfo);
        returnInfo.setOfferReturn(this);
        return this;
    }

    public OfferReturn removeReturnInfo(ReturnInfo returnInfo) {
        this.returnInfos.remove(returnInfo);
        returnInfo.setOfferReturn(null);
        return this;
    }

    public void setReturnInfos(Set<ReturnInfo> returnInfos) {
        this.returnInfos = returnInfos;
    }

    public Offer getOffer() {
        return offer;
    }

    public OfferReturn offer(Offer offer) {
        this.offer = offer;
        return this;
    }

    public void setOffer(Offer offer) {
        this.offer = offer;
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
        OfferReturn offerReturn = (OfferReturn) o;
        if (offerReturn.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), offerReturn.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "OfferReturn{" + "id=" + getId() + "}";
    }
}
