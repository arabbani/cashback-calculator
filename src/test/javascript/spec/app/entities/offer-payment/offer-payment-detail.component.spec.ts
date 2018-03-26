/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { CbclTestModule } from '../../../test.module';
import { OfferPaymentDetailComponent } from '../../../../../../main/webapp/app/entities/offer-payment/offer-payment-detail.component';
import { OfferPaymentService } from '../../../../../../main/webapp/app/entities/offer-payment/offer-payment.service';
import { OfferPayment } from '../../../../../../main/webapp/app/entities/offer-payment/offer-payment.model';

describe('Component Tests', () => {

    describe('OfferPayment Management Detail Component', () => {
        let comp: OfferPaymentDetailComponent;
        let fixture: ComponentFixture<OfferPaymentDetailComponent>;
        let service: OfferPaymentService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CbclTestModule],
                declarations: [OfferPaymentDetailComponent],
                providers: [
                    OfferPaymentService
                ]
            })
            .overrideTemplate(OfferPaymentDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OfferPaymentDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OfferPaymentService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new OfferPayment(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.offerPayment).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
