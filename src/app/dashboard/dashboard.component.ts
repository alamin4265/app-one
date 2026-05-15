import { Component, inject, signal, computed } from '@angular/core';
import { ConfigService } from '../core/config.service';

type ApiStatus = 'checking' | 'healthy' | 'degraded';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  private readonly configService = inject(ConfigService);

  readonly config = this.configService.get();
  readonly apiStatus = signal<ApiStatus>('checking');

  readonly statusLabel = computed(() => {
    const s = this.apiStatus();
    if (s === 'checking') return 'Checking...';
    if (s === 'healthy') return 'Healthy';
    return 'Degraded';
  });

  constructor() {
    this.checkStatus();
  }

  checkStatus(): void {
    this.apiStatus.set('checking');
    const delay = 800 + Math.random() * 700;
    setTimeout(() => {
      this.apiStatus.set(Math.random() > 0.2 ? 'healthy' : 'degraded');
    }, delay);
  }
}
