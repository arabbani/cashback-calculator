/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { CbclTestModule } from '../../../test.module';
import { AffiliateCredentialDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/affiliate-credential/affiliate-credential-delete-dialog.component';
import { AffiliateCredentialService } from '../../../../../../main/webapp/app/entities/affiliate-credential/affiliate-credential.service';

describe('Component Tests', () => {

    describe('AffiliateCredential Management Delete Component', () => {
        let comp: AffiliateCredentialDeleteDialogComponent;
        let fixture: ComponentFixture<AffiliateCredentialDeleteDialogComponent>;
        let service: AffiliateCredentialService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CbclTestModule],
                declarations: [AffiliateCredentialDeleteDialogComponent],
                providers: [
                    AffiliateCredentialService
                ]
            })
            .overrideTemplate(AffiliateCredentialDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AffiliateCredentialDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AffiliateCredentialService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
