import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { HttpClientInMemoryWebApiModule, HttpInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/in-memory-data.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailsComponent } from './hero-details/hero-details.component';
import { MessagesComponent } from './messages/messages.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroSearchComponent } from './hero-search/hero-search.component';
import { SpinnerwheelComponent } from './spinnerwheel/spinnerwheel.component';
import { HeroEditorComponent } from './hero-editor/hero-editor.component';

@NgModule({
    declarations: [
        AppComponent,
        HeroesComponent,
        HeroDetailsComponent,
        MessagesComponent,
        DashboardComponent,
        HeroSearchComponent,
        SpinnerwheelComponent,
        HeroEditorComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpClientModule,
        HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {dataEncapsulation: false}),
        MatInputModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatAutocompleteModule,
        MatListModule,
        MatGridListModule,
        MatTableModule,
        MatDialogModule,
        MatSnackBarModule,
        MatCardModule,
        MatSidenavModule,
        MatCheckboxModule
    ],
    entryComponents: [HeroEditorComponent],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
