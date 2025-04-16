import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-stats-bar',
  standalone: true,
  imports: [CommonModule, MatProgressBarModule],
  template: `
    <div class="stat-bar">
      <span class="label">{{ label }}</span>
      <mat-progress-bar
        [value]="value"
        mode="determinate"
        [color]="progressColor(value)"
      ></mat-progress-bar>
      <span class="number">{{ value }}</span>
    </div>
  `,
  styleUrls: ['./stats-bar.component.css']
})
export class StatsBarComponent {
  @Input() label = 'HP';
  @Input() value = 0;
  @Input() max = 255;
  progressColor(value: number): 'primary' | 'accent' | 'warn' {
    if (value < 60) return 'warn';
    if (value < 100) return 'accent';
    return 'primary';
  }
}
