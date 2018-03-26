/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CbclTestModule } from '../../../test.module';
import { ElectronicsInfoComponent } from '../../../../../../main/webapp/app/entities/electronics-info/electronics-info.component';
import { ElectronicsInfoService } from '../../../../../../main/webapp/app/entities/electronics-info/electronics-info.service';
import { ElectronicsInfo } from '../../../../../../main/webapp/app/entities/electronics-info/electronics-info.model';

describe('Component Tests', () => {

    describe('ElectronicsInfo Management Component', () => {
        let comp: ElectronicsInfoComponent;
        let fixture: ComponentFixture<ElectronicsInfoComponent>;
        let service: ElectronicsInfoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CbclTestModule],
                declarations: [ElectronicsInfoComponent],
                providers: [
                    ElectronicsInfoService
                ]
            })
            .overrideTemplate(ElectronicsInfoComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ElectronicsInfoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ElectronicsInfoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ElectronicsInfo(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.electronicsInfos[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
