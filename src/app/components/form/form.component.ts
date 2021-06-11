import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { min } from 'rxjs/operators';
import { ExchangeRateService } from 'src/app/services/exchange-rate.service';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, OnDestroy {
  @Output() search: EventEmitter<any> = new EventEmitter();

  public searchData = new FormGroup({
    currency: new FormControl(['', Validators.compose([Validators.required])]),
    start: new FormControl([new Date]),
    end: new FormControl()
  });

  public today = new Date();
  public startDate: Date = new Date();
  public hasSearched: boolean = false;
  public hasSearchedSubscription: Subscription | undefined;

  constructor(
    public exchangeRateService: ExchangeRateService
  ) { }

  ngOnInit(): void {
    this.hasSearchedSubscription = this.exchangeRateService.hasSearched$.subscribe(value => this.hasSearched = value);
  }

  ngOnDestroy() {
    if (this.hasSearchedSubscription) { this.hasSearchedSubscription.unsubscribe(); }
  }

  public check() {
    // console.log("🚀 ~ file: form.component.ts ~ line 37 ~ FormComponent ~ setSearchData ~ this.searchData.value.currency", this.searchData)
  }

  public setSearchData(): void {
    // console.log("🚀 ~ file: form.component.ts ~ line 37 ~ FormComponent ~ setSearchData ~ this.searchData.value.currency", this.searchData)
    // Weird workaround becuase mat-datepicker is always required, even if its not
    // https://github.com/angular/components/issues/9942
    if (!this.searchData.controls['end'].pristine && !this.searchData.controls['end'].value) {
      this.searchData.controls['end'].setErrors({ 'incorrect': true });
    } else {
      this.search.next({
        currency: this.searchData.value.currency.id,
        currencyName: this.searchData.value.currency.name,
        start: new Date(this.searchData.value.start).toISOString(),
        end: this.searchData.value.end ? new Date(this.searchData.value.end).toISOString() : undefined,
      });
    }
  }

  public setStartDate(startDate: Date): void {
    // console.log("🚀 ~ file: form.component.ts ~ line 50 ~ FormComponent ~ setStartDate ~ startDate", startDate)
    this.startDate = startDate;
    // console.log("🚀 ~ file: form.component.ts ~ line 52 ~ FormComponent ~ setStartDate ~ this.startDate", this.startDate)
  }

}
