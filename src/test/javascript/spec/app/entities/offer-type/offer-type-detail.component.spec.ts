/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { CbclTestModule } from '../../../test.module';
import { OfferTypeDetailComponent } from '../../../../../../main/webapp/app/entities/offer-type/offer-type-detail.component';
import { OfferTypeService } from '../../../../../../main/webapp/app/entities/offer-type/offer-type.service';
import { OfferType } from '../../../../../../main/webapp/app/entities/offer-type/offer-type.model';

describe('Component Tests', () => {

    describe('OfferType Management Detail Component', () => {
        let comp: OfferTypeDetailComponent;
        let fixture: ComponentFixture<OfferTypeDetailComponent>;
        let service: OfferTypeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CbclTestModule],
                declarations: [OfferTypeDetailComponent],
                providers: [
                    OfferTypeService
                ]
            })
            .overrideTemplate(OfferTypeDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OfferTypeDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OfferTypeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new OfferType(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.offerType).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
