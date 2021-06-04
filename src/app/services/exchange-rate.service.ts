import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExchangeRateService {

  private base_url = `https://api.nomics.com/v1/exchange-rates/history`;
  private queryParams = new HttpParams();

  constructor(
    private http: HttpClient
  ) { }

  public setSearchData(
    currency: string,
    start: string,
    end?: string,
    format?: string
  ) {
    this.queryParams = this.queryParams.append('key', environment.nomics.API_KEY);
    this.queryParams = this.queryParams.append('currency', currency);
    this.queryParams = this.queryParams.append('start', start);
    if (end) this.queryParams = this.queryParams.append('end', end);
    if (format) this.queryParams = this.queryParams.append('format', format);
    this.getRateData();
  }

  private getRateData() {
    this.http.get( this.base_url, { params: this.queryParams })
      .subscribe(data => {
        console.log("🚀 ~ file: exchange-rate.service.ts ~ line 35 ~ ExchangeRateService ~ getRateData ~ data", data)
      });
  }
}
