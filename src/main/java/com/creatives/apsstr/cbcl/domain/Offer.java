package com.creatives.apsstr.cbcl.domain;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.voodoodyne.jackson.jsog.JSOGGenerator;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Offer.
 */
@Entity
@Table(name = "offer")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@JsonIdentityInfo(generator = JSOGGenerator.class)
public class Offer implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(max = 500)
    @Column(name = "name", length = 500, nullable = false)
    private String name;

    @Size(max = 2000)
    @Column(name = "description", length = 2000)
    private String description;

    @Size(max = 2000)
    @Column(name = "admin_description", length = 2000)
    private String adminDescription;

    @Size(max = 255)
    @Column(name = "code", length = 255)
    private String code;

    @NotNull
    @Column(name = "start_date", nullable = false)
    private ZonedDateTime startDate;

    @NotNull
    @Column(name = "end_date", nullable = false)
    private ZonedDateTime endDate;

    @Column(name = "maximum_uses_per_user")
    private Integer maximumUsesPerUser;

    @Column(name = "maximum_uses_per_day")
    private Integer maximumUsesPerDay;

    @Column(name = "maximum_uses_per_week")
    private Integer maximumUsesPerWeek;

    @Column(name = "maximum_uses_per_month")
    private Integer maximumUsesPerMonth;

    @Column(name = "maximum_uses_per_number")
    private Integer maximumUsesPerNumber;

    @NotNull
    @Column(name = "new_user_only", nullable = false)
    private Boolean newUserOnly;

    @NotNull
    @Column(name = "app_only", nullable = false)
    private Boolean appOnly;

    @NotNull
    @Column(name = "website_only", nullable = false)
    private Boolean websiteOnly;

    @Column(name = "number_of_uses")
    private Long numberOfUses;

    @NotNull
    @Column(name = "dummy", nullable = false)
    private Boolean dummy;

    @NotNull
    @Column(name = "apsstr_exclusive", nullable = false)
    private Boolean apsstrExclusive;

    @Size(max = 2000)
    @Column(name = "url", length = 2000)
    private String url;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(unique = true)
    private TravelInfo travelInfo;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(unique = true)
    private ReechargeInfo reechargeInfo;

    @OneToMany(mappedBy = "offer", fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<OfferReturn> offerReturns = new HashSet<>();

    @ManyToOne
    private OfferPolicy policy;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "offer_operating_system", joinColumns = @JoinColumn(name = "offers_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "operating_systems_id", referencedColumnName = "id"))
    private Set<OperatingSystem> operatingSystems = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "offer_country", joinColumns = @JoinColumn(name = "offers_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "countries_id", referencedColumnName = "id"))
    private Set<Country> countries = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "offer_state", joinColumns = @JoinColumn(name = "offers_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "states_id", referencedColumnName = "id"))
    private Set<State> states = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "offer_city", joinColumns = @JoinColumn(name = "offers_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "cities_id", referencedColumnName = "id"))
    private Set<City> cities = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "offer_sub_category", joinColumns = @JoinColumn(name = "offers_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "sub_categories_id", referencedColumnName = "id"))
    private Set<SubCategory> subCategories = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "offer_service_provider", joinColumns = @JoinColumn(name = "offers_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "service_providers_id", referencedColumnName = "id"))
    private Set<ServiceProvider> serviceProviders = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "offer_active_date", joinColumns = @JoinColumn(name = "offers_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "active_dates_id", referencedColumnName = "id"))
    private Set<Date> activeDates = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "offer_active_day", joinColumns = @JoinColumn(name = "offers_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "active_days_id", referencedColumnName = "id"))
    private Set<Day> activeDays = new HashSet<>();

    @ManyToOne
    private Affiliate affiliate;

    @ManyToOne
    private Merchant merchant;

    @ManyToOne
    private OfferType type;

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

    public Offer name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public Offer description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAdminDescription() {
        return adminDescription;
    }

    public Offer adminDescription(String adminDescription) {
        this.adminDescription = adminDescription;
        return this;
    }

    public void setAdminDescription(String adminDescription) {
        this.adminDescription = adminDescription;
    }

    public String getCode() {
        return code;
    }

    public Offer code(String code) {
        this.code = code;
        return this;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public ZonedDateTime getStartDate() {
        return startDate;
    }

    public Offer startDate(ZonedDateTime startDate) {
        this.startDate = startDate;
        return this;
    }

    public void setStartDate(ZonedDateTime startDate) {
        this.startDate = startDate;
    }

    public ZonedDateTime getEndDate() {
        return endDate;
    }

    public Offer endDate(ZonedDateTime endDate) {
        this.endDate = endDate;
        return this;
    }

    public void setEndDate(ZonedDateTime endDate) {
        this.endDate = endDate;
    }

    public Integer getMaximumUsesPerUser() {
        return maximumUsesPerUser;
    }

    public Offer maximumUsesPerUser(Integer maximumUsesPerUser) {
        this.maximumUsesPerUser = maximumUsesPerUser;
        return this;
    }

    public void setMaximumUsesPerUser(Integer maximumUsesPerUser) {
        this.maximumUsesPerUser = maximumUsesPerUser;
    }

    public Integer getMaximumUsesPerDay() {
        return maximumUsesPerDay;
    }

    public Offer maximumUsesPerDay(Integer maximumUsesPerDay) {
        this.maximumUsesPerDay = maximumUsesPerDay;
        return this;
    }

    public void setMaximumUsesPerDay(Integer maximumUsesPerDay) {
        this.maximumUsesPerDay = maximumUsesPerDay;
    }

    public Integer getMaximumUsesPerWeek() {
        return maximumUsesPerWeek;
    }

    public Offer maximumUsesPerWeek(Integer maximumUsesPerWeek) {
        this.maximumUsesPerWeek = maximumUsesPerWeek;
        return this;
    }

    public void setMaximumUsesPerWeek(Integer maximumUsesPerWeek) {
        this.maximumUsesPerWeek = maximumUsesPerWeek;
    }

    public Integer getMaximumUsesPerMonth() {
        return maximumUsesPerMonth;
    }

    public Offer maximumUsesPerMonth(Integer maximumUsesPerMonth) {
        this.maximumUsesPerMonth = maximumUsesPerMonth;
        return this;
    }

    public void setMaximumUsesPerMonth(Integer maximumUsesPerMonth) {
        this.maximumUsesPerMonth = maximumUsesPerMonth;
    }

    public Integer getMaximumUsesPerNumber() {
        return maximumUsesPerNumber;
    }

    public Offer maximumUsesPerNumber(Integer maximumUsesPerNumber) {
        this.maximumUsesPerNumber = maximumUsesPerNumber;
        return this;
    }

    public void setMaximumUsesPerNumber(Integer maximumUsesPerNumber) {
        this.maximumUsesPerNumber = maximumUsesPerNumber;
    }

    public Boolean isNewUserOnly() {
        return newUserOnly;
    }

    public Offer newUserOnly(Boolean newUserOnly) {
        this.newUserOnly = newUserOnly;
        return this;
    }

    public void setNewUserOnly(Boolean newUserOnly) {
        this.newUserOnly = newUserOnly;
    }

    public Boolean isAppOnly() {
        return appOnly;
    }

    public Offer appOnly(Boolean appOnly) {
        this.appOnly = appOnly;
        return this;
    }

    public void setAppOnly(Boolean appOnly) {
        this.appOnly = appOnly;
    }

    public Boolean isWebsiteOnly() {
        return websiteOnly;
    }

    public Offer websiteOnly(Boolean websiteOnly) {
        this.websiteOnly = websiteOnly;
        return this;
    }

    public void setWebsiteOnly(Boolean websiteOnly) {
        this.websiteOnly = websiteOnly;
    }

    public Long getNumberOfUses() {
        return numberOfUses;
    }

    public Offer numberOfUses(Long numberOfUses) {
        this.numberOfUses = numberOfUses;
        return this;
    }

    public void setNumberOfUses(Long numberOfUses) {
        this.numberOfUses = numberOfUses;
    }

    public Boolean isDummy() {
        return dummy;
    }

    public Offer dummy(Boolean dummy) {
        this.dummy = dummy;
        return this;
    }

    public void setDummy(Boolean dummy) {
        this.dummy = dummy;
    }

    public Boolean isApsstrExclusive() {
        return apsstrExclusive;
    }

    public Offer apsstrExclusive(Boolean apsstrExclusive) {
        this.apsstrExclusive = apsstrExclusive;
        return this;
    }

    public void setApsstrExclusive(Boolean apsstrExclusive) {
        this.apsstrExclusive = apsstrExclusive;
    }

    public String getUrl() {
        return url;
    }

    public Offer url(String url) {
        this.url = url;
        return this;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public TravelInfo getTravelInfo() {
        return travelInfo;
    }

    public Offer travelInfo(TravelInfo travelInfo) {
        this.travelInfo = travelInfo;
        return this;
    }

    public void setTravelInfo(TravelInfo travelInfo) {
        this.travelInfo = travelInfo;
    }

    public ReechargeInfo getReechargeInfo() {
        return reechargeInfo;
    }

    public Offer reechargeInfo(ReechargeInfo reechargeInfo) {
        this.reechargeInfo = reechargeInfo;
        return this;
    }

    public void setReechargeInfo(ReechargeInfo reechargeInfo) {
        this.reechargeInfo = reechargeInfo;
    }

    public Set<OfferReturn> getOfferReturns() {
        return offerReturns;
    }

    public Offer offerReturns(Set<OfferReturn> offerReturns) {
        this.offerReturns = offerReturns;
        return this;
    }

    public Offer addOfferReturn(OfferReturn offerReturn) {
        this.offerReturns.add(offerReturn);
        offerReturn.setOffer(this);
        return this;
    }

    public Offer removeOfferReturn(OfferReturn offerReturn) {
        this.offerReturns.remove(offerReturn);
        offerReturn.setOffer(null);
        return this;
    }

    public void setOfferReturns(Set<OfferReturn> offerReturns) {
        this.offerReturns = offerReturns;
    }

    public OfferPolicy getPolicy() {
        return policy;
    }

    public Offer policy(OfferPolicy offerPolicy) {
        this.policy = offerPolicy;
        return this;
    }

    public void setPolicy(OfferPolicy offerPolicy) {
        this.policy = offerPolicy;
    }

    public Set<OperatingSystem> getOperatingSystems() {
        return operatingSystems;
    }

    public Offer operatingSystems(Set<OperatingSystem> operatingSystems) {
        this.operatingSystems = operatingSystems;
        return this;
    }

    public Offer addOperatingSystem(OperatingSystem operatingSystem) {
        this.operatingSystems.add(operatingSystem);
        return this;
    }

    public Offer removeOperatingSystem(OperatingSystem operatingSystem) {
        this.operatingSystems.remove(operatingSystem);
        return this;
    }

    public void setOperatingSystems(Set<OperatingSystem> operatingSystems) {
        this.operatingSystems = operatingSystems;
    }

    public Set<Country> getCountries() {
        return countries;
    }

    public Offer countries(Set<Country> countries) {
        this.countries = countries;
        return this;
    }

    public Offer addCountry(Country country) {
        this.countries.add(country);
        country.getOffers().add(this);
        return this;
    }

    public Offer removeCountry(Country country) {
        this.countries.remove(country);
        country.getOffers().remove(this);
        return this;
    }

    public void setCountries(Set<Country> countries) {
        this.countries = countries;
    }

    public Set<State> getStates() {
        return states;
    }

    public Offer states(Set<State> states) {
        this.states = states;
        return this;
    }

    public Offer addState(State state) {
        this.states.add(state);
        state.getOffers().add(this);
        return this;
    }

    public Offer removeState(State state) {
        this.states.remove(state);
        state.getOffers().remove(this);
        return this;
    }

    public void setStates(Set<State> states) {
        this.states = states;
    }

    public Set<City> getCities() {
        return cities;
    }

    public Offer cities(Set<City> cities) {
        this.cities = cities;
        return this;
    }

    public Offer addCity(City city) {
        this.cities.add(city);
        city.getOffers().add(this);
        return this;
    }

    public Offer removeCity(City city) {
        this.cities.remove(city);
        city.getOffers().remove(this);
        return this;
    }

    public void setCities(Set<City> cities) {
        this.cities = cities;
    }

    public Set<SubCategory> getSubCategories() {
        return subCategories;
    }

    public Offer subCategories(Set<SubCategory> subCategories) {
        this.subCategories = subCategories;
        return this;
    }

    public Offer addSubCategory(SubCategory subCategory) {
        this.subCategories.add(subCategory);
        subCategory.getOffers().add(this);
        return this;
    }

    public Offer removeSubCategory(SubCategory subCategory) {
        this.subCategories.remove(subCategory);
        subCategory.getOffers().remove(this);
        return this;
    }

    public void setSubCategories(Set<SubCategory> subCategories) {
        this.subCategories = subCategories;
    }

    public Set<ServiceProvider> getServiceProviders() {
        return serviceProviders;
    }

    public Offer serviceProviders(Set<ServiceProvider> serviceProviders) {
        this.serviceProviders = serviceProviders;
        return this;
    }

    public Offer addServiceProvider(ServiceProvider serviceProvider) {
        this.serviceProviders.add(serviceProvider);
        serviceProvider.getOffers().add(this);
        return this;
    }

    public Offer removeServiceProvider(ServiceProvider serviceProvider) {
        this.serviceProviders.remove(serviceProvider);
        serviceProvider.getOffers().remove(this);
        return this;
    }

    public void setServiceProviders(Set<ServiceProvider> serviceProviders) {
        this.serviceProviders = serviceProviders;
    }

    public Set<Date> getActiveDates() {
        return activeDates;
    }

    public Offer activeDates(Set<Date> dates) {
        this.activeDates = dates;
        return this;
    }

    public Offer addActiveDate(Date date) {
        this.activeDates.add(date);
        return this;
    }

    public Offer removeActiveDate(Date date) {
        this.activeDates.remove(date);
        return this;
    }

    public void setActiveDates(Set<Date> dates) {
        this.activeDates = dates;
    }

    public Set<Day> getActiveDays() {
        return activeDays;
    }

    public Offer activeDays(Set<Day> days) {
        this.activeDays = days;
        return this;
    }

    public Offer addActiveDay(Day day) {
        this.activeDays.add(day);
        return this;
    }

    public Offer removeActiveDay(Day day) {
        this.activeDays.remove(day);
        return this;
    }

    public void setActiveDays(Set<Day> days) {
        this.activeDays = days;
    }

    public Affiliate getAffiliate() {
        return affiliate;
    }

    public Offer affiliate(Affiliate affiliate) {
        this.affiliate = affiliate;
        return this;
    }

    public void setAffiliate(Affiliate affiliate) {
        this.affiliate = affiliate;
    }

    public Merchant getMerchant() {
        return merchant;
    }

    public Offer merchant(Merchant merchant) {
        this.merchant = merchant;
        return this;
    }

    public void setMerchant(Merchant merchant) {
        this.merchant = merchant;
    }

    public OfferType getType() {
        return type;
    }

    public Offer type(OfferType offerType) {
        this.type = offerType;
        return this;
    }

    public void setType(OfferType offerType) {
        this.type = offerType;
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
        Offer offer = (Offer) o;
        if (offer.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), offer.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Offer{" + "id=" + getId() + ", name='" + getName() + "'" + ", description='" + getDescription() + "'"
                + ", adminDescription='" + getAdminDescription() + "'" + ", code='" + getCode() + "'" + ", startDate='"
                + getStartDate() + "'" + ", endDate='" + getEndDate() + "'" + ", maximumUsesPerUser="
                + getMaximumUsesPerUser() + ", maximumUsesPerDay=" + getMaximumUsesPerDay() + ", maximumUsesPerWeek="
                + getMaximumUsesPerWeek() + ", maximumUsesPerMonth=" + getMaximumUsesPerMonth()
                + ", maximumUsesPerNumber=" + getMaximumUsesPerNumber() + ", newUserOnly='" + isNewUserOnly() + "'"
                + ", appOnly='" + isAppOnly() + "'" + ", websiteOnly='" + isWebsiteOnly() + "'" + ", numberOfUses="
                + getNumberOfUses() + ", dummy='" + isDummy() + "'"
                + ", apsstrExclusive='" + isApsstrExclusive() + "'" + ", url='" + getUrl() + "'" + "}";
    }
}
