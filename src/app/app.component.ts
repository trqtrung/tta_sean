import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnInit } from '@angular/core';

import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material';

import {AuthenticationService} from './services/authentication.service';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  mobileQuery: MediaQueryList;

  title = 'Tran Trung Anh Best shop you can find';

  private _mobileQueryListener: () => void;

  isLoggedIn: Observable<boolean>;

  constructor(
    changeDetectorRef: ChangeDetectorRef
    , media: MediaMatcher
    , iconRegistry: MatIconRegistry
    , sanitizer: DomSanitizer
    , private authService: AuthenticationService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    iconRegistry.addSvgIcon(
      'thumbs-up',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/examples/thumbup-icon.svg'));
  }

  ngOnInit(){
    this.isLoggedIn = this.authService.isLoggedIn;
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
