import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const platformId = inject(PLATFORM_ID);

  if (isPlatformBrowser(platformId)) {

    const token = localStorage.getItem('token');

    console.log('INTERCEPTOR TOKEN:', token);
    console.log('REQUEST URL:', req.url);

    if (token) {

      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log('AUTH HEADER ADDED');
    }
  }

  return next(req);
};