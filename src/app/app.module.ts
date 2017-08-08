import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http';

import { StorageService } from './services/storage/storage.service';
import { UserService } from './services/user/user.service';

import { BackendProvider } from './services/mocks.service';
import { MockBackend } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';

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
import { PageAboutComponent } from './routes/page-about/page-about.component';
import { SectionRegistrationInfoComponent } from './components/sections/section-registration-info/section-registration-info.component';
import { PanelGiftComponent } from './components/panels/panel-gift/panel-gift.component';
import { SectionPopularUsersComponent } from './components/sections/section-popular-users/section-popular-users.component';
import { PageSearchComponent } from './routes/page-search/page-search.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { PanelNewGirlsComponent } from './components/panels/panel-new-girls/panel-new-girls.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PopupLoginComponent } from './components/popups/popup-login/popup-login.component';
import { PopupsComponent } from './components/popups/popups/popups.component';
import { PopupsService } from './services/popups/popups.service';
import { PageProfileComponent } from './routes/page-profile/page-profile.component';
import { PageProfileEditComponent } from './routes/page-profile-edit/page-profile-edit.component';
import { HttpService } from './services/http/http.service';
import { DateService } from './services/date/date.service';
import { EnumsService } from './services/enums/enums.service';
import { PageWalletComponent } from './routes/wallet/page-wallet/page-wallet.component';
import { OwlModule } from 'ngx-owl-carousel';
import { PreloaderComponent } from './components/preloader/preloader.component';
import { PageMailingComponent } from './routes/page-mailing/page-mailing.component';
import { PageProfileViewsComponent } from './routes/page-profile-views/page-profile-views.component';
import { ChatListComponent } from './components/chat-list/chat-list.component';

@NgModule({
    declarations: [
        AppComponent,
        FooterComponent,
        HeaderComponent,
        UserCartComponent,
        PageNotFoundComponent,
        PageHomeComponent,
        PageAboutComponent,
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
        NavigationComponent,
        DropdownComponent,
        PanelNewGirlsComponent,
        PopupLoginComponent,
        PopupsComponent,
        PageProfileComponent,
        PageProfileEditComponent,
        PageWalletComponent,
        PreloaderComponent,
        PageMailingComponent,
        PageProfileViewsComponent,
        ChatListComponent
    ],
    imports: [
        BrowserModule,
        AppRoutes,
        HttpModule,
        JsonpModule,
        FormsModule,
        ReactiveFormsModule,
        OwlModule
    ],
    providers: [
        StorageService,
        UserService,
        BackendProvider,
        MockBackend,
        BaseRequestOptions,
        PopupsService,
        HttpService,
        DateService,
        EnumsService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
