package com.creatives.apsstr.cbcl.helper.projections;

import com.creatives.apsstr.cbcl.domain.ElectronicsInfo;
import com.creatives.apsstr.cbcl.domain.RechargeInfo;
import com.creatives.apsstr.cbcl.domain.TravelInfo;

public interface OfferWithInfo {

    Long getId();

    RechargeInfo getRechargeInfo();

    TravelInfo getTravelInfo();

    ElectronicsInfo getElectronicsInfo();

}
