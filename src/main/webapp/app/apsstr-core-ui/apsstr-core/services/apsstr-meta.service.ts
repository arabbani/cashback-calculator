import { Injectable } from '@angular/core';
import { MetaService } from '@ngx-meta/core';
import * as moment from 'moment';

@Injectable()
export class ApsstrMetaService {

  constructor(private readonly metaService: MetaService) { }

  setMeta(title: string, description = ''): void {
    if (title && title !== '') {
      const dateTime = moment();
      title += moment(dateTime).format('MMMM') + ', ' + dateTime.year();
      this.metaService.setTitle(title);
      this.metaService.setTag('twitter:title', title);
    }
    if (description && description !== '') {
      this.metaService.setTag('twitter:description', description);
    }
  }

}
