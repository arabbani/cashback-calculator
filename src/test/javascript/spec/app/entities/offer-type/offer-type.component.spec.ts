/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CbclTestModule } from '../../../test.module';
import { OfferTypeComponent } from '../../../../../../main/webapp/app/entities/offer-type/offer-type.component';
import { OfferTypeService } from '../../../../../../main/webapp/app/entities/offer-type/offer-type.service';
import { OfferType } from '../../../../../../main/webapp/app/entities/offer-type/offer-type.model';

describe('Component Tests', () => {

    describe('OfferType Management Component', () => {
        let comp: OfferTypeComponent;
        let fixture: ComponentFixture<OfferTypeComponent>;
        let service: OfferTypeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CbclTestModule],
                declarations: [OfferTypeComponent],
                providers: [
                    OfferTypeService
                ]
            })
            .overrideTemplate(OfferTypeComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OfferTypeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OfferTypeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new OfferType(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.offerTypes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
