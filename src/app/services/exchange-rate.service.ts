import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Currency } from '../models/interfaces/currency.interface';
import { RateData, FilteredRateData } from '../models/interfaces/rate-data.interface';
import { CurrencyPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ExchangeRateService {

  private base_url = `https://api.nomics.com/v1`;
  private currencies: ReplaySubject<Currency[]> = new ReplaySubject<Currency[]>();
  private hasSearched: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  private rateData: ReplaySubject<FilteredRateData[]> = new ReplaySubject<FilteredRateData[]>();
  private selectedCryptoName: string = '';
  private queryParams = new HttpParams();

  constructor(
    private http: HttpClient
  ) {
    this.queryParams = this.queryParams.append('key', environment.nomics.API_KEY);
    let currencyParams = new HttpParams();
    currencyParams = currencyParams.append('key', environment.nomics.API_KEY);
    currencyParams = currencyParams.append('ids', environment.nomics.currencyIds);
    currencyParams = currencyParams.append('attributes', `id,name,logo_url`);
    this.http.get<Currency[]>(`${this.base_url}/currencies`, { params: currencyParams })
      .pipe(
        map((currencies: Currency[]) => currencies.filter(currency => currency.logo_url))
      )
      .subscribe((currenciesRes: Currency[]) => {
        console.log("🚀 ~ file: exchange-rate.service.ts ~ line 25 ~ ExchangeRateService ~ .subscribe ~ currenciesRes", currenciesRes);
        this.currencies.next(currenciesRes);
      });
  }

  public get currencies$() {
    return this.currencies.asObservable();
  }

  public get rateData$() {
    return this.rateData.asObservable();
  }
  
  public get selectedCrypto() {
    return this.selectedCryptoName;
  }

  public get hasSearched$() {
    return this.hasSearched.asObservable();
  }

  public setSearchData(
    currency: string,
    currencyName: string,
    start: string,
    end?: string,
  ) {
    console.log("🚀 ~ file: exchange-rate.service.ts ~ line 59 ~ ExchangeRateService ~ start", start)
    this.queryParams = this.queryParams.set('currency', currency);
    this.queryParams = this.queryParams.set('start', start);
    console.log("🚀 ~ file: exchange-rate.service.ts ~ line 62 ~ ExchangeRateService ~ this.queryParams ", this.queryParams )
    if (end) this.queryParams = this.queryParams.set('end', end);
    this.selectedCryptoName = currencyName;
    this.getRateData();
  }

  private getRateData() {
    this.http.get<RateData[]>(`${this.base_url}/exchange-rates/history`, { params: this.queryParams })
      .pipe(
        map((data: RateData[]) => {
          console.log("🚀 ~ file: exchange-rate.service.ts ~ line 60 ~ ExchangeRateService ~ map ~ data", data)
          // const MONTHLY_DATA = data.filter(data => { new Date(data.timestamp).getDay() === 1 })
          return data
            .filter(data => new Date(data.timestamp).getDate() === 1)
            .map(data => {
              const MONTH = new Date(data.timestamp).getMonth();
              const YEAR = new Date(data.timestamp).getFullYear();
              const FILTERED_DATA: FilteredRateData = {
                name: `${this.monthNames[MONTH]} ${YEAR}`,
                value: Number(data.rate),
                tooltipText: (new CurrencyPipe('en-US', 'USD')).transform(Number(data.rate))
              };
              return FILTERED_DATA
            })
        })
      )
      .subscribe(data => {
        console.log("🚀 ~ file: exchange-rate.service.ts ~ line 35 ~ ExchangeRateService ~ getRateData ~ data", data);
        this.hasSearched.next(true);
        this.rateData.next(data);
      });
  }
}
