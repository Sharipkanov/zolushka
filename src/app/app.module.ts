import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http';

import { BackendProvider } from './services/mocks.service';
import { MockBackend } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';

import { OwlModule } from 'angular-owl-carousel';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routes';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { UserCartComponent } from './components/user-cart/user-cart.component';
import { PageNotFoundComponent } from './routes/page-not-found/page-not-found.component';
import { PageHomeComponent } from './routes/page-home/page-home.component';
import { DownloadBoxComponent } from './components/download-box/download-box.component';
import { SocialsCircleListComponent } from './components/socials-circle-list/socials-circle-list.component';
import { InputBoxComponent } from './components/form/input-box/input-box.component';
import { TextareaBoxComponent } from './components/form/textarea-box/textarea-box.component';
import { ChecboxBoxComponent } from './components/form/checbox-box/checbox-box.component';
import { ChecboxBoxLabelComponent } from './components/form/checbox-box-label/checbox-box-label.component';
import { RadioBoxLabelComponent } from './components/form/radio-box-label/radio-box-label.component';
import { SelectBoxComponent } from './components/form/select-box/select-box.component';
import { SelectSearchBoxComponent } from './components/form/select-search-box/select-search-box.component';
import { PageComponentsComponent } from './routes/page-components/page-components.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { RadioBoxComponent } from './components/form/radio-box/radio-box.component';
import { SectionStoreLinkComponent } from './components/sections/section-store-link/section-store-link.component';
import { SectionNewGirlsComponent } from './components/sections/section-new-girls/section-new-girls.component';
import { SectionRegistrationComponent } from './components/sections/section-registration/section-registration.component';
import { UserCartThumbnailComponent } from './components/user-cart-thumbnail/user-cart-thumbnail.component';
import { PanelTopUsersComponent } from './components/panels/panel-top-users/panel-top-users.component';
import { UserCartTinyComponent } from './components/user-cart-tiny/user-cart-tiny.component';
import { UserInfoStatusComponent } from './components/user-info-status/user-info-status.component';
import { PageRegistrationComponent } from './routes/page-registration/page-registration.component';
import { SectionRegistrationInfoComponent } from './components/sections/section-registration-info/section-registration-info.component';
import { PanelGiftComponent } from './components/panels/panel-gift/panel-gift.component';
import { SectionPopularUsersComponent } from './components/sections/section-popular-users/section-popular-users.component';
import { PageSearchComponent } from './routes/page-search/page-search.component';
import { NavigationComponent } from './components/navigation/navigation.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    UserCartComponent,
    PageNotFoundComponent,
    PageHomeComponent,
    DownloadBoxComponent,
    SocialsCircleListComponent,
    InputBoxComponent,
    TextareaBoxComponent,
    ChecboxBoxComponent,
    ChecboxBoxLabelComponent,
    RadioBoxLabelComponent,
    SelectBoxComponent,
    SelectSearchBoxComponent,
    PageComponentsComponent,
    SearchBarComponent,
    RadioBoxComponent,
    SectionStoreLinkComponent,
    SectionNewGirlsComponent,
    SectionRegistrationComponent,
    UserCartThumbnailComponent,
    PanelTopUsersComponent,
    UserCartTinyComponent,
    UserInfoStatusComponent,
    PageRegistrationComponent,
    SectionRegistrationInfoComponent,
    PanelGiftComponent,
    SectionPopularUsersComponent,
    PageSearchComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutes,
    HttpModule,
    JsonpModule,
    OwlModule
  ],
  providers: [
    BackendProvider,
    MockBackend,
    BaseRequestOptions
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
