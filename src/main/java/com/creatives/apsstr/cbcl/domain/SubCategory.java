package com.creatives.apsstr.cbcl.domain;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.voodoodyne.jackson.jsog.JSOGGenerator;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A SubCategory.
 */
@Entity
@Table(name = "sub_category")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@JsonIdentityInfo(generator = JSOGGenerator.class)
public class SubCategory implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(max = 50)
    @Column(name = "name", length = 50, nullable = false)
    private String name;

    @NotNull
    @Size(max = 50)
    @Column(name = "code", length = 50, nullable = false)
    private String code;

    @ManyToOne
    private Category category;

    @ManyToMany(mappedBy = "subCategories")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Offer> offers = new HashSet<>();

    @ManyToMany(mappedBy = "subCategories")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ServiceProvider> serviceProviders = new HashSet<>();

    @ManyToMany(mappedBy = "subCategories")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Merchant> merchants = new HashSet<>();

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

    public SubCategory name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public SubCategory code(String code) {
        this.code = code;
        return this;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Category getCategory() {
        return category;
    }

    public SubCategory category(Category category) {
        this.category = category;
        return this;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Set<Offer> getOffers() {
        return offers;
    }

    public SubCategory offers(Set<Offer> offers) {
        this.offers = offers;
        return this;
    }

    public SubCategory addOffer(Offer offer) {
        this.offers.add(offer);
        offer.getSubCategories().add(this);
        return this;
    }

    public SubCategory removeOffer(Offer offer) {
        this.offers.remove(offer);
        offer.getSubCategories().remove(this);
        return this;
    }

    public void setOffers(Set<Offer> offers) {
        this.offers = offers;
    }

    public Set<ServiceProvider> getServiceProviders() {
        return serviceProviders;
    }

    public SubCategory serviceProviders(Set<ServiceProvider> serviceProviders) {
        this.serviceProviders = serviceProviders;
        return this;
    }

    public SubCategory addServiceProvider(ServiceProvider serviceProvider) {
        this.serviceProviders.add(serviceProvider);
        serviceProvider.getSubCategories().add(this);
        return this;
    }

    public SubCategory removeServiceProvider(ServiceProvider serviceProvider) {
        this.serviceProviders.remove(serviceProvider);
        serviceProvider.getSubCategories().remove(this);
        return this;
    }

    public void setServiceProviders(Set<ServiceProvider> serviceProviders) {
        this.serviceProviders = serviceProviders;
    }

    public Set<Merchant> getMerchants() {
        return merchants;
    }

    public SubCategory merchants(Set<Merchant> merchants) {
        this.merchants = merchants;
        return this;
    }

    public SubCategory addMerchant(Merchant merchant) {
        this.merchants.add(merchant);
        merchant.getSubCategories().add(this);
        return this;
    }

    public SubCategory removeMerchant(Merchant merchant) {
        this.merchants.remove(merchant);
        merchant.getSubCategories().remove(this);
        return this;
    }

    public void setMerchants(Set<Merchant> merchants) {
        this.merchants = merchants;
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
        SubCategory subCategory = (SubCategory) o;
        if (subCategory.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), subCategory.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SubCategory{" + "id=" + getId() + ", name='" + getName() + "'" + ", code='" + getCode() + "'" + "}";
    }
}
