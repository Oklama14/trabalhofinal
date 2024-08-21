import { Inject, inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { LoginService } from '../services/login.service';
import { AuthPipe, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { AngularFireAuth } from '@angular/fire/compat/auth';

export const redirectUnauthorizedToLogin: AuthPipe = redirectUnauthorizedTo(['login']);

export const authGuard: CanActivateFn = async (route, state) => {
  //const login = inject(LoginService);
 // return login.isLogado();
 const login = inject(AngularFireAuth);
 const user = await login.currentUser;
 const islogged = !!user;
 return islogged;
};
