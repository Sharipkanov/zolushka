import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-page-blog-item',
  templateUrl: './page-blog-item.component.html',
  styleUrls: ['./page-blog-item.component.sass', '../../../sass/components/page-section.component.sass', '../page-blog/page-blog.component.sass', '../../../sass/components/panel.component.sass', '../../components/blog-item-cart/blog-item-cart.component.sass', '../../components/form/checbox-box-label/checbox-box-label.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class PageBlogItemComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
