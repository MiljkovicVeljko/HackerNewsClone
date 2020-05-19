import { CommentsComponent } from './pages/comments/comments/comments.component';
import { StoriesComponent } from './pages/stories/stories.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: "", component: StoriesComponent},
  {path: "news", component: StoriesComponent},
  {path: "comments/:id", component: CommentsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
