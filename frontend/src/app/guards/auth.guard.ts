import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { PollingService } from '../services/pollingService';
import { map } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if(Object.keys(authService.getCurrentUser()).length > 0)
    return true;
  router.navigateByUrl('login');
  return false;
};
