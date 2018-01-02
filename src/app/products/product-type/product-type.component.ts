import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { OptionListService } from '../../options_lists/optionlist.service';
import { OptionList } from '../../options_lists/optionlist.model';

@Component({
    selector: 'app-product-type',
    templateUrl: './product-type.component.html',
    styleUrls: ['./product-type.component.css'],
    //providers: [ProductService]
})

export class ProductTypeComponent implements OnInit{
    productType: OptionList;

    constructor(private route: ActivatedRoute,
        private optionListService: OptionListService)
        {

        }

    ngOnInit(){

    }

    save(): void{
        console.log('pressed save product type')

        this.optionListService.add(this.productType).subscribe(result => {console.log("success")});

        this.productType.name = '';
        this.productType.value = '';
    }
}
