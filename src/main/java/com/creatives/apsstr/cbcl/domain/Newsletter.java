package com.creatives.apsstr.cbcl.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Newsletter.
 */
@Entity
@Table(name = "newsletter")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Newsletter implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(max = 254)
    @Column(name = "email_id", length = 254)
    private String emailId;

    @Column(name = "phone_number")
    private Long phoneNumber;

    @Column(name = "mail_per_week")
    private Integer mailPerWeek;

    @Column(name = "number_of_mails_sent")
    private Integer numberOfMailsSent;

    @NotNull
    @Column(name = "active", nullable = false)
    private Boolean active;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmailId() {
        return emailId;
    }

    public Newsletter emailId(String emailId) {
        this.emailId = emailId;
        return this;
    }

    public void setEmailId(String emailId) {
        this.emailId = emailId;
    }

    public Long getPhoneNumber() {
        return phoneNumber;
    }

    public Newsletter phoneNumber(Long phoneNumber) {
        this.phoneNumber = phoneNumber;
        return this;
    }

    public void setPhoneNumber(Long phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public Integer getMailPerWeek() {
        return mailPerWeek;
    }

    public Newsletter mailPerWeek(Integer mailPerWeek) {
        this.mailPerWeek = mailPerWeek;
        return this;
    }

    public void setMailPerWeek(Integer mailPerWeek) {
        this.mailPerWeek = mailPerWeek;
    }

    public Integer getNumberOfMailsSent() {
        return numberOfMailsSent;
    }

    public Newsletter numberOfMailsSent(Integer numberOfMailsSent) {
        this.numberOfMailsSent = numberOfMailsSent;
        return this;
    }

    public void setNumberOfMailsSent(Integer numberOfMailsSent) {
        this.numberOfMailsSent = numberOfMailsSent;
    }

    public Boolean isActive() {
        return active;
    }

    public Newsletter active(Boolean active) {
        this.active = active;
        return this;
    }

    public void setActive(Boolean active) {
        this.active = active;
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
        Newsletter newsletter = (Newsletter) o;
        if (newsletter.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), newsletter.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Newsletter{" +
            "id=" + getId() +
            ", emailId='" + getEmailId() + "'" +
            ", phoneNumber=" + getPhoneNumber() +
            ", mailPerWeek=" + getMailPerWeek() +
            ", numberOfMailsSent=" + getNumberOfMailsSent() +
            ", active='" + isActive() + "'" +
            "}";
    }
}
