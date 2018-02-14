/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CbclTestModule } from '../../../test.module';
import { OperatingSystemComponent } from '../../../../../../main/webapp/app/entities/operating-system/operating-system.component';
import { OperatingSystemService } from '../../../../../../main/webapp/app/entities/operating-system/operating-system.service';
import { OperatingSystem } from '../../../../../../main/webapp/app/entities/operating-system/operating-system.model';

describe('Component Tests', () => {

    describe('OperatingSystem Management Component', () => {
        let comp: OperatingSystemComponent;
        let fixture: ComponentFixture<OperatingSystemComponent>;
        let service: OperatingSystemService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CbclTestModule],
                declarations: [OperatingSystemComponent],
                providers: [
                    OperatingSystemService
                ]
            })
            .overrideTemplate(OperatingSystemComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OperatingSystemComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OperatingSystemService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new OperatingSystem(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.operatingSystems[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
