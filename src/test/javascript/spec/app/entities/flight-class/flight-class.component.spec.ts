/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CbclTestModule } from '../../../test.module';
import { FlightClassComponent } from '../../../../../../main/webapp/app/entities/flight-class/flight-class.component';
import { FlightClassService } from '../../../../../../main/webapp/app/entities/flight-class/flight-class.service';
import { FlightClass } from '../../../../../../main/webapp/app/entities/flight-class/flight-class.model';

describe('Component Tests', () => {

    describe('FlightClass Management Component', () => {
        let comp: FlightClassComponent;
        let fixture: ComponentFixture<FlightClassComponent>;
        let service: FlightClassService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CbclTestModule],
                declarations: [FlightClassComponent],
                providers: [
                    FlightClassService
                ]
            })
            .overrideTemplate(FlightClassComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FlightClassComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FlightClassService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new FlightClass(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.flightClasses[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
