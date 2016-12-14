import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { TileTestComponent } from './tile-test/tile-test.component';
import { BoardTestComponent } from './board-test/board-test.component';
import { HomeComponent } from './home/home.component';


const appRoutes: Routes = [
    { path: 'board-test', component: BoardTestComponent },
    { path: 'tile-test', component: TileTestComponent },
    { path: '', component: HomeComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    TileTestComponent,
    BoardTestComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
