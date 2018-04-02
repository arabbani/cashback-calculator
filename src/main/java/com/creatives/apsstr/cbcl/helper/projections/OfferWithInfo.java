package com.creatives.apsstr.cbcl.helper.projections;

import com.creatives.apsstr.cbcl.domain.ElectronicsInfo;
import com.creatives.apsstr.cbcl.domain.ReechargeInfo;
import com.creatives.apsstr.cbcl.domain.TravelInfo;

public interface OfferWithInfo {

    Long getId();

    ReechargeInfo getReechargeInfo();

    TravelInfo getTravelInfo();

    ElectronicsInfo getElectronicsInfo();

}
