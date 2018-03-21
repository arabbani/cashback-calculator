/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { CbclTestModule } from '../../../test.module';
import { TravelInfoDetailComponent } from '../../../../../../main/webapp/app/entities/travel-info/travel-info-detail.component';
import { TravelInfoService } from '../../../../../../main/webapp/app/entities/travel-info/travel-info.service';
import { TravelInfo } from '../../../../../../main/webapp/app/entities/travel-info/travel-info.model';

describe('Component Tests', () => {

    describe('TravelInfo Management Detail Component', () => {
        let comp: TravelInfoDetailComponent;
        let fixture: ComponentFixture<TravelInfoDetailComponent>;
        let service: TravelInfoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CbclTestModule],
                declarations: [TravelInfoDetailComponent],
                providers: [
                    TravelInfoService
                ]
            })
            .overrideTemplate(TravelInfoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TravelInfoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TravelInfoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new TravelInfo(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.travelInfo).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
