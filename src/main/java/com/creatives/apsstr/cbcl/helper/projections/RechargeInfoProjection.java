package com.creatives.apsstr.cbcl.helper.projections;

import com.creatives.apsstr.cbcl.domain.Circle;
import com.creatives.apsstr.cbcl.domain.RechargePlanType;

public interface RechargeInfoProjection {

    Long getId();

    Circle getCircles();

    RechargePlanType getRechargePlanTypes();

}
