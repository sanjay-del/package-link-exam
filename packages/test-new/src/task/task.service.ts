import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { bipadportalEvent } from './bipadPortal.event';
// import { writeFile } from 'fs/promises';
// import { join } from 'path';
@Injectable()
export class TaskService {
  constructor(private eventEmitter: EventEmitter2) {}
  @Cron('0 0/1 * * * *')
  async handleEvery45Seconds() {
    console.log('Task executed every 45 seconds');
    const res = await fetch(
      `https://bipadportal.gov.np/api/v1/river/?title=Karnali%20at%20Chisapani%20Bridge&historical=true&format=json&water_level_on__gt=2024-01-05T00%3A00%3A00%2B05%3A45&water_level_on__lt=2024-01-08T23%3A59%3A59%2B05%3A45&fields=id%2Ccreated_on%2Ctitle%2Cbasin%2Cpoint%2Cimage%2Cwater_level%2Cdanger_level%2Cwarning_level%2Cwater_level_on%2Cstatus%2Csteady%2Cdescription%2Cstation&limit=-1`,
    );
    if (res.status === 200) {
      console.log('Data fetch successful');
      const newData = await res.json();
      const bipadPortalEvent = new bipadportalEvent();
      bipadPortalEvent.timestamp = new Date().getTime().toString();
      bipadPortalEvent.pulledData = newData;
      // await writeFile(
      //   join(process.cwd(), 'db', `${new Date().getTime()}hydro.json`),
      //   JSON.stringify(res),
      // );
      console.log('firing event');
      this.eventEmitter.emit('new-data-alert', bipadPortalEvent);
    }
  }
}
