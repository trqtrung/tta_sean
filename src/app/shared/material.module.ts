import { NgModule } from '@angular/core';
import {MatFormFieldModule, MatGridListModule, MatInputModule, MatSelectModule, MatOptionModule,  MatButtonModule, MatCheckboxModule, MatTableModule, MatToolbarModule, MatSidenavModule} from '@angular/material';

import {CdkTableModule} from '@angular/cdk/table';


@NgModule({
  imports: [MatFormFieldModule,MatGridListModule, MatInputModule, MatSelectModule, MatOptionModule,  MatButtonModule, MatCheckboxModule,MatTableModule, CdkTableModule, MatToolbarModule, MatSidenavModule],
  exports: [MatFormFieldModule,MatGridListModule, MatInputModule, MatSelectModule, MatOptionModule,  MatButtonModule, MatCheckboxModule,MatTableModule, CdkTableModule, MatToolbarModule, MatSidenavModule],
})
export class MaterialModule { }