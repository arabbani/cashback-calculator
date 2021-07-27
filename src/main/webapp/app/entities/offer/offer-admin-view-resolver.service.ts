import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Offer, OfferService } from '.';

@Injectable()
export class OfferAdminViewResolver implements Resolve<Offer> {

  constructor(private offerService: OfferService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Offer> {
    const id = route.paramMap.get('id');
    if (id) {
      return this.offerService.findOneForAdminView(+id).take(1).map((offer) => {
        if (offer) {
          return offer.body;
        } else {
          this.router.navigate(['/offers']);
          return null;
        }
      });
    } else {
      return null;
    }
  }

}
