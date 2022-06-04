import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { BaseUrl } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
  private readonly JWT_TOKEN = BaseUrl.jwt_token;

  constructor(private authService: AuthService, private http: HttpClient) {}

  handleHttpError = (err: HttpErrorResponse, req: any, next: HttpHandler) => {
    if (
      err instanceof HttpErrorResponse && err.status === 401
    ) {
      return this.handle401Error(req, next);
    }
    return throwError(err);
  };

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let authReq = req;
    const token = this.authService.getJwtToken();
    if (token != null || token != undefined) {
      authReq = this.addTokenHeader(req, token);
    }
    return next.handle(authReq).pipe(
      catchError((err: HttpErrorResponse) => {
        this.handleHttpError(err, authReq, next);
        return throwError(err);
      })
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      const token = this.authService.getRefreshToken();
      if (token) {
        const data = {
          refresh: token,
        };
        return this.http
          .post<any>(BaseUrl.api + 'user/api/v1/token/refresh/', data)
          .subscribe(
            (tokens: any) => {
              this.isRefreshing = false;
              console.log('http interceptors', tokens);
              localStorage.setItem(this.JWT_TOKEN, tokens.access);
              return next.handle(
                this.addTokenHeader(request, token.accessToken)
              );
            },
            (error: any) => {
              this.isRefreshing = false;
              if (error.status === 401) {
                this.authService.logout();
              }
            }
          );
      }
    }
    return this.refreshTokenSubject.pipe(
      filter((token) => token !== null),
      take(1),
      switchMap((token) => next.handle(this.addTokenHeader(request, token)))
    );
  }

  private addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];
