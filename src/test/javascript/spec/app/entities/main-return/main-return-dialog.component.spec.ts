/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { CbclTestModule } from '../../../test.module';
import { MainReturnDialogComponent } from '../../../../../../main/webapp/app/entities/main-return/main-return-dialog.component';
import { MainReturnService } from '../../../../../../main/webapp/app/entities/main-return/main-return.service';
import { MainReturn } from '../../../../../../main/webapp/app/entities/main-return/main-return.model';
import { ReturnModeService } from '../../../../../../main/webapp/app/entities/return-mode';
import { CardService } from '../../../../../../main/webapp/app/entities/card';

describe('Component Tests', () => {

    describe('MainReturn Management Dialog Component', () => {
        let comp: MainReturnDialogComponent;
        let fixture: ComponentFixture<MainReturnDialogComponent>;
        let service: MainReturnService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CbclTestModule],
                declarations: [MainReturnDialogComponent],
                providers: [
                    ReturnModeService,
                    CardService,
                    MainReturnService
                ]
            })
            .overrideTemplate(MainReturnDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MainReturnDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MainReturnService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new MainReturn(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.mainReturn = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'mainReturnListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new MainReturn();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.mainReturn = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'mainReturnListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
