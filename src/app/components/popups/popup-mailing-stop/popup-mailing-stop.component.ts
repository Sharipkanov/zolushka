import {Component, Input, OnInit} from '@angular/core';
import {MailingService} from '../../../services/mailing/mailing.service';
import {Router} from '@angular/router';
import {PopupsService} from '../../../services/popups/popups.service';

@Component({
  selector: 'app-popup-mailing-stop',
  templateUrl: './popup-mailing-stop.component.html',
  styleUrls: ['./popup-mailing-stop.component.sass']
})
export class PopupMailingStopComponent implements OnInit {
  @Input() props;

  public preloader: boolean = false;
  constructor(private _mailingService: MailingService, private _router: Router, private _popupsService: PopupsService) { }

  ngOnInit() {
  }

  stopMailing(e: Event) {
    e.preventDefault();
    this.preloader = true;
    if (this.props) {
      this._mailingService.stopMailing(this.props.id).subscribe((res) => {
        this._router.navigate(['/mailing']);
        this._popupsService.closePopup('mailingStop');
        this.preloader = false;
      });
    }
  }
}
