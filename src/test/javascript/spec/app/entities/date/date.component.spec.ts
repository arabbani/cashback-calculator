/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CbclTestModule } from '../../../test.module';
import { DateComponent } from '../../../../../../main/webapp/app/entities/date/date.component';
import { DateService } from '../../../../../../main/webapp/app/entities/date/date.service';
import { Date } from '../../../../../../main/webapp/app/entities/date/date.model';

describe('Component Tests', () => {

    describe('Date Management Component', () => {
        let comp: DateComponent;
        let fixture: ComponentFixture<DateComponent>;
        let service: DateService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CbclTestModule],
                declarations: [DateComponent],
                providers: [
                    DateService
                ]
            })
            .overrideTemplate(DateComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DateService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Date(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.dates[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
