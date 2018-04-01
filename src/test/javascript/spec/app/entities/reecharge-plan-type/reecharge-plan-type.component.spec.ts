/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CbclTestModule } from '../../../test.module';
import { ReechargePlanTypeComponent } from '../../../../../../main/webapp/app/entities/reecharge-plan-type/reecharge-plan-type.component';
import { ReechargePlanTypeService } from '../../../../../../main/webapp/app/entities/reecharge-plan-type/reecharge-plan-type.service';
import { ReechargePlanType } from '../../../../../../main/webapp/app/entities/reecharge-plan-type/reecharge-plan-type.model';

describe('Component Tests', () => {

    describe('ReechargePlanType Management Component', () => {
        let comp: ReechargePlanTypeComponent;
        let fixture: ComponentFixture<ReechargePlanTypeComponent>;
        let service: ReechargePlanTypeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CbclTestModule],
                declarations: [ReechargePlanTypeComponent],
                providers: [
                    ReechargePlanTypeService
                ]
            })
            .overrideTemplate(ReechargePlanTypeComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ReechargePlanTypeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReechargePlanTypeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'findAll').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ReechargePlanType(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.findAll).toHaveBeenCalled();
                expect(comp.reechargePlanTypes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
