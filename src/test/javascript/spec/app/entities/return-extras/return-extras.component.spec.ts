/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CbclTestModule } from '../../../test.module';
import { ReturnExtrasComponent } from '../../../../../../main/webapp/app/entities/return-extras/return-extras.component';
import { ReturnExtrasService } from '../../../../../../main/webapp/app/entities/return-extras/return-extras.service';
import { ReturnExtras } from '../../../../../../main/webapp/app/entities/return-extras/return-extras.model';

describe('Component Tests', () => {

    describe('ReturnExtras Management Component', () => {
        let comp: ReturnExtrasComponent;
        let fixture: ComponentFixture<ReturnExtrasComponent>;
        let service: ReturnExtrasService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CbclTestModule],
                declarations: [ReturnExtrasComponent],
                providers: [
                    ReturnExtrasService
                ]
            })
            .overrideTemplate(ReturnExtrasComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ReturnExtrasComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReturnExtrasService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ReturnExtras(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.returnExtras[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
