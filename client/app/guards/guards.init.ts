import { AuthGuard } from './auth.guard';
import { RoleGuard } from './role.guard';
import { LoggingService } from '../utils/loggingService';

export const guardsInit = [
  '$transitions', 'authGuard', 'roleGuard', LoggingService.NAME,
  ($transitions, authGuard: AuthGuard, roleGuard: RoleGuard, loggingService: LoggingService) => {

    $transitions.onStart({},
      (transition) => loggingService.log('Transition', `Changing tab to ${transition.to().name}`)
    );

    $transitions.onStart({to: 'app.**'},
      () => authGuard.canActivate()
    );

    $transitions.onStart({to: 'app.adminTab'},
      () => roleGuard.canActivate()
    );
  }
];
