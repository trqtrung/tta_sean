import { NgModule } from '@angular/core';

import {
  MatFormFieldModule, MatGridListModule, MatInputModule, MatSelectModule, 
  MatOptionModule, MatButtonModule, MatCheckboxModule, MatTableModule, MatToolbarModule, 
  MatSidenavModule, MatIconModule, MatListModule, MatSnackBarModule, MatPaginatorModule, MatSortModule
} from '@angular/material';

import {CdkTableModule} from '@angular/cdk/table';


@NgModule({
  imports: [MatFormFieldModule,MatGridListModule, MatInputModule, MatSelectModule, 
    MatOptionModule,  MatButtonModule, MatCheckboxModule,MatTableModule, CdkTableModule, 
    MatToolbarModule, MatSidenavModule, MatIconModule, MatListModule, MatSnackBarModule, MatPaginatorModule, MatSortModule],

  exports: [MatFormFieldModule,MatGridListModule, MatInputModule, MatSelectModule, 
    MatOptionModule,  MatButtonModule, MatCheckboxModule,MatTableModule, CdkTableModule,
     MatToolbarModule, MatSidenavModule, MatIconModule, MatListModule, MatSnackBarModule, MatPaginatorModule, MatSortModule]
})
export class MaterialModule { }