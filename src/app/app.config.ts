import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideNativeDateAdapter } from '@angular/material/core';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { reducer } from './store/cart/cart.reducer';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideNativeDateAdapter(), provideAnimationsAsync(),provideStore({
    cart: reducer,
  }),
 provideEffects(), provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })]
};
