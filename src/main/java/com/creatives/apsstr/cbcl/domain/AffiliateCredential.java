package com.creatives.apsstr.cbcl.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A AffiliateCredential.
 */
@Entity
@Table(name = "affiliate_credential")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class AffiliateCredential implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(max = 100)
    @Column(name = "tracking_id", length = 100)
    private String trackingId;

    @Size(max = 100)
    @Column(name = "token", length = 100)
    private String token;

    @Size(max = 100)
    @Column(name = "api_key", length = 100)
    private String apiKey;

    @NotNull
    @Column(name = "active", nullable = false)
    private Boolean active;

    @ManyToOne
    private Affiliate affiliate;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTrackingId() {
        return trackingId;
    }

    public AffiliateCredential trackingId(String trackingId) {
        this.trackingId = trackingId;
        return this;
    }

    public void setTrackingId(String trackingId) {
        this.trackingId = trackingId;
    }

    public String getToken() {
        return token;
    }

    public AffiliateCredential token(String token) {
        this.token = token;
        return this;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getApiKey() {
        return apiKey;
    }

    public AffiliateCredential apiKey(String apiKey) {
        this.apiKey = apiKey;
        return this;
    }

    public void setApiKey(String apiKey) {
        this.apiKey = apiKey;
    }

    public Boolean isActive() {
        return active;
    }

    public AffiliateCredential active(Boolean active) {
        this.active = active;
        return this;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public Affiliate getAffiliate() {
        return affiliate;
    }

    public AffiliateCredential affiliate(Affiliate affiliate) {
        this.affiliate = affiliate;
        return this;
    }

    public void setAffiliate(Affiliate affiliate) {
        this.affiliate = affiliate;
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
        AffiliateCredential affiliateCredential = (AffiliateCredential) o;
        if (affiliateCredential.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), affiliateCredential.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AffiliateCredential{" +
            "id=" + getId() +
            ", trackingId='" + getTrackingId() + "'" +
            ", token='" + getToken() + "'" +
            ", apiKey='" + getApiKey() + "'" +
            ", active='" + isActive() + "'" +
            "}";
    }
}
