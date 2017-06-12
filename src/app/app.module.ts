import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http';

import { BackendProvider } from './services/mocks.service';
import { MockBackend } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';
import { LocationService } from './services/location/location.service';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routes';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { UserCartComponent } from './components/user-cart/user-cart.component';
import { PanelComponent } from './components/panel/panel.component';
import { PageNotFoundComponent } from './routes/page-not-found/page-not-found.component';
import { PageHomeComponent } from './routes/page-home/page-home.component';
import { DownloadBoxComponent } from './components/download-box/download-box.component';
import { GiftBoxComponent } from './components/gift-box/gift-box.component';
import { SocialsCircleListComponent } from './components/socials-circle-list/socials-circle-list.component';
import { InputBoxComponent } from './components/form/input-box/input-box.component';
import { TextareaBoxComponent } from './components/form/textarea-box/textarea-box.component';
import { ChecboxBoxComponent } from './components/form/checbox-box/checbox-box.component';
import { ChecboxBoxLabelComponent } from './components/form/checbox-box-label/checbox-box-label.component';
import { RadioBoxLabelSeparateComponent } from './components/form/radio-box-label-separate/radio-box-label-separate.component';
import { RadioBoxLabelComponent } from './components/form/radio-box-label/radio-box-label.component';
import { SelectBoxComponent } from './components/form/select-box/select-box.component';
import { SelectSearchBoxComponent } from './components/form/select-search-box/select-search-box.component';
import { PageComponentsComponent } from './routes/page-components/page-components.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { RadioBoxComponent } from './components/form/radio-box/radio-box.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    UserCartComponent,
    PanelComponent,
    PageNotFoundComponent,
    PageHomeComponent,
    DownloadBoxComponent,
    GiftBoxComponent,
    SocialsCircleListComponent,
    InputBoxComponent,
    TextareaBoxComponent,
    ChecboxBoxComponent,
    ChecboxBoxLabelComponent,
    RadioBoxLabelSeparateComponent,
    RadioBoxLabelComponent,
    SelectBoxComponent,
    SelectSearchBoxComponent,
    PageComponentsComponent,
    SearchBarComponent,
    RadioBoxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutes,
    HttpModule,
    JsonpModule
  ],
  providers: [
    BackendProvider,
    MockBackend,
    BaseRequestOptions,
    LocationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
