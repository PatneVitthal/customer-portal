import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import * as ProgressBar from 'progressbar.js';

@Component({
  selector: 'app-visitper-day',
  templateUrl: './visiter-perday.component.html',
  styleUrls: ['./visit-perday.component.css']
})
export class VisitPerDayComponent implements AfterViewInit {
  @ViewChild('visitperday', { static: false }) visitperday!: ElementRef;
  @ViewChild('totalVisitors', { static: false }) totalVisitors!: ElementRef;
  private visitPerDayBar: any;
  private totalVisitorsBar: any;

  ngAfterViewInit(): void {
    if (this.visitperday) {
      this.createVisitPerDayBar();
    }
    if (this.totalVisitors) {
      this.createTotalVisitorsBar();
    }
  }

  createVisitPerDayBar(): void {
    if (!this.visitperday) return;

    const config = {
      color: '#fff',
      strokeWidth: 15,
      trailWidth: 15,
      easing: 'easeInOut',
      duration: 1400,
      text: {
        autoStyleContainer: false
      },
      from: {
        color: '#34B1AA'
      },
      to: {
        color: '#677ae4'
      },
      step: (state: any, circle: any) => {
        if (circle.path) {
          circle.path.setAttribute('stroke', state.color);
          circle.path.setAttribute('stroke-width', '15');
        }

        const value = Math.round(circle.value() * 100);
        if (value === 0) {
          circle.setText('');
        } else {
          circle.setText(value.toString());
        }
      }
    };

    this.visitPerDayBar = new ProgressBar.Circle(this.visitperday.nativeElement, config);

    if (this.visitPerDayBar.text) {
      this.visitPerDayBar.text.style.fontSize = '0rem';
    }

    this.visitPerDayBar.animate(0.34);
  }

  createTotalVisitorsBar(): void {
    if (!this.totalVisitors) return;

    const config = {
      color: '#fff',
      strokeWidth: 15,
      trailWidth: 15,
      easing: 'easeInOut',
      duration: 1400,
      text: {
        autoStyleContainer: false
      },
      from: {
        color: '#52CDFF',
        width: 15
      },
      to: {
        color: '#677ae4',
        width: 15
      },
      step: (state: any, circle: any) => {
        circle.path.setAttribute('stroke', state.color);
        circle.path.setAttribute('stroke-width', state.width);

        const value = Math.round(circle.value() * 100);
        if (value === 0) {
          circle.setText('');
        } else {
          circle.setText(value.toString());
        }
      }
    };

    this.totalVisitorsBar = new ProgressBar.Circle(this.totalVisitors.nativeElement, config);

    if (this.totalVisitorsBar.text) {
      this.totalVisitorsBar.text.style.fontSize = '0rem';
    }

    this.totalVisitorsBar.animate(0.64);
  }
}