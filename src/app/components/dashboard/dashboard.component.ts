import { Component, OnInit } from '@angular/core';
import { ExchangeRateService } from 'src/app/services/exchange-rate.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


  constructor(
    public exchangeRateService: ExchangeRateService
  ) { }

  ngOnInit(): void {
  }

  search(value: any) {
    this.exchangeRateService.setSearchData(value.currency, value.currencyName, value.start, value.end);
  }

}
