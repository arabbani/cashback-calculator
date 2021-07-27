/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CbclTestModule } from '../../../test.module';
import { ReturnModeComponent } from '../../../../../../main/webapp/app/entities/return-mode/return-mode.component';
import { ReturnModeService } from '../../../../../../main/webapp/app/entities/return-mode/return-mode.service';
import { ReturnMode } from '../../../../../../main/webapp/app/entities/return-mode/return-mode.model';

describe('Component Tests', () => {

    describe('ReturnMode Management Component', () => {
        let comp: ReturnModeComponent;
        let fixture: ComponentFixture<ReturnModeComponent>;
        let service: ReturnModeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CbclTestModule],
                declarations: [ReturnModeComponent],
                providers: [
                    ReturnModeService
                ]
            })
            .overrideTemplate(ReturnModeComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ReturnModeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReturnModeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'findAll').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ReturnMode(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.findAll).toHaveBeenCalled();
                expect(comp.returnModes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
