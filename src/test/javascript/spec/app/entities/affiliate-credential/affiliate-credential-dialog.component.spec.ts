/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { CbclTestModule } from '../../../test.module';
import { AffiliateCredentialDialogComponent } from '../../../../../../main/webapp/app/entities/affiliate-credential/affiliate-credential-dialog.component';
import { AffiliateCredentialService } from '../../../../../../main/webapp/app/entities/affiliate-credential/affiliate-credential.service';
import { AffiliateCredential } from '../../../../../../main/webapp/app/entities/affiliate-credential/affiliate-credential.model';
import { AffiliateService } from '../../../../../../main/webapp/app/entities/affiliate';

describe('Component Tests', () => {

    describe('AffiliateCredential Management Dialog Component', () => {
        let comp: AffiliateCredentialDialogComponent;
        let fixture: ComponentFixture<AffiliateCredentialDialogComponent>;
        let service: AffiliateCredentialService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CbclTestModule],
                declarations: [AffiliateCredentialDialogComponent],
                providers: [
                    AffiliateService,
                    AffiliateCredentialService
                ]
            })
            .overrideTemplate(AffiliateCredentialDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AffiliateCredentialDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AffiliateCredentialService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new AffiliateCredential(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.affiliateCredential = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'affiliateCredentialListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new AffiliateCredential();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.affiliateCredential = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'affiliateCredentialListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
