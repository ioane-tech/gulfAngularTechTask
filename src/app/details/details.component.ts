import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GithubService } from '../github.service';

@Component({
  selector: 'app-detail',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  repository: any;

  constructor(
    private route: ActivatedRoute,
    private githubService: GithubService
  ) {}

  ngOnInit() {
    const repoName = this.route.snapshot.paramMap.get('repoName')!;
    this.githubService.getRepositoryDetails(repoName).subscribe((data) => {
      this.repository = data;
    });
  }
}
