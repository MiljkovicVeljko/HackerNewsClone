import { ApiService } from './../../shared/api.service';
import { Component, OnInit, Input } from '@angular/core';
import { storyItem } from 'src/app/store/models/story-item.model';
<<<<<<< HEAD
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
=======
>>>>>>> 95626ba9469b96c015fd89646a3e764250972581

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})
export class StoryComponent implements OnInit {
  @Input() story: storyItem;
<<<<<<< HEAD


  constructor(private router: Router) {}

  ngOnInit(): void {}

  onShowComments(currentId) {
    this.router.navigate([`comments/${currentId}`])
=======
  constructor() {
  }

  ngOnInit(): void {
>>>>>>> 95626ba9469b96c015fd89646a3e764250972581
  }
}
