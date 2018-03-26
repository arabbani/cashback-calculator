/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { CbclTestModule } from '../../../test.module';
import { ReechargePlanTypeDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/reecharge-plan-type/reecharge-plan-type-delete-dialog.component';
import { ReechargePlanTypeService } from '../../../../../../main/webapp/app/entities/reecharge-plan-type/reecharge-plan-type.service';

describe('Component Tests', () => {

    describe('ReechargePlanType Management Delete Component', () => {
        let comp: ReechargePlanTypeDeleteDialogComponent;
        let fixture: ComponentFixture<ReechargePlanTypeDeleteDialogComponent>;
        let service: ReechargePlanTypeService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CbclTestModule],
                declarations: [ReechargePlanTypeDeleteDialogComponent],
                providers: [
                    ReechargePlanTypeService
                ]
            })
            .overrideTemplate(ReechargePlanTypeDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ReechargePlanTypeDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReechargePlanTypeService);
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
