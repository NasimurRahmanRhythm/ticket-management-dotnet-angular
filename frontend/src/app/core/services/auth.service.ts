import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AppPaths } from '../constants/app-paths';
import { QueryParams } from '../constants/query-params';
import { AuthResponse } from '../models/auth-response.model';
import { LoginRequest } from '../models/login-request.model';
import { RegisterRequest } from '../models/register-request.model';
import { AuthSessionStorageService } from './auth-session-storage.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly sessionStorage = inject(AuthSessionStorageService);
  private readonly authUrl = `${environment.apiBaseUrl}/auth`;
  private readonly session = signal<AuthResponse | null>(this.sessionStorage.read());

  readonly currentUser = computed(() => this.session()?.user ?? null);

  login(request: LoginRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.authUrl}/login`, request)
      .pipe(tap((response) => this.startSession(response)));
  }

  register(request: RegisterRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.authUrl}/register`, request)
      .pipe(tap((response) => this.startSession(response)));
  }

  isAuthenticated(): boolean {
    const session = this.session();
    if (!session) {
      return false;
    }

    if (Date.parse(session.expiresAt) <= Date.now()) {
      this.endSession();
      return false;
    }

    return true;
  }

  token(): string | null {
    return this.isAuthenticated() ? (this.session()?.token ?? null) : null;
  }

  logout(): void {
    this.endSession();
    void this.router.navigate(['/', AppPaths.login]);
  }

  expireSession(): void {
    this.endSession();
    void this.router.navigate(['/', AppPaths.login], {
      queryParams: { [QueryParams.returnUrl]: this.router.url },
    });
  }

  private startSession(session: AuthResponse): void {
    this.sessionStorage.write(session);
    this.session.set(session);
  }

  private endSession(): void {
    this.sessionStorage.clear();
    this.session.set(null);
  }
}
