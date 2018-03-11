/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { CbclTestModule } from '../../../test.module';
import { MainReturnDetailComponent } from '../../../../../../main/webapp/app/entities/main-return/main-return-detail.component';
import { MainReturnService } from '../../../../../../main/webapp/app/entities/main-return/main-return.service';
import { MainReturn } from '../../../../../../main/webapp/app/entities/main-return/main-return.model';

describe('Component Tests', () => {

    describe('MainReturn Management Detail Component', () => {
        let comp: MainReturnDetailComponent;
        let fixture: ComponentFixture<MainReturnDetailComponent>;
        let service: MainReturnService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CbclTestModule],
                declarations: [MainReturnDetailComponent],
                providers: [
                    MainReturnService
                ]
            })
            .overrideTemplate(MainReturnDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MainReturnDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MainReturnService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new MainReturn(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.mainReturn).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
