import { take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { IStoryData } from './interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ServiceService {

  constructor(private http: HttpClient) { }

  getCurrentStory(id: number): Observable<IStoryData> {
    return this.http.get<IStoryData>(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
  }
  getStoriesList() {
    return this.http.get(`https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty`)
  }
}
