/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CbclTestModule } from '../../../test.module';
import { ServiceProviderComponent } from '../../../../../../main/webapp/app/entities/service-provider/service-provider.component';
import { ServiceProviderService } from '../../../../../../main/webapp/app/entities/service-provider/service-provider.service';
import { ServiceProvider } from '../../../../../../main/webapp/app/entities/service-provider/service-provider.model';

describe('Component Tests', () => {

    describe('ServiceProvider Management Component', () => {
        let comp: ServiceProviderComponent;
        let fixture: ComponentFixture<ServiceProviderComponent>;
        let service: ServiceProviderService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CbclTestModule],
                declarations: [ServiceProviderComponent],
                providers: [
                    ServiceProviderService
                ]
            })
            .overrideTemplate(ServiceProviderComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ServiceProviderComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ServiceProviderService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'findAll').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ServiceProvider(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.findAll).toHaveBeenCalled();
                expect(comp.serviceProviders[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
