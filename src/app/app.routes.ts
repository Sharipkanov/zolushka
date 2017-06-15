import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageHomeComponent } from './routes/page-home/page-home.component';
import { PageNotFoundComponent } from './routes/page-not-found/page-not-found.component';
import { PageComponentsComponent } from './routes/page-components/page-components.component';
import { PageRegistrationComponent } from './routes/page-registration/page-registration.component';

const appRoutes: Routes = [
    { path: '', component: PageHomeComponent, pathMatch: 'full' },
    { path: 'registration.html', component: PageRegistrationComponent },
    { path: 'components.html', component: PageComponentsComponent },
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
