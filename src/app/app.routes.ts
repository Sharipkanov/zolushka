import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageHomeComponent } from './routes/page-home/page-home.component';
import { PageNotFoundComponent } from './routes/page-not-found/page-not-found.component';
import { PageRegistrationComponent } from './routes/page-registration/page-registration.component';
import { PageSearchComponent } from './routes/page-search/page-search.component';
import { PageComponentsComponent } from './routes/page-components/page-components.component';
import { PageAboutComponent } from './routes/page-about/page-about.component';
import { PageProfileComponent } from './routes/page-profile/page-profile.component';
import { PageProfileEditComponent } from './routes/page-profile-edit/page-profile-edit.component';

const appRoutes: Routes = [
    { path: '', component: PageHomeComponent, pathMatch: 'full' },
    { path: 'registration', component: PageRegistrationComponent },
    { path: 'search', component: PageSearchComponent },
    { path: 'components', component: PageComponentsComponent },
    { path: 'about', component: PageAboutComponent },
    { path: 'profile', component: PageProfileComponent },
    { path: 'profile-edit', component: PageProfileEditComponent },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutes {}
