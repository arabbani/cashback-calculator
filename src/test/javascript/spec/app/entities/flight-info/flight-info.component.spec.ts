/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CbclTestModule } from '../../../test.module';
import { FlightInfoComponent } from '../../../../../../main/webapp/app/entities/flight-info/flight-info.component';
import { FlightInfoService } from '../../../../../../main/webapp/app/entities/flight-info/flight-info.service';
import { FlightInfo } from '../../../../../../main/webapp/app/entities/flight-info/flight-info.model';

describe('Component Tests', () => {

    describe('FlightInfo Management Component', () => {
        let comp: FlightInfoComponent;
        let fixture: ComponentFixture<FlightInfoComponent>;
        let service: FlightInfoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CbclTestModule],
                declarations: [FlightInfoComponent],
                providers: [
                    FlightInfoService
                ]
            })
            .overrideTemplate(FlightInfoComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FlightInfoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FlightInfoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new FlightInfo(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.flightInfos[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
