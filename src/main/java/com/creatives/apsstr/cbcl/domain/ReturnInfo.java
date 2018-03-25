package com.creatives.apsstr.cbcl.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A ReturnInfo.
 */
@Entity
@Table(name = "return_info")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ReturnInfo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(unique = true)
    private MainReturn mainReturn;

    @OneToOne
    @JoinColumn(unique = true)
    private ReturnExtras extras;

    @ManyToOne
    private ReturnType type;

    @ManyToOne
    private Offer returnOffer;

    @ManyToOne
    private OfferReturn offerReturn;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public MainReturn getMainReturn() {
        return mainReturn;
    }

    public ReturnInfo mainReturn(MainReturn mainReturn) {
        this.mainReturn = mainReturn;
        return this;
    }

    public void setMainReturn(MainReturn mainReturn) {
        this.mainReturn = mainReturn;
    }

    public ReturnExtras getExtras() {
        return extras;
    }

    public ReturnInfo extras(ReturnExtras returnExtras) {
        this.extras = returnExtras;
        return this;
    }

    public void setExtras(ReturnExtras returnExtras) {
        this.extras = returnExtras;
    }

    public ReturnType getType() {
        return type;
    }

    public ReturnInfo type(ReturnType returnType) {
        this.type = returnType;
        return this;
    }

    public void setType(ReturnType returnType) {
        this.type = returnType;
    }

    public Offer getReturnOffer() {
        return returnOffer;
    }

    public ReturnInfo returnOffer(Offer offer) {
        this.returnOffer = offer;
        return this;
    }

    public void setReturnOffer(Offer offer) {
        this.returnOffer = offer;
    }

    public OfferReturn getOfferReturn() {
        return offerReturn;
    }

    public ReturnInfo offerReturn(OfferReturn offerReturn) {
        this.offerReturn = offerReturn;
        return this;
    }

    public void setOfferReturn(OfferReturn offerReturn) {
        this.offerReturn = offerReturn;
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
        ReturnInfo returnInfo = (ReturnInfo) o;
        if (returnInfo.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), returnInfo.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ReturnInfo{" +
            "id=" + getId() +
            "}";
    }
}
