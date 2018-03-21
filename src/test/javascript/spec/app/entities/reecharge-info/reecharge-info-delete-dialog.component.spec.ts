/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { CbclTestModule } from '../../../test.module';
import { ReechargeInfoDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/reecharge-info/reecharge-info-delete-dialog.component';
import { ReechargeInfoService } from '../../../../../../main/webapp/app/entities/reecharge-info/reecharge-info.service';

describe('Component Tests', () => {

    describe('ReechargeInfo Management Delete Component', () => {
        let comp: ReechargeInfoDeleteDialogComponent;
        let fixture: ComponentFixture<ReechargeInfoDeleteDialogComponent>;
        let service: ReechargeInfoService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CbclTestModule],
                declarations: [ReechargeInfoDeleteDialogComponent],
                providers: [
                    ReechargeInfoService
                ]
            })
            .overrideTemplate(ReechargeInfoDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ReechargeInfoDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReechargeInfoService);
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
