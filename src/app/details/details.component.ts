import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GithubService } from '../github.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-detail',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  imports: [CommonModule],
})
export class DetailsComponent implements OnInit {
  repository: any;
  repoNotFound:boolean = false
  loading:boolean = true
  errorMessage:string = ''

  constructor(
    private route: ActivatedRoute,
    private githubService: GithubService
  ) {}

  ngOnInit() {
    const repoName = this.route.snapshot.paramMap.get('repoName')!;
    this.githubService.getRepositoryDetails(repoName).subscribe({
      next:(data) => {
        this.repository = data;
        this.loading = false
      },
      error:(err)=>{
        console.error(err)
        this.errorMessage = err.error.message
        this.repoNotFound = true
        this.loading = false
      }
    });
  }
}
