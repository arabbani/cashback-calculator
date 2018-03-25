/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { CbclTestModule } from '../../../test.module';
import { FlightClassDetailComponent } from '../../../../../../main/webapp/app/entities/flight-class/flight-class-detail.component';
import { FlightClassService } from '../../../../../../main/webapp/app/entities/flight-class/flight-class.service';
import { FlightClass } from '../../../../../../main/webapp/app/entities/flight-class/flight-class.model';

describe('Component Tests', () => {

    describe('FlightClass Management Detail Component', () => {
        let comp: FlightClassDetailComponent;
        let fixture: ComponentFixture<FlightClassDetailComponent>;
        let service: FlightClassService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CbclTestModule],
                declarations: [FlightClassDetailComponent],
                providers: [
                    FlightClassService
                ]
            })
            .overrideTemplate(FlightClassDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FlightClassDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FlightClassService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new FlightClass(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.flightClass).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
