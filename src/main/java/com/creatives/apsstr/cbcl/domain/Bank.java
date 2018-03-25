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
 * A Bank.
 */
@Entity
@Table(name = "bank")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Bank implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(max = 70)
    @Column(name = "name", length = 70, nullable = false)
    private String name;

    @OneToMany(mappedBy = "bank")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Card> cards = new HashSet<>();

    @ManyToOne
    private BankType type;

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

    public Bank name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Card> getCards() {
        return cards;
    }

    public Bank cards(Set<Card> cards) {
        this.cards = cards;
        return this;
    }

    public Bank addCard(Card card) {
        this.cards.add(card);
        card.setBank(this);
        return this;
    }

    public Bank removeCard(Card card) {
        this.cards.remove(card);
        card.setBank(null);
        return this;
    }

    public void setCards(Set<Card> cards) {
        this.cards = cards;
    }

    public BankType getType() {
        return type;
    }

    public Bank type(BankType bankType) {
        this.type = bankType;
        return this;
    }

    public void setType(BankType bankType) {
        this.type = bankType;
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
        Bank bank = (Bank) o;
        if (bank.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), bank.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Bank{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
