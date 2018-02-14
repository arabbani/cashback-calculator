/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { CbclTestModule } from '../../../test.module';
import { OperatingSystemTypeDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/operating-system-type/operating-system-type-delete-dialog.component';
import { OperatingSystemTypeService } from '../../../../../../main/webapp/app/entities/operating-system-type/operating-system-type.service';

describe('Component Tests', () => {

    describe('OperatingSystemType Management Delete Component', () => {
        let comp: OperatingSystemTypeDeleteDialogComponent;
        let fixture: ComponentFixture<OperatingSystemTypeDeleteDialogComponent>;
        let service: OperatingSystemTypeService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CbclTestModule],
                declarations: [OperatingSystemTypeDeleteDialogComponent],
                providers: [
                    OperatingSystemTypeService
                ]
            })
            .overrideTemplate(OperatingSystemTypeDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OperatingSystemTypeDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OperatingSystemTypeService);
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
