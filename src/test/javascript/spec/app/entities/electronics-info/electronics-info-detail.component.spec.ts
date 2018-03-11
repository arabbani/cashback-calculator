/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { CbclTestModule } from '../../../test.module';
import { ElectronicsInfoDetailComponent } from '../../../../../../main/webapp/app/entities/electronics-info/electronics-info-detail.component';
import { ElectronicsInfoService } from '../../../../../../main/webapp/app/entities/electronics-info/electronics-info.service';
import { ElectronicsInfo } from '../../../../../../main/webapp/app/entities/electronics-info/electronics-info.model';

describe('Component Tests', () => {

    describe('ElectronicsInfo Management Detail Component', () => {
        let comp: ElectronicsInfoDetailComponent;
        let fixture: ComponentFixture<ElectronicsInfoDetailComponent>;
        let service: ElectronicsInfoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CbclTestModule],
                declarations: [ElectronicsInfoDetailComponent],
                providers: [
                    ElectronicsInfoService
                ]
            })
            .overrideTemplate(ElectronicsInfoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ElectronicsInfoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ElectronicsInfoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ElectronicsInfo(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.electronicsInfo).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
