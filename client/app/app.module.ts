import { bootstrap, element, module } from 'angular';
import '@uirouter/angularjs';
import 'angular1-async-filter';
import 'angular-translate';
import './app.scss';
import { feedback } from './components/feedback/feedbackModule';
import { routing } from './configs/app.routing';
import { provideDecorator } from './decorators/provideDecorator';
import { servicesModule } from './modules/services.module';
import { componentsModule } from './modules/components.module';
import { translateProviderConfig } from './configs/translateProvider.config';
import { httpProviderConfig } from './configs/httpProvider.config';
import { guardsInit } from './guards/guards.init';
import { factoriesModule } from './modules/factories.module';
import { directivesModule } from './modules/directives.module';

export const app = module('app', [
  'ui.router',
  'asyncFilter',
  'pascalprecht.translate',
  feedback.name,
  factoriesModule.name,
  componentsModule.name,
  directivesModule.name,
  servicesModule.name
])
  .config(routing)
  .config(translateProviderConfig)
  .config(httpProviderConfig)
  .config(provideDecorator)
  .run(guardsInit);
element(document).ready(() => {
  bootstrap(document, ['app']);
});
