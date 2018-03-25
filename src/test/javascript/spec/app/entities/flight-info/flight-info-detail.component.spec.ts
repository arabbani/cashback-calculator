/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { CbclTestModule } from '../../../test.module';
import { FlightInfoDetailComponent } from '../../../../../../main/webapp/app/entities/flight-info/flight-info-detail.component';
import { FlightInfoService } from '../../../../../../main/webapp/app/entities/flight-info/flight-info.service';
import { FlightInfo } from '../../../../../../main/webapp/app/entities/flight-info/flight-info.model';

describe('Component Tests', () => {

    describe('FlightInfo Management Detail Component', () => {
        let comp: FlightInfoDetailComponent;
        let fixture: ComponentFixture<FlightInfoDetailComponent>;
        let service: FlightInfoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CbclTestModule],
                declarations: [FlightInfoDetailComponent],
                providers: [
                    FlightInfoService
                ]
            })
            .overrideTemplate(FlightInfoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FlightInfoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FlightInfoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new FlightInfo(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.flightInfo).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
