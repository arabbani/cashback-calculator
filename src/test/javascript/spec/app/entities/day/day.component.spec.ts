/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CbclTestModule } from '../../../test.module';
import { DayComponent } from '../../../../../../main/webapp/app/entities/day/day.component';
import { DayService } from '../../../../../../main/webapp/app/entities/day/day.service';
import { Day } from '../../../../../../main/webapp/app/entities/day/day.model';

describe('Component Tests', () => {

    describe('Day Management Component', () => {
        let comp: DayComponent;
        let fixture: ComponentFixture<DayComponent>;
        let service: DayService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CbclTestModule],
                declarations: [DayComponent],
                providers: [
                    DayService
                ]
            })
            .overrideTemplate(DayComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DayComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DayService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'findAll').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Day(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.findAll).toHaveBeenCalled();
                expect(comp.days[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
