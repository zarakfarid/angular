import { Component } from '@angular/core';
import {SpinnerService} from "./shared/services/spinner.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'foo bar';

  readonly showSpinner$: Observable<boolean>;

  constructor(private readonly spinnerService: SpinnerService) {
    this.showSpinner$ = this.spinnerService.showSpinner$;
  }
}
