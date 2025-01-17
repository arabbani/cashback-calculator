/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CbclTestModule } from '../../../test.module';
import { OfferComponent } from '../../../../../../main/webapp/app/entities/offer/offer.component';
import { OfferService } from '../../../../../../main/webapp/app/entities/offer/offer.service';
import { Offer } from '../../../../../../main/webapp/app/entities/offer/offer.model';

describe('Component Tests', () => {

    describe('Offer Management Component', () => {
        let comp: OfferComponent;
        let fixture: ComponentFixture<OfferComponent>;
        let service: OfferService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CbclTestModule],
                declarations: [OfferComponent],
                providers: [
                    OfferService
                ]
            })
            .overrideTemplate(OfferComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OfferComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OfferService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'findAll').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Offer(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.findAll).toHaveBeenCalled();
                expect(comp.offers[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
