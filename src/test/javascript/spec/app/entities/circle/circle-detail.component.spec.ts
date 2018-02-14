/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { CbclTestModule } from '../../../test.module';
import { CircleDetailComponent } from '../../../../../../main/webapp/app/entities/circle/circle-detail.component';
import { CircleService } from '../../../../../../main/webapp/app/entities/circle/circle.service';
import { Circle } from '../../../../../../main/webapp/app/entities/circle/circle.model';

describe('Component Tests', () => {

    describe('Circle Management Detail Component', () => {
        let comp: CircleDetailComponent;
        let fixture: ComponentFixture<CircleDetailComponent>;
        let service: CircleService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CbclTestModule],
                declarations: [CircleDetailComponent],
                providers: [
                    CircleService
                ]
            })
            .overrideTemplate(CircleDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CircleDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CircleService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Circle(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.circle).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
