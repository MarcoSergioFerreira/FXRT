import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ExchangeRateService } from 'src/app/services/exchange-rate.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  providers: [CurrencyPipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartComponent implements OnInit {
  @Input() rateData$: Observable<any> | undefined;
  @Input() chartName: string = '';

  constructor(
    // public exchangeRateService: ExchangeRateService
  ) { }

  ngOnInit(): void {
  }

  public formatToCurrency(amount: number) {
    return (new CurrencyPipe('en-US', 'USD')).transform(amount)
  }

}
