/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { CbclTestModule } from '../../../test.module';
import { OfferPolicyDetailComponent } from '../../../../../../main/webapp/app/entities/offer-policy/offer-policy-detail.component';
import { OfferPolicyService } from '../../../../../../main/webapp/app/entities/offer-policy/offer-policy.service';
import { OfferPolicy } from '../../../../../../main/webapp/app/entities/offer-policy/offer-policy.model';

describe('Component Tests', () => {

    describe('OfferPolicy Management Detail Component', () => {
        let comp: OfferPolicyDetailComponent;
        let fixture: ComponentFixture<OfferPolicyDetailComponent>;
        let service: OfferPolicyService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CbclTestModule],
                declarations: [OfferPolicyDetailComponent],
                providers: [
                    OfferPolicyService
                ]
            })
            .overrideTemplate(OfferPolicyDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OfferPolicyDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OfferPolicyService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new OfferPolicy(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.offerPolicy).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
