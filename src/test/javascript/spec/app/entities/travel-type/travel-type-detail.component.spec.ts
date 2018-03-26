/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { CbclTestModule } from '../../../test.module';
import { TravelTypeDetailComponent } from '../../../../../../main/webapp/app/entities/travel-type/travel-type-detail.component';
import { TravelTypeService } from '../../../../../../main/webapp/app/entities/travel-type/travel-type.service';
import { TravelType } from '../../../../../../main/webapp/app/entities/travel-type/travel-type.model';

describe('Component Tests', () => {

    describe('TravelType Management Detail Component', () => {
        let comp: TravelTypeDetailComponent;
        let fixture: ComponentFixture<TravelTypeDetailComponent>;
        let service: TravelTypeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CbclTestModule],
                declarations: [TravelTypeDetailComponent],
                providers: [
                    TravelTypeService
                ]
            })
            .overrideTemplate(TravelTypeDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TravelTypeDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TravelTypeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new TravelType(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.travelType).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
