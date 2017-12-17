import { NgModule } from '@angular/core';
import {MatFormFieldModule, MatGridListModule, MatInputModule, MatSelectModule, MatOptionModule,  MatButtonModule, MatCheckboxModule, MatTableModule} from '@angular/material';

import {CdkTableModule} from '@angular/cdk/table';


@NgModule({
  imports: [MatFormFieldModule,MatGridListModule, MatInputModule, MatSelectModule, MatOptionModule,  MatButtonModule, MatCheckboxModule,MatTableModule, CdkTableModule],
  exports: [MatFormFieldModule,MatGridListModule, MatInputModule, MatSelectModule, MatOptionModule,  MatButtonModule, MatCheckboxModule,MatTableModule, CdkTableModule],
})
export class MaterialModule { }