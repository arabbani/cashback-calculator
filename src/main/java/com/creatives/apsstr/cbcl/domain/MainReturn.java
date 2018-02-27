package com.creatives.apsstr.cbcl.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.voodoodyne.jackson.jsog.JSOGGenerator;

import java.io.Serializable;
import java.util.Objects;

/**
 * A MainReturn.
 */
@Entity
@Table(name = "main_return")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@JsonIdentityInfo(generator = JSOGGenerator.class)
public class MainReturn implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "amount")
    private Integer amount;

    @NotNull
    @Column(name = "exact", nullable = false)
    private Boolean exact;

    @Column(name = "default_amount")
    private Integer defaultAmount;

    @ManyToOne
    private ReturnType type;

    @ManyToOne
    private ReturnMode mode;

    @ManyToOne
    private Card channel;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getAmount() {
        return amount;
    }

    public MainReturn amount(Integer amount) {
        this.amount = amount;
        return this;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    public Boolean isExact() {
        return exact;
    }

    public MainReturn exact(Boolean exact) {
        this.exact = exact;
        return this;
    }

    public void setExact(Boolean exact) {
        this.exact = exact;
    }

    public Integer getDefaultAmount() {
        return defaultAmount;
    }

    public MainReturn defaultAmount(Integer defaultAmount) {
        this.defaultAmount = defaultAmount;
        return this;
    }

    public void setDefaultAmount(Integer defaultAmount) {
        this.defaultAmount = defaultAmount;
    }

    public ReturnType getType() {
        return type;
    }

    public MainReturn type(ReturnType returnType) {
        this.type = returnType;
        return this;
    }

    public void setType(ReturnType returnType) {
        this.type = returnType;
    }

    public ReturnMode getMode() {
        return mode;
    }

    public MainReturn mode(ReturnMode returnMode) {
        this.mode = returnMode;
        return this;
    }

    public void setMode(ReturnMode returnMode) {
        this.mode = returnMode;
    }

    public Card getChannel() {
        return channel;
    }

    public MainReturn channel(Card card) {
        this.channel = card;
        return this;
    }

    public void setChannel(Card card) {
        this.channel = card;
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
        MainReturn mainReturn = (MainReturn) o;
        if (mainReturn.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), mainReturn.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "MainReturn{" +
            "id=" + getId() +
            ", amount=" + getAmount() +
            ", exact='" + isExact() + "'" +
            ", defaultAmount=" + getDefaultAmount() +
            "}";
    }
}
