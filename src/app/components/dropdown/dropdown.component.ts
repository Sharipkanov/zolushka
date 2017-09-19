import {Component, OnInit, Input, ViewEncapsulation, ElementRef, AfterViewInit, HostListener} from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class DropdownComponent implements AfterViewInit, OnInit {
  @Input() text: string = '';
  @Input() classes: string = '';

  private dropdown: HTMLElement;
  private dropdownActiveClass: string = 'dropdown--active';
  private dropdownContentLeftClass: string = 'dropdown__content--left';
  private dropdownContentRightClass: string = 'dropdown__content--right';
  private dropdownContentTopClass: string = 'dropdown__content--top';

  @HostListener('document:click', ['$event'])
  clickOutsideOfComponent(e) {
    if (!this._component.nativeElement.contains(e.target)) {
      const dropdownList = document.querySelectorAll(this.dropdownActiveClass);
      console.log(dropdownList);
      for (let i = 0; i < dropdownList.length; i++) {
        dropdownList[i].classList.remove(this.dropdownActiveClass);
      }
      // this.dropdown.classList.remove(this.dropdownActiveClass);
    }
  }

  constructor(private _component: ElementRef) {
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.dropdown = this._component.nativeElement.children[0];

    const container: HTMLElement = <HTMLElement> this.dropdown.closest('.container');
    const dropdownContent: HTMLElement = <HTMLElement> this.dropdown.getElementsByClassName('dropdown__content')[0];

    const containerRect = container.getBoundingClientRect();
    const dropdownContentRect = dropdownContent.getBoundingClientRect();

    if (containerRect.right <= dropdownContentRect.right) {
      dropdownContent.classList.add(this.dropdownContentRightClass);
    }

    if (containerRect.left >= dropdownContentRect.left) {
      dropdownContent.classList.add(this.dropdownContentLeftClass);
    }

    if ((dropdownContentRect.top + dropdownContentRect.height) >= (window.outerHeight * .7)) {
      dropdownContent.classList.add(this.dropdownContentTopClass);
    }
  }

  dropdownEvent(e: Event) {
    e.preventDefault();

    return (!this.dropdown.classList.contains(this.dropdownActiveClass))
      ? this.dropdown.classList.add(this.dropdownActiveClass)
      : this.dropdown.classList.remove(this.dropdownActiveClass);
  }

}
