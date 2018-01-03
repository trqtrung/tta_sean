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
        this.productType = new OptionList
    }

    save(): void{
        if(this.productType.name === '' || !this.productType.name)
        {
            alert('please insert name')
            return
        }

        console.log('pressed save product type')
        this.productType.key = 'product.type'
        this.optionListService.add(this.productType).subscribe(result => {console.log("success")})

        this.productType.name = ''
        this.productType.value = ''
    }

    clear(): void{
        this.productType.name = '';
        this.productType.value = '';
    }
}
