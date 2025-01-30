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
  searchQuery = '';
  repositories: any[] = [];
  isTableView = true;
  isDebouncing = false;

  private searchSubject = new Subject<string>();

  constructor(
    private githubService: GithubService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Handle query parameters for initial search
    this.route.queryParams.subscribe((params) => {
      if (params['query']) {
        this.searchQuery = params['query'];
        this.search();
      }
    });
  
    // Set up debouncing for the search input
    this.searchSubject.pipe(debounceTime(500)).subscribe((query) => {
      this.githubService.searchRepositories(query).subscribe((data) => {
        this.repositories = data.items;
        this.isDebouncing = false;
      });
    });
  }

  onSearchChange() {
    this.isDebouncing = true;
    this.searchSubject.next(this.searchQuery);
  }

  search() {
    this.githubService.searchRepositories(this.searchQuery).subscribe((data) => {
      this.repositories = data.items;
    });
  }

  goToDetail(repo: any) {
    this.router.navigate(['/detail', repo.full_name]);
  }
}
