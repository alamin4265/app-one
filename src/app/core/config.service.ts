import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export interface AppConfig {
  environment: string;
  version: string;
  color: string;
  podName: string;
  buildTime: string;
}

@Injectable({ providedIn: 'root' })
export class ConfigService {
  private readonly http = inject(HttpClient);
  private config!: AppConfig;

  async load(): Promise<void> {
    this.config = await firstValueFrom(
      this.http.get<AppConfig>('assets/config.json')
    );
  }

  get(): AppConfig {
    return this.config;
  }
}
