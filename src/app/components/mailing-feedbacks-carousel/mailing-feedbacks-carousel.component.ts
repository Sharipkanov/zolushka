import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-mailing-feedbacks-carousel',
  templateUrl: './mailing-feedbacks-carousel.component.html',
  styleUrls: ['./mailing-feedbacks-carousel.component.sass', '../../../sass/components/panel.component.sass']
})
export class MailingFeedbacksCarouselComponent implements OnInit {

  public feedbacks = [
    {
      avatar: '/assets/images/default-navigation-avatar.svg',
      name: 'Maxim',
      age: 35,
      city: {
        title: 'Москва'
      },
      message: 'На все, про все ушло 15 минут, через час мы уже пили кофе в центре..'
    },
    {
      avatar: '/assets/images/default-navigation-avatar.svg',
      name: 'Maxim 2',
      age: 35,
      city: {
        title: 'Москва'
      },
      message: 'На все, про все ушло 15 минут, через час мы уже пили кофе в центре..'
    },
    {
      avatar: '/assets/images/default-navigation-avatar.svg',
      name: 'Maxim 3',
      age: 35,
      city: {
        title: 'Москва'
      },
      message: 'На все, про все ушло 15 минут, через час мы уже пили кофе в центре..'
    },
    {
      avatar: '/assets/images/default-navigation-avatar.svg',
      name: 'Maxim 4',
      age: 35,
      city: {
        title: 'Москва'
      },
      message: 'На все, про все ушло 15 минут, через час мы уже пили кофе в центре..'
    }
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
