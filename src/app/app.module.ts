import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpModule, JsonpModule} from '@angular/http';

import {StorageService} from './services/storage/storage.service';
import {UserService} from './services/user/user.service';

import {BackendProvider} from './services/mocks.service';
import {MockBackend} from '@angular/http/testing';
import {BaseRequestOptions} from '@angular/http';

import {AppComponent} from './app.component';
import {AppRoutes} from './app.routes';
import {FooterComponent} from './components/footer/footer.component';
import {HeaderComponent} from './components/header/header.component';
import {UserCartComponent} from './components/user-cart/user-cart.component';
import {PageNotFoundComponent} from './routes/page-not-found/page-not-found.component';
import {PageHomeComponent} from './routes/page-home/page-home.component';
import {DownloadBoxComponent} from './components/download-box/download-box.component';
import {SocialsCircleListComponent} from './components/socials-circle-list/socials-circle-list.component';
import {InputBoxComponent} from './components/form/input-box/input-box.component';
import {TextareaBoxComponent} from './components/form/textarea-box/textarea-box.component';
import {ChecboxBoxComponent} from './components/form/checbox-box/checbox-box.component';
import {ChecboxBoxLabelComponent} from './components/form/checbox-box-label/checbox-box-label.component';
import {RadioBoxLabelComponent} from './components/form/radio-box-label/radio-box-label.component';
import {SelectBoxComponent} from './components/form/select-box/select-box.component';
import {SelectSearchBoxComponent} from './components/form/select-search-box/select-search-box.component';
import {PageComponentsComponent} from './routes/page-components/page-components.component';
import {SearchBarComponent} from './components/search-bar/search-bar.component';
import {RadioBoxComponent} from './components/form/radio-box/radio-box.component';
import {SectionStoreLinkComponent} from './components/sections/section-store-link/section-store-link.component';
import {SectionNewGirlsComponent} from './components/sections/section-new-girls/section-new-girls.component';
import {SectionRegistrationComponent} from './components/sections/section-registration/section-registration.component';
import {UserCartThumbnailComponent} from './components/user-cart-thumbnail/user-cart-thumbnail.component';
import {PanelTopUsersComponent} from './components/panels/panel-top-users/panel-top-users.component';
import {UserCartTinyComponent} from './components/user-cart-tiny/user-cart-tiny.component';
import {UserInfoStatusComponent} from './components/user-info-status/user-info-status.component';
import {PageRegistrationComponent} from './routes/page-registration/page-registration.component';
import {PageAboutComponent} from './routes/page-about/page-about.component';
import {SectionRegistrationInfoComponent} from './components/sections/section-registration-info/section-registration-info.component';
import {PanelGiftComponent} from './components/panels/panel-gift/panel-gift.component';
import {SectionPopularUsersComponent} from './components/sections/section-popular-users/section-popular-users.component';
import {PageSearchComponent} from './routes/page-search/page-search.component';
import {NavigationComponent} from './components/navigation/navigation.component';
import {DropdownComponent} from './components/dropdown/dropdown.component';
import {PanelNewGirlsComponent} from './components/panels/panel-new-girls/panel-new-girls.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PopupLoginComponent} from './components/popups/popup-login/popup-login.component';
import {PopupsComponent} from './components/popups/popups/popups.component';
import {PopupsService} from './services/popups/popups.service';
import {PageProfileComponent} from './routes/page-profile/page-profile.component';
import {PageProfileEditComponent} from './routes/page-profile-edit/page-profile-edit.component';
import {DateService} from './services/date/date.service';
import {EnumsService} from './services/enums/enums.service';
import {OwlModule} from 'ngx-owl-carousel';
import {PreloaderComponent} from './components/preloader/preloader.component';
import {PageMailingComponent} from './routes/page-mailing/page-mailing.component';
import {PageProfileViewsComponent} from './routes/page-profile-views/page-profile-views.component';
import {ChatListComponent} from './components/chat-list/chat-list.component';
import {PopupChatComponent} from './components/popups/popup-chat/popup-chat.component';
import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {DialogService} from './services/dialog/dialog.service';
import {SocketIoConfig, SocketIoModule} from 'ngx-socket-io';
import {IonRangeSliderModule} from 'ng2-ion-range-slider';
import {PaginationComponent} from './components/pagination/pagination.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {MassMediaComponent} from './components/mass-media/mass-media.component';
import {PopupNoticeConfirmedPhotosComponent} from './components/popups/popup-notice-confirmed-photos/popup-notice-confirmed-photos.component';
import {PopupRegBeforeFilterByOnlineComponent} from './components/popups/popup-reg-before-filter-by-online/popup-reg-before-filter-by-online.component';
import {PopupRegBeforeFilterByRealPhotoComponent} from './components/popups/popup-reg-before-filter-by-real-photo/popup-reg-before-filter-by-real-photo.component'
import {UrlParserService} from './services/url-parser/url-parser.service';
import {PageBlogComponent} from './routes/page-blog/page-blog.component';
import {BlogItemCartComponent} from './components/blog-item-cart/blog-item-cart.component';
import {BlogBottomCategoriesComponent} from './components/blog-bottom-categories/blog-bottom-categories.component';
import {PageBlogItemComponent} from './routes/page-blog-item/page-blog-item.component';
import {CommentsComponent} from './components/comments/comments.component';
import {BottomGridComponent} from './components/bottom-grid/bottom-grid.component';
import {PopupConfirmPhotoComponent} from './components/popups/popup-confirm-photo/popup-confirm-photo.component';
import {PreloaderLineComponent} from './components/preloader-line/preloader-line.component';
import {PopupRegToDialogComponent} from './components/popups/popup-reg-to-dialog/popup-reg-to-dialog.component';
import {PopupSaveSearchComponent} from './components/popups/popup-save-search/popup-save-search.component';
import {PageLoaderService} from './services/page-loader/page-loader.service';
import {MainInstallAppComponent} from './components/main-install-app/main-install-app.component';
import {MainCarouselComponent} from './components/main-carousel/main-carousel.component';
import {IndexPanelViewsComponent} from './components/index-panel-views/index-panel-views.component';
import {IndexPanelBlogComponent} from './components/index-panel-blog/index-panel-blog.component';
import {IndexPanelDayPersonComponent} from './components/index-panel-day-person/index-panel-day-person.component';
import {IndexPanelChatListComponent} from './components/index-panel-chat-list/index-panel-chat-list.component';
import {IndexPanelMailingFeedbackComponent} from './components/index-panel-mailing-feedback/index-panel-mailing-feedback.component';
import {MailingFeedbacksCarouselComponent} from './components/mailing-feedbacks-carousel/mailing-feedbacks-carousel.component';
import {PopupMailingBlacklistComponent} from './components/popups/popup-mailing-blacklist/popup-mailing-blacklist.component';
import {UsersService} from './services/users/users.service';
import {MailingService} from './services/mailing/mailing.service';
import {MailingArchiveListPlateComponent} from './components/mailing-archive-list-plate/mailing-archive-list-plate.component';
import {MailingCreatePlateComponent} from './components/mailing-create-plate/mailing-create-plate.component';
import {MailingOtherMailingsListingPlateComponent} from './components/mailing-other-mailings-listing-plate/mailing-other-mailings-listing-plate.component';
import {MailingCurrentActiveMailingComponent} from './components/mailing-current-active-mailing/mailing-current-active-mailing.component';
import {PageMailingEditComponent} from './routes/page-mailing-edit/page-mailing-edit.component';
import { MailingUserListCartComponent } from './components/mailing-user-list-cart/mailing-user-list-cart.component';
import { MailingUserListingPreviewComponent } from './components/mailing-user-listing-preview/mailing-user-listing-preview.component';
import { PopupMailingStopComponent } from './components/popups/popup-mailing-stop/popup-mailing-stop.component';
import { PopupChatSortMenuComponent } from './components/popups/popup-chat/popup-chat-sort-menu/popup-chat-sort-menu.component';
import { PopupChatFoldersComponent } from './components/popups/popup-chat/popup-chat-folders/popup-chat-folders.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

const config: SocketIoConfig = {url: 'https://api.test.denim.cc:6676/dialog', options: {}};

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
    PreloaderComponent,
    PageMailingComponent,
    PageProfileViewsComponent,
    ChatListComponent,
    PopupChatComponent,
    PaginationComponent,
    MassMediaComponent,
    PopupNoticeConfirmedPhotosComponent,
    PopupRegBeforeFilterByOnlineComponent,
    PopupRegBeforeFilterByRealPhotoComponent,
    PageBlogComponent,
    BlogItemCartComponent,
    BlogBottomCategoriesComponent,
    PageBlogItemComponent,
    CommentsComponent,
    BottomGridComponent,
    PopupConfirmPhotoComponent,
    PreloaderLineComponent,
    PopupRegToDialogComponent,
    PopupSaveSearchComponent,
    MainInstallAppComponent,
    MainCarouselComponent,
    IndexPanelViewsComponent,
    IndexPanelBlogComponent,
    IndexPanelDayPersonComponent,
    IndexPanelChatListComponent,
    IndexPanelMailingFeedbackComponent,
    MailingFeedbacksCarouselComponent,
    PopupMailingBlacklistComponent,
    MailingArchiveListPlateComponent,
    MailingCreatePlateComponent,
    MailingOtherMailingsListingPlateComponent,
    MailingCurrentActiveMailingComponent,
    PageMailingEditComponent,
    MailingUserListCartComponent,
    MailingUserListingPreviewComponent,
    PopupMailingStopComponent,
    PopupChatSortMenuComponent,
    PopupChatFoldersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutes,
    HttpModule,
    JsonpModule,
    FormsModule,
    ReactiveFormsModule,
    OwlModule,
    PerfectScrollbarModule.forRoot(PERFECT_SCROLLBAR_CONFIG),
    SocketIoModule.forRoot(config),
    IonRangeSliderModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    StorageService,
    UserService,
    UsersService,
    BackendProvider,
    MockBackend,
    BaseRequestOptions,
    PopupsService,
    PageLoaderService,
    DateService,
    EnumsService,
    DialogService,
    UrlParserService,
    MailingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
