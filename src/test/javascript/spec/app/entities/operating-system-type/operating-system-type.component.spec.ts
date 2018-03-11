/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CbclTestModule } from '../../../test.module';
import { OperatingSystemTypeComponent } from '../../../../../../main/webapp/app/entities/operating-system-type/operating-system-type.component';
import { OperatingSystemTypeService } from '../../../../../../main/webapp/app/entities/operating-system-type/operating-system-type.service';
import { OperatingSystemType } from '../../../../../../main/webapp/app/entities/operating-system-type/operating-system-type.model';

describe('Component Tests', () => {

    describe('OperatingSystemType Management Component', () => {
        let comp: OperatingSystemTypeComponent;
        let fixture: ComponentFixture<OperatingSystemTypeComponent>;
        let service: OperatingSystemTypeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CbclTestModule],
                declarations: [OperatingSystemTypeComponent],
                providers: [
                    OperatingSystemTypeService
                ]
            })
            .overrideTemplate(OperatingSystemTypeComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OperatingSystemTypeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OperatingSystemTypeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new OperatingSystemType(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.operatingSystemTypes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
