/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CbclTestModule } from '../../../test.module';
import { OfferReturnComponent } from '../../../../../../main/webapp/app/entities/offer-return/offer-return.component';
import { OfferReturnService } from '../../../../../../main/webapp/app/entities/offer-return/offer-return.service';
import { OfferReturn } from '../../../../../../main/webapp/app/entities/offer-return/offer-return.model';

describe('Component Tests', () => {

    describe('OfferReturn Management Component', () => {
        let comp: OfferReturnComponent;
        let fixture: ComponentFixture<OfferReturnComponent>;
        let service: OfferReturnService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CbclTestModule],
                declarations: [OfferReturnComponent],
                providers: [
                    OfferReturnService
                ]
            })
            .overrideTemplate(OfferReturnComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OfferReturnComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OfferReturnService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new OfferReturn(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.offerReturns[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
