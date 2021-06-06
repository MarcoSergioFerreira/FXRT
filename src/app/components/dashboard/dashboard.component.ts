import { Component, OnInit } from '@angular/core';
import { ExchangeRateService } from 'src/app/services/exchange-rate.service';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public faLineChart = faChartLine;

  constructor(
    public exchangeRateService: ExchangeRateService
  ) { }

  ngOnInit(): void {
  }

}
