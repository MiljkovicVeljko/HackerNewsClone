import { Component, OnInit, Input } from '@angular/core';
import { commentItem } from 'src/app/store/models/app-state.model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() comment: commentItem;

  constructor() { }

  ngOnInit(): void {
  }

}
