/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CbclTestModule } from '../../../test.module';
import { AffiliateComponent } from '../../../../../../main/webapp/app/entities/affiliate/affiliate.component';
import { AffiliateService } from '../../../../../../main/webapp/app/entities/affiliate/affiliate.service';
import { Affiliate } from '../../../../../../main/webapp/app/entities/affiliate/affiliate.model';

describe('Component Tests', () => {

    describe('Affiliate Management Component', () => {
        let comp: AffiliateComponent;
        let fixture: ComponentFixture<AffiliateComponent>;
        let service: AffiliateService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CbclTestModule],
                declarations: [AffiliateComponent],
                providers: [
                    AffiliateService
                ]
            })
            .overrideTemplate(AffiliateComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AffiliateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AffiliateService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Affiliate(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.affiliates[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
