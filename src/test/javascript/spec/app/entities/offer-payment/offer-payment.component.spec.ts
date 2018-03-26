/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CbclTestModule } from '../../../test.module';
import { OfferPaymentComponent } from '../../../../../../main/webapp/app/entities/offer-payment/offer-payment.component';
import { OfferPaymentService } from '../../../../../../main/webapp/app/entities/offer-payment/offer-payment.service';
import { OfferPayment } from '../../../../../../main/webapp/app/entities/offer-payment/offer-payment.model';

describe('Component Tests', () => {

    describe('OfferPayment Management Component', () => {
        let comp: OfferPaymentComponent;
        let fixture: ComponentFixture<OfferPaymentComponent>;
        let service: OfferPaymentService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CbclTestModule],
                declarations: [OfferPaymentComponent],
                providers: [
                    OfferPaymentService
                ]
            })
            .overrideTemplate(OfferPaymentComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OfferPaymentComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OfferPaymentService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new OfferPayment(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.offerPayments[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
