package com.creatives.apsstr.cbcl.domain;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.voodoodyne.jackson.jsog.JSOGGenerator;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A ServiceProvider.
 */
@Entity
@Table(name = "service_provider")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@JsonIdentityInfo(generator = JSOGGenerator.class)
public class ServiceProvider implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(max = 100)
    @Column(name = "name", length = 100, nullable = false)
    private String name;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "service_provider_sub_category",
               joinColumns = @JoinColumn(name="service_providers_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="sub_categories_id", referencedColumnName="id"))
    private Set<SubCategory> subCategories = new HashSet<>();

    @ManyToMany(mappedBy = "serviceProviders")
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

    public ServiceProvider name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<SubCategory> getSubCategories() {
        return subCategories;
    }

    public ServiceProvider subCategories(Set<SubCategory> subCategories) {
        this.subCategories = subCategories;
        return this;
    }

    public ServiceProvider addSubCategory(SubCategory subCategory) {
        this.subCategories.add(subCategory);
        subCategory.getServiceProviders().add(this);
        return this;
    }

    public ServiceProvider removeSubCategory(SubCategory subCategory) {
        this.subCategories.remove(subCategory);
        subCategory.getServiceProviders().remove(this);
        return this;
    }

    public void setSubCategories(Set<SubCategory> subCategories) {
        this.subCategories = subCategories;
    }

    public Set<Offer> getOffers() {
        return offers;
    }

    public ServiceProvider offers(Set<Offer> offers) {
        this.offers = offers;
        return this;
    }

    public ServiceProvider addOffer(Offer offer) {
        this.offers.add(offer);
        offer.getServiceProviders().add(this);
        return this;
    }

    public ServiceProvider removeOffer(Offer offer) {
        this.offers.remove(offer);
        offer.getServiceProviders().remove(this);
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
        ServiceProvider serviceProvider = (ServiceProvider) o;
        if (serviceProvider.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), serviceProvider.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ServiceProvider{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
