import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GithubService } from '../github.service';
import { debounceTime, Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-landing',
  imports: [FormsModule, CommonModule],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent {
  repositories: any[] = [];
  isTableView = true;
  isDebouncing = false;
  dataNotFound = false;

  loading:boolean = false
  errorMessage:string = ''

  //github api variables
  searchQuery = '';
  totalResults = 0;
  currentPage = 1;
  perPage = 30;

  private searchSubject = new Subject<string>();

  constructor(
    private githubService: GithubService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    // query parameters for search
    this.route.queryParams.subscribe((params) => {
      if (params['query']) {
        this.searchQuery = params['query'];
        this.search();
      }
    });
  
    //debouncing for the search input
    this.searchSubject.pipe(debounceTime(500)).subscribe((query) =>{
      this.searchRepositories(query);
    });

  }

  //search function
  searchRepositories(query: string) {
    this.githubService.searchRepositories(query, this.perPage, this.currentPage).subscribe({
      next: (data) => this.handleSearchResponse(data),
      error: (err) => this.handleErrorResponse(err),
    });
  }

  //search response handling
  handleSearchResponse(data: any) {
    if (data.items.length === 0) {
      this.dataNotFound = true;
    } else {
      this.dataNotFound = false;
    }
    this.repositories = data.items;
    this.totalResults = data.total_count;
    this.isDebouncing = false;
    this.loading = false;
  }
  //search error handling
  handleErrorResponse(err: any) {
    if(this.searchQuery.length > 0){
      this.errorMessage = err.error.message
    }
    console.error('Error fetching repositories:', err);
    this.repositories = [];
    this.isDebouncing = false;
    this.totalResults = 0
    this.dataNotFound = false;
    this.loading = false;
  }

  //search change
  onSearchChange() {
    this.loading = true
    this.errorMessage = '';
    this.isDebouncing = true;
    this.searchSubject.next(this.searchQuery);
  }

  //search functionality
  search() {
    this.loading = true
    this.errorMessage = '';
    this.githubService.searchRepositories(this.searchQuery, this.perPage, this.currentPage).subscribe({
      next: (data) => this.handleSearchResponse(data),
      error: (err) => this.handleErrorResponse(err),
    });
  }

  //detail navigation
  goToDetail(repo: any) {
    this.router.navigate(['/detail', repo.full_name]);
  }

  //next page
  nextPage() {
    if ((this.currentPage * this.perPage) < this.totalResults) {
      this.currentPage++;
      this.searchRepositories(this.searchQuery);
    }
  }

  // previous page
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.searchRepositories(this.searchQuery);
    }
  }
}
