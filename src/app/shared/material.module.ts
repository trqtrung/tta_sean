import { NgModule } from '@angular/core';
import {MatFormFieldModule, MatGridListModule, MatInputModule, MatSelectModule, MatOptionModule,  MatButtonModule, MatCheckboxModule} from '@angular/material';

@NgModule({
  imports: [MatFormFieldModule,MatGridListModule, MatInputModule, MatSelectModule, MatOptionModule,  MatButtonModule, MatCheckboxModule],
  exports: [MatFormFieldModule,MatGridListModule, MatInputModule, MatSelectModule, MatOptionModule,  MatButtonModule, MatCheckboxModule],
})
export class MaterialModule { }