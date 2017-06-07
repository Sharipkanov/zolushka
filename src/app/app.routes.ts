import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageHomeComponent } from './routes/page-home/page-home.component';
import { PageNotFoundComponent } from './routes/page-not-found/page-not-found.component';

const appRoutes: Routes = [
    { path: '', component: PageHomeComponent, pathMatch: 'full' },
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
