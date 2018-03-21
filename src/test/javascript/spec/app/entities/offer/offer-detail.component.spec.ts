/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { CbclTestModule } from '../../../test.module';
import { OfferDetailComponent } from '../../../../../../main/webapp/app/entities/offer/offer-detail.component';
import { OfferService } from '../../../../../../main/webapp/app/entities/offer/offer.service';
import { Offer } from '../../../../../../main/webapp/app/entities/offer/offer.model';

describe('Component Tests', () => {

    describe('Offer Management Detail Component', () => {
        let comp: OfferDetailComponent;
        let fixture: ComponentFixture<OfferDetailComponent>;
        let service: OfferService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CbclTestModule],
                declarations: [OfferDetailComponent],
                providers: [
                    OfferService
                ]
            })
            .overrideTemplate(OfferDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OfferDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OfferService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Offer(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.offer).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
