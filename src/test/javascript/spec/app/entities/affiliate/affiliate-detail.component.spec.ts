/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { CbclTestModule } from '../../../test.module';
import { AffiliateDetailComponent } from '../../../../../../main/webapp/app/entities/affiliate/affiliate-detail.component';
import { AffiliateService } from '../../../../../../main/webapp/app/entities/affiliate/affiliate.service';
import { Affiliate } from '../../../../../../main/webapp/app/entities/affiliate/affiliate.model';

describe('Component Tests', () => {

    describe('Affiliate Management Detail Component', () => {
        let comp: AffiliateDetailComponent;
        let fixture: ComponentFixture<AffiliateDetailComponent>;
        let service: AffiliateService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CbclTestModule],
                declarations: [AffiliateDetailComponent],
                providers: [
                    AffiliateService
                ]
            })
            .overrideTemplate(AffiliateDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AffiliateDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AffiliateService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Affiliate(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.affiliate).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
