/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { CbclTestModule } from '../../../test.module';
import { ReechargePlanTypeDetailComponent } from '../../../../../../main/webapp/app/entities/reecharge-plan-type/reecharge-plan-type-detail.component';
import { ReechargePlanTypeService } from '../../../../../../main/webapp/app/entities/reecharge-plan-type/reecharge-plan-type.service';
import { ReechargePlanType } from '../../../../../../main/webapp/app/entities/reecharge-plan-type/reecharge-plan-type.model';

describe('Component Tests', () => {

    describe('ReechargePlanType Management Detail Component', () => {
        let comp: ReechargePlanTypeDetailComponent;
        let fixture: ComponentFixture<ReechargePlanTypeDetailComponent>;
        let service: ReechargePlanTypeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CbclTestModule],
                declarations: [ReechargePlanTypeDetailComponent],
                providers: [
                    ReechargePlanTypeService
                ]
            })
            .overrideTemplate(ReechargePlanTypeDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ReechargePlanTypeDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReechargePlanTypeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ReechargePlanType(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.reechargePlanType).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
