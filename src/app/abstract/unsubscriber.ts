import { Directive, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

/**
 * Any class or component subscribing to anything, such as a store,
 * should implement this class to manage unsubscribing when said class or component is destroyed.
 * The derived class should also implement the OnDestroy interface
 * to ensure that the ngOnDestroy method gets called
 * and unsubscribes correctly
 */
@Directive({})
export abstract class Unsubscriber implements OnDestroy {
  protected readonly destroyed$ = new Subject<void>();

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
