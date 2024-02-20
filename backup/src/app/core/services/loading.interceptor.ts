import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { tap,catchError } from "rxjs";


import { LoadingService, LoadingOverlayRef } from './loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private loadingService: LoadingService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let loadingRef: LoadingOverlayRef;

    // This is a little hacky and related to change detection (ExpressionChangedAfterItHasBeenCheckedError).
    // More informations here:
    // https://blog.angularindepth.com/everything-you-need-to-know-about-the-expressionchangedafterithasbeencheckederror-error-e3fd9ce7dbb4

    Promise.resolve(null).then(() => loadingRef = this.loadingService.open());
    return next.handle(req).pipe(tap(event => {
      if (event instanceof HttpResponse && loadingRef) {
        loadingRef.close();
      }
    },catchError((error: any) => {
      if (loadingRef) {
        loadingRef.close();
      }

      return throwError(error);
    })));
  }
}
