import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
/**
 *Servicio para mostrar un loading
 *
 * @returns {void}
 */
export class LoadingService {
  private _loading$ = new BehaviorSubject<boolean>(false);
  readonly loading$ = this._loading$.asObservable();

  show(): void {
    this._loading$.next(true);
  }

  hide(): void {
    this._loading$.next(false);
  }
}
