/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CbclTestModule } from '../../../test.module';
import { CircleComponent } from '../../../../../../main/webapp/app/entities/circle/circle.component';
import { CircleService } from '../../../../../../main/webapp/app/entities/circle/circle.service';
import { Circle } from '../../../../../../main/webapp/app/entities/circle/circle.model';

describe('Component Tests', () => {

    describe('Circle Management Component', () => {
        let comp: CircleComponent;
        let fixture: ComponentFixture<CircleComponent>;
        let service: CircleService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CbclTestModule],
                declarations: [CircleComponent],
                providers: [
                    CircleService
                ]
            })
            .overrideTemplate(CircleComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CircleComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CircleService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Circle(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.circles[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
