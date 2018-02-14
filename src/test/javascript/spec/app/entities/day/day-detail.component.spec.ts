/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { CbclTestModule } from '../../../test.module';
import { DayDetailComponent } from '../../../../../../main/webapp/app/entities/day/day-detail.component';
import { DayService } from '../../../../../../main/webapp/app/entities/day/day.service';
import { Day } from '../../../../../../main/webapp/app/entities/day/day.model';

describe('Component Tests', () => {

    describe('Day Management Detail Component', () => {
        let comp: DayDetailComponent;
        let fixture: ComponentFixture<DayDetailComponent>;
        let service: DayService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CbclTestModule],
                declarations: [DayDetailComponent],
                providers: [
                    DayService
                ]
            })
            .overrideTemplate(DayDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DayDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DayService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Day(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.day).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
