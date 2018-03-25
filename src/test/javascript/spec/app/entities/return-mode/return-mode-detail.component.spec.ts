/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { CbclTestModule } from '../../../test.module';
import { ReturnModeDetailComponent } from '../../../../../../main/webapp/app/entities/return-mode/return-mode-detail.component';
import { ReturnModeService } from '../../../../../../main/webapp/app/entities/return-mode/return-mode.service';
import { ReturnMode } from '../../../../../../main/webapp/app/entities/return-mode/return-mode.model';

describe('Component Tests', () => {

    describe('ReturnMode Management Detail Component', () => {
        let comp: ReturnModeDetailComponent;
        let fixture: ComponentFixture<ReturnModeDetailComponent>;
        let service: ReturnModeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CbclTestModule],
                declarations: [ReturnModeDetailComponent],
                providers: [
                    ReturnModeService
                ]
            })
            .overrideTemplate(ReturnModeDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ReturnModeDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReturnModeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ReturnMode(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.returnMode).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
