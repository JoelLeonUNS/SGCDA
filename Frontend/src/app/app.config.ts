import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideNzIcons } from './icons-provider';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { es_ES, provideNzI18n } from 'ng-zorro-antd/i18n';
import { DatePipe, registerLocaleData, UpperCasePipe } from '@angular/common';
import es from '@angular/common/locales/es';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { ConcatenarPipe } from './core/pipes/concatenar/concatenar.pipe';
import { MesPipe } from './core/pipes/mes/mes.pipe';
import { MonedaPipe } from './core/pipes/moneda/moneda.pipe';
import { PeriodoMesPipe } from './core/pipes/periodo-mes/periodo-mes.pipe';
import { PeriodoPipe } from './core/pipes/periodo/periodo.pipe';

registerLocaleData(es);

export const appConfig: ApplicationConfig = {
  providers: [
    MonedaPipe,
    UpperCasePipe,
    DatePipe,
    MesPipe,
    PeriodoPipe,
    PeriodoMesPipe,
    ConcatenarPipe,
    provideRouter(routes), 
    provideNzIcons(),
    provideClientHydration(), 
    provideAnimationsAsync(), provideNzI18n(es_ES), importProvidersFrom(FormsModule), provideAnimationsAsync(), provideHttpClient(withFetch())
  ]
};
