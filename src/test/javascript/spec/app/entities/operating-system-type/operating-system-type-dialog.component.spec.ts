/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { CbclTestModule } from '../../../test.module';
import { OperatingSystemTypeDialogComponent } from '../../../../../../main/webapp/app/entities/operating-system-type/operating-system-type-dialog.component';
import { OperatingSystemTypeService } from '../../../../../../main/webapp/app/entities/operating-system-type/operating-system-type.service';
import { OperatingSystemType } from '../../../../../../main/webapp/app/entities/operating-system-type/operating-system-type.model';

describe('Component Tests', () => {

    describe('OperatingSystemType Management Dialog Component', () => {
        let comp: OperatingSystemTypeDialogComponent;
        let fixture: ComponentFixture<OperatingSystemTypeDialogComponent>;
        let service: OperatingSystemTypeService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CbclTestModule],
                declarations: [OperatingSystemTypeDialogComponent],
                providers: [
                    OperatingSystemTypeService
                ]
            })
            .overrideTemplate(OperatingSystemTypeDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OperatingSystemTypeDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OperatingSystemTypeService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new OperatingSystemType(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.operatingSystemType = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'operatingSystemTypeListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new OperatingSystemType();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.operatingSystemType = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'operatingSystemTypeListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
