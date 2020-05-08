import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { IStoryData } from './interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ServiceService {
  private baseUrl: string = "https://hacker-news.firebaseio.com/v0/";

  constructor(private http: HttpClient) { }

  getCurrentStory(id: number): Observable<IStoryData> {
    return this.http.get<IStoryData>(`${this.baseUrl}item/${id}.json?print=pretty`)
  }

  getStoriesList(paginate) {
    return this.http.get(`${this.baseUrl}topstories.json?print=pretty`)
      .pipe(
        map(data => this.getPaginatedData(data, paginate)))
  }

  private getPaginatedData(list, paginate) {
    return list.slice(0, paginate)
  }

}
