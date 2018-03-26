/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { CbclTestModule } from '../../../test.module';
import { DateDetailComponent } from '../../../../../../main/webapp/app/entities/date/date-detail.component';
import { DateService } from '../../../../../../main/webapp/app/entities/date/date.service';
import { Date } from '../../../../../../main/webapp/app/entities/date/date.model';

describe('Component Tests', () => {

    describe('Date Management Detail Component', () => {
        let comp: DateDetailComponent;
        let fixture: ComponentFixture<DateDetailComponent>;
        let service: DateService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CbclTestModule],
                declarations: [DateDetailComponent],
                providers: [
                    DateService
                ]
            })
            .overrideTemplate(DateDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DateDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DateService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Date(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.date).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
