import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { PostDTO } from 'src/app/Models/post.dto';
import { PostService } from 'src/app/Services/post.service';
import { SharedService } from 'src/app/Services/shared.service';
import { AppState, selectIsAuthenticated } from 'src/app/Store/auth/auth.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  posts!: PostDTO[];
  readonly isAuthenticated$ = this.store.select(selectIsAuthenticated);

  constructor(
    private postService: PostService,
    private sharedService: SharedService,
    private store: Store<AppState>,
  ) {
    this.loadPosts();
  }

  private loadPosts(): void {
    this.postService.getPosts().subscribe({
      next: (posts) => (this.posts = posts),
      error: (error: any) => this.sharedService.errorLog(error.error),
    });
  }

  like(postId: string): void {
    this.postService.likePost(postId).subscribe({
      next: () => this.loadPosts(),
      error: (error: any) => this.sharedService.errorLog(error.error),
    });
  }

  dislike(postId: string): void {
    this.postService.dislikePost(postId).subscribe({
      next: () => this.loadPosts(),
      error: (error: any) => this.sharedService.errorLog(error.error),
    });
  }
}
