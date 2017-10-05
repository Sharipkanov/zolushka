import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {PageHomeComponent} from './routes/page-home/page-home.component';
import {PageNotFoundComponent} from './routes/page-not-found/page-not-found.component';
import {PageRegistrationComponent} from './routes/page-registration/page-registration.component';
import {PageSearchComponent} from './routes/page-search/page-search.component';
import {PageComponentsComponent} from './routes/page-components/page-components.component';
import {PageAboutComponent} from './routes/page-about/page-about.component';
import {PageProfileComponent} from './routes/page-profile/page-profile.component';
import {PageProfileEditComponent} from './routes/page-profile-edit/page-profile-edit.component';
import {UserService} from './services/user/user.service';
import {PageMailingComponent} from './routes/page-mailing/page-mailing.component';
import {PageProfileViewsComponent} from './routes/page-profile-views/page-profile-views.component';
import {PageBlogComponent} from './routes/page-blog/page-blog.component';
import {PageBlogItemComponent} from './routes/page-blog-item/page-blog-item.component';
import { PageMailingEditComponent } from './routes/page-mailing-edit/page-mailing-edit.component';

const appRoutes: Routes = [
    {path: '', component: PageHomeComponent, pathMatch: 'full'},
    {path: 'registration', component: PageRegistrationComponent},
    {path: 'search', component: PageSearchComponent},
    {path: 'components', component: PageComponentsComponent},
    {path: 'about', component: PageAboutComponent},
    {path: 'profile/he/:profile_id', component: PageProfileComponent},
    {path: 'profile/she/:profile_id', component: PageProfileComponent},
    {path: 'profile', component: PageProfileComponent, canActivate: [UserService]},
    {path: 'profile-edit', component: PageProfileEditComponent, canActivate: [UserService]},
    {path: 'profile-views', component: PageProfileViewsComponent, canActivate: [UserService]},
    {path: 'mailing', component: PageMailingComponent, canActivate: [UserService]},
    {path: 'mailing/edit/:mailing_id', component: PageMailingEditComponent, canActivate: [UserService]},
    {path: 'blog', component: PageBlogComponent},
    {path: 'blog/:slug', component: PageBlogItemComponent},
    {path: '**', component: PageNotFoundComponent}
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutes {
}
