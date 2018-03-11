/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CbclTestModule } from '../../../test.module';
import { AffiliateCredentialComponent } from '../../../../../../main/webapp/app/entities/affiliate-credential/affiliate-credential.component';
import { AffiliateCredentialService } from '../../../../../../main/webapp/app/entities/affiliate-credential/affiliate-credential.service';
import { AffiliateCredential } from '../../../../../../main/webapp/app/entities/affiliate-credential/affiliate-credential.model';

describe('Component Tests', () => {

    describe('AffiliateCredential Management Component', () => {
        let comp: AffiliateCredentialComponent;
        let fixture: ComponentFixture<AffiliateCredentialComponent>;
        let service: AffiliateCredentialService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CbclTestModule],
                declarations: [AffiliateCredentialComponent],
                providers: [
                    AffiliateCredentialService
                ]
            })
            .overrideTemplate(AffiliateCredentialComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AffiliateCredentialComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AffiliateCredentialService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new AffiliateCredential(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.affiliateCredentials[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
