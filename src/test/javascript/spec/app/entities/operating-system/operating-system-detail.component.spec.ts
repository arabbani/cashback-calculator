/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { CbclTestModule } from '../../../test.module';
import { OperatingSystemDetailComponent } from '../../../../../../main/webapp/app/entities/operating-system/operating-system-detail.component';
import { OperatingSystemService } from '../../../../../../main/webapp/app/entities/operating-system/operating-system.service';
import { OperatingSystem } from '../../../../../../main/webapp/app/entities/operating-system/operating-system.model';

describe('Component Tests', () => {

    describe('OperatingSystem Management Detail Component', () => {
        let comp: OperatingSystemDetailComponent;
        let fixture: ComponentFixture<OperatingSystemDetailComponent>;
        let service: OperatingSystemService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CbclTestModule],
                declarations: [OperatingSystemDetailComponent],
                providers: [
                    OperatingSystemService
                ]
            })
            .overrideTemplate(OperatingSystemDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OperatingSystemDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OperatingSystemService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new OperatingSystem(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.operatingSystem).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
