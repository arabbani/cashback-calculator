/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { CbclTestModule } from '../../../test.module';
import { ReturnExtrasDetailComponent } from '../../../../../../main/webapp/app/entities/return-extras/return-extras-detail.component';
import { ReturnExtrasService } from '../../../../../../main/webapp/app/entities/return-extras/return-extras.service';
import { ReturnExtras } from '../../../../../../main/webapp/app/entities/return-extras/return-extras.model';

describe('Component Tests', () => {

    describe('ReturnExtras Management Detail Component', () => {
        let comp: ReturnExtrasDetailComponent;
        let fixture: ComponentFixture<ReturnExtrasDetailComponent>;
        let service: ReturnExtrasService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CbclTestModule],
                declarations: [ReturnExtrasDetailComponent],
                providers: [
                    ReturnExtrasService
                ]
            })
            .overrideTemplate(ReturnExtrasDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ReturnExtrasDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReturnExtrasService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ReturnExtras(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.returnExtras).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
