/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { CbclTestModule } from '../../../test.module';
import { OperatingSystemTypeDetailComponent } from '../../../../../../main/webapp/app/entities/operating-system-type/operating-system-type-detail.component';
import { OperatingSystemTypeService } from '../../../../../../main/webapp/app/entities/operating-system-type/operating-system-type.service';
import { OperatingSystemType } from '../../../../../../main/webapp/app/entities/operating-system-type/operating-system-type.model';

describe('Component Tests', () => {

    describe('OperatingSystemType Management Detail Component', () => {
        let comp: OperatingSystemTypeDetailComponent;
        let fixture: ComponentFixture<OperatingSystemTypeDetailComponent>;
        let service: OperatingSystemTypeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CbclTestModule],
                declarations: [OperatingSystemTypeDetailComponent],
                providers: [
                    OperatingSystemTypeService
                ]
            })
            .overrideTemplate(OperatingSystemTypeDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OperatingSystemTypeDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OperatingSystemTypeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new OperatingSystemType(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.operatingSystemType).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
