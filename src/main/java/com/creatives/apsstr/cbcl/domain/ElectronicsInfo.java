package com.creatives.apsstr.cbcl.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.voodoodyne.jackson.jsog.JSOGGenerator;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A ElectronicsInfo.
 */
@Entity
@Table(name = "electronics_info")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@JsonIdentityInfo(generator = JSOGGenerator.class)
public class ElectronicsInfo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "electronics_info_brand",
               joinColumns = @JoinColumn(name="electronics_infos_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="brands_id", referencedColumnName="id"))
    private Set<Brand> brands = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Set<Brand> getBrands() {
        return brands;
    }

    public ElectronicsInfo brands(Set<Brand> brands) {
        this.brands = brands;
        return this;
    }

    public ElectronicsInfo addBrand(Brand brand) {
        this.brands.add(brand);
        return this;
    }

    public ElectronicsInfo removeBrand(Brand brand) {
        this.brands.remove(brand);
        return this;
    }

    public void setBrands(Set<Brand> brands) {
        this.brands = brands;
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
        ElectronicsInfo electronicsInfo = (ElectronicsInfo) o;
        if (electronicsInfo.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), electronicsInfo.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ElectronicsInfo{" +
            "id=" + getId() +
            "}";
    }
}
