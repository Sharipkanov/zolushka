import {Component, Input, OnInit} from '@angular/core';
import {IBlogItem} from '../../interfaces/blog-item.interface';

@Component({
  selector: 'app-blog-item-cart',
  templateUrl: './blog-item-cart.component.html',
  styleUrls: ['./blog-item-cart.component.sass', '../../../sass/components/panel.component.sass']
})
export class BlogItemCartComponent implements OnInit {

  @Input() item: IBlogItem = <IBlogItem>{};

  constructor() { }

  ngOnInit() {
  }

}
