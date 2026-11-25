import { Injectable } from '@angular/core';
import { StorageKeys } from '../constants/storage-keys';
import { AuthResponse } from '../models/auth-response.model';

@Injectable({ providedIn: 'root' })
export class AuthSessionStorageService {
  read(): AuthResponse | null {
    const rawSession = localStorage.getItem(StorageKeys.authSession);
    if (!rawSession) {
      return null;
    }

    try {
      return JSON.parse(rawSession) as AuthResponse;
    } catch {
      this.clear();
      return null;
    }
  }

  write(session: AuthResponse): void {
    localStorage.setItem(StorageKeys.authSession, JSON.stringify(session));
  }

  clear(): void {
    localStorage.removeItem(StorageKeys.authSession);
  }
}
