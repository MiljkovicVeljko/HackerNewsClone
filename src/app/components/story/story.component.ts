import { ApiService } from './../../shared/api.service';
import { Component, OnInit, Input } from '@angular/core';
import { storyItem } from 'src/app/store/models/story-item.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})
export class StoryComponent implements OnInit {
  @Input() story: storyItem;


  constructor(private router: Router) {}

  ngOnInit(): void {}

  onShowComments(currentId) {
    this.router.navigate([`comments/${currentId}`])
  }
}
