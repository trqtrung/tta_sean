import { NgModule } from '@angular/core';

import {
  MatFormFieldModule, MatGridListModule, MatInputModule, MatSelectModule, 
  MatOptionModule, MatButtonModule, MatCheckboxModule, MatTableModule, MatToolbarModule, 
  MatSidenavModule, MatIconModule, MatListModule
} from '@angular/material';

import {CdkTableModule} from '@angular/cdk/table';


@NgModule({
  imports: [MatFormFieldModule,MatGridListModule, MatInputModule, MatSelectModule, 
    MatOptionModule,  MatButtonModule, MatCheckboxModule,MatTableModule, CdkTableModule, 
    MatToolbarModule, MatSidenavModule, MatIconModule, MatListModule],

  exports: [MatFormFieldModule,MatGridListModule, MatInputModule, MatSelectModule, 
    MatOptionModule,  MatButtonModule, MatCheckboxModule,MatTableModule, CdkTableModule,
     MatToolbarModule, MatSidenavModule, MatIconModule, MatListModule]
})
export class MaterialModule { }