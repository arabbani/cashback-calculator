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
 * A OfferPayment.
 */
@Entity
@Table(name = "offer_payment")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class OfferPayment implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToMany(fetch = FetchType.EAGER)
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "offer_payment_card", joinColumns = @JoinColumn(name = "offer_payments_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "cards_id", referencedColumnName = "id"))
    private Set<Card> cards = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Set<Card> getCards() {
        return cards;
    }

    public OfferPayment cards(Set<Card> cards) {
        this.cards = cards;
        return this;
    }

    public OfferPayment addCard(Card card) {
        this.cards.add(card);
        return this;
    }

    public OfferPayment removeCard(Card card) {
        this.cards.remove(card);
        return this;
    }

    public void setCards(Set<Card> cards) {
        this.cards = cards;
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
        OfferPayment offerPayment = (OfferPayment) o;
        if (offerPayment.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), offerPayment.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "OfferPayment{" + "id=" + getId() + "}";
    }
}
