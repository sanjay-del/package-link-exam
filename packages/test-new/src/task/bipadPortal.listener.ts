import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { bipadportalEvent } from './bipadPortal.event';

@Injectable()
export class bipadPortalListener {
  @OnEvent('new-data-alert')
  handleOrderCreatedEvent(event: bipadportalEvent) {
    console.log('Event received');
    console.log({ event });
  }
}
