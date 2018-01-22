import { NgModule } from '@angular/core';

import {
  MatFormFieldModule, MatGridListModule, MatInputModule, MatSelectModule, 
  MatOptionModule, MatButtonModule, MatCheckboxModule, MatTableModule, MatToolbarModule, 
  MatSidenavModule, MatIconModule, MatListModule, MatSnackBarModule
} from '@angular/material';

import {CdkTableModule} from '@angular/cdk/table';


@NgModule({
  imports: [MatFormFieldModule,MatGridListModule, MatInputModule, MatSelectModule, 
    MatOptionModule,  MatButtonModule, MatCheckboxModule,MatTableModule, CdkTableModule, 
    MatToolbarModule, MatSidenavModule, MatIconModule, MatListModule, MatSnackBarModule],

  exports: [MatFormFieldModule,MatGridListModule, MatInputModule, MatSelectModule, 
    MatOptionModule,  MatButtonModule, MatCheckboxModule,MatTableModule, CdkTableModule,
     MatToolbarModule, MatSidenavModule, MatIconModule, MatListModule, MatSnackBarModule]
})
export class MaterialModule { }