/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { CbclTestModule } from '../../../test.module';
import { AffiliateCredentialDetailComponent } from '../../../../../../main/webapp/app/entities/affiliate-credential/affiliate-credential-detail.component';
import { AffiliateCredentialService } from '../../../../../../main/webapp/app/entities/affiliate-credential/affiliate-credential.service';
import { AffiliateCredential } from '../../../../../../main/webapp/app/entities/affiliate-credential/affiliate-credential.model';

describe('Component Tests', () => {

    describe('AffiliateCredential Management Detail Component', () => {
        let comp: AffiliateCredentialDetailComponent;
        let fixture: ComponentFixture<AffiliateCredentialDetailComponent>;
        let service: AffiliateCredentialService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CbclTestModule],
                declarations: [AffiliateCredentialDetailComponent],
                providers: [
                    AffiliateCredentialService
                ]
            })
            .overrideTemplate(AffiliateCredentialDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AffiliateCredentialDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AffiliateCredentialService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new AffiliateCredential(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.affiliateCredential).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
