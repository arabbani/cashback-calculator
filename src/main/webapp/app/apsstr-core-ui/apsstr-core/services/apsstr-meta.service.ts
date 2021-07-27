import { Injectable } from '@angular/core';
import { MetaService } from '@ngx-meta/core';

@Injectable()
export class ApsstrMetaService {

  constructor(private readonly metaService: MetaService) { }

  setMeta(title: string, description = ''): void {
    if (title && title !== '') {
      this.metaService.setTitle(title);
      this.metaService.setTag('twitter:title', title);
    }
    if (description && description !== '') {
      this.metaService.setTag('twitter:description', description);
    }
  }

}
