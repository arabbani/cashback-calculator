/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { CbclTestModule } from '../../../test.module';
import { TravelInfoDialogComponent } from '../../../../../../main/webapp/app/entities/travel-info/travel-info-dialog.component';
import { TravelInfoService } from '../../../../../../main/webapp/app/entities/travel-info/travel-info.service';
import { TravelInfo } from '../../../../../../main/webapp/app/entities/travel-info/travel-info.model';
import { TravelTypeService } from '../../../../../../main/webapp/app/entities/travel-type';
import { RegionService } from '../../../../../../main/webapp/app/entities/region';

describe('Component Tests', () => {

    describe('TravelInfo Management Dialog Component', () => {
        let comp: TravelInfoDialogComponent;
        let fixture: ComponentFixture<TravelInfoDialogComponent>;
        let service: TravelInfoService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CbclTestModule],
                declarations: [TravelInfoDialogComponent],
                providers: [
                    TravelTypeService,
                    RegionService,
                    TravelInfoService
                ]
            })
            .overrideTemplate(TravelInfoDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TravelInfoDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TravelInfoService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TravelInfo(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.travelInfo = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'travelInfoListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TravelInfo();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.travelInfo = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'travelInfoListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
