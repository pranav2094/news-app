import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatButtonModule, MatCardModule, MatDatepickerModule,MatDialogModule,MatFormFieldModule,MatIconModule,MatInputModule,MatNativeDateModule,MatSelectModule,MAT_DATE_LOCALE} from '@angular/material';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AppComponent } from './app.component';
import { AlertComponent } from './_components';
import { HomeComponent } from './home';
import { GhostListComponent } from './home/ghost-list/ghost-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// import { NewsDetailsComponent } from './news-details/news-details.component';



@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatCardModule,
        MatInputModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatDialogModule,
        MatButtonModule,
        FormsModule,
        MatIconModule,
      
      
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        GhostListComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule { };