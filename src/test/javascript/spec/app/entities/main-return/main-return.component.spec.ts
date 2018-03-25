/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CbclTestModule } from '../../../test.module';
import { MainReturnComponent } from '../../../../../../main/webapp/app/entities/main-return/main-return.component';
import { MainReturnService } from '../../../../../../main/webapp/app/entities/main-return/main-return.service';
import { MainReturn } from '../../../../../../main/webapp/app/entities/main-return/main-return.model';

describe('Component Tests', () => {

    describe('MainReturn Management Component', () => {
        let comp: MainReturnComponent;
        let fixture: ComponentFixture<MainReturnComponent>;
        let service: MainReturnService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CbclTestModule],
                declarations: [MainReturnComponent],
                providers: [
                    MainReturnService
                ]
            })
            .overrideTemplate(MainReturnComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MainReturnComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MainReturnService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new MainReturn(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.mainReturns[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
