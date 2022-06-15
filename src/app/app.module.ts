import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FightCardDesktopComponent } from './fight-card-desktop/fight-card-desktop.component';
import { TimelineComponent } from './timeline/timeline.component';

// application routes
const appRoutes: Routes = [
  {
    path: 'fight-card',
    component: FightCardDesktopComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    FightCardDesktopComponent,
    TimelineComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { onSameUrlNavigation: 'reload' } //full server reload if router tries to navigate to current route
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}
