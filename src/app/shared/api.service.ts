import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { storyItem, commentItem } from '../store/models/app-state.model';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private baseUrl: string = "https://hacker-news.firebaseio.com/v0/";

  constructor(private http: HttpClient) { }

  getCurrentStory(id: number): Observable<storyItem> {
    return this.http.get<storyItem>(`${this.baseUrl}item/${id}.json?print=pretty`)
  }

  getStoriesList(paginate): Observable<number> {
    return this.http.get(`${this.baseUrl}topstories.json?print=pretty`)
      .pipe(
        map(data => this.getPaginatedData(data, paginate))
      )
    }

    getCommentsFromApi(ids: number[]) {
    return ids.map(id => this.http.get<commentItem>(`${this.baseUrl}item/${id}.json?print=pretty`))
  }

  private getPaginatedData(list, paginate) {
    return list.slice(0, paginate)
  }

}
