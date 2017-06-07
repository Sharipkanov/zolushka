import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routes';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { UserCartComponent } from './components/user-cart/user-cart.component';
import { PanelComponent } from './components/panel/panel.component';
import { PageNotFoundComponent } from './routes/page-not-found/page-not-found.component';
import { PageHomeComponent } from './routes/page-home/page-home.component';
import { DownloadBoxComponent } from './components/download-box/download-box.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    UserCartComponent,
    PanelComponent,
    PageNotFoundComponent,
    PageHomeComponent,
    DownloadBoxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutes
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
