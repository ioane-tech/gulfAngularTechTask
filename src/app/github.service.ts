// github.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  private api = 'https://api.github.com/search/repositories';

  constructor(private http: HttpClient) {}

  searchRepositories(query: string, perPage: number = 30, page: number = 1): Observable<any> {
    return this.http.get<any>(`${this.api}?q=${query}&per_page=${perPage}&page=${page}`);
  }

  getRepositoryDetails(repoName: string): Observable<any> {
    return this.http.get<any>(`https://api.github.com/repos/${repoName}`);
  }
}
