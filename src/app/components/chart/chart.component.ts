import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ExchangeRateService } from 'src/app/services/exchange-rate.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  providers: [CurrencyPipe]
})
export class ChartComponent implements OnInit {

  
  constructor(
    public exchangeRateService: ExchangeRateService
  ) { }

  ngOnInit(): void {
  }

  public formatToCurrency(amount: number) {
    return (new CurrencyPipe('en-US', 'USD')).transform(amount)
  }

}
