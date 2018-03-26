package com.creatives.apsstr.cbcl.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Card.
 */
@Entity
@Table(name = "card")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Card implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(max = 255)
    @Column(name = "name", length = 255, nullable = false)
    private String name;

    @ManyToOne
    private CardType type;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "card_card_provider",
               joinColumns = @JoinColumn(name="cards_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="card_providers_id", referencedColumnName="id"))
    private Set<CardProvider> cardProviders = new HashSet<>();

    @ManyToOne
    private Bank bank;

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

    public Card name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public CardType getType() {
        return type;
    }

    public Card type(CardType cardType) {
        this.type = cardType;
        return this;
    }

    public void setType(CardType cardType) {
        this.type = cardType;
    }

    public Set<CardProvider> getCardProviders() {
        return cardProviders;
    }

    public Card cardProviders(Set<CardProvider> cardProviders) {
        this.cardProviders = cardProviders;
        return this;
    }

    public Card addCardProvider(CardProvider cardProvider) {
        this.cardProviders.add(cardProvider);
        return this;
    }

    public Card removeCardProvider(CardProvider cardProvider) {
        this.cardProviders.remove(cardProvider);
        return this;
    }

    public void setCardProviders(Set<CardProvider> cardProviders) {
        this.cardProviders = cardProviders;
    }

    public Bank getBank() {
        return bank;
    }

    public Card bank(Bank bank) {
        this.bank = bank;
        return this;
    }

    public void setBank(Bank bank) {
        this.bank = bank;
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
        Card card = (Card) o;
        if (card.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), card.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Card{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
