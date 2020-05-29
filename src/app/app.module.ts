import { TopStoriesEffects } from './store/effects/top-stories.effects';
import { ApiService } from './shared/api.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { StoryComponent } from './components/story/story.component';
import { CommentComponent } from './components/comment/comment.component';
import { StoriesComponent } from './pages/stories/stories.component';
import { CommonModule } from '@angular/common';
import { storiesReducer } from "./store/reducers/top-stories.reducer";
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { CommentsComponent } from './pages/comments/comments.component';
import { TakeUrlPipe } from './shared/pipes/take-url.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    StoryComponent,
    CommentComponent,
    StoriesComponent,
    CommentsComponent,
    TakeUrlPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    StoreModule.forRoot({
      state: storiesReducer
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([TopStoriesEffects])
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
