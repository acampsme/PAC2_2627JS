import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { PostService } from 'src/app/Services/post.service';
import { SharedService } from 'src/app/Services/shared.service';
import { AppState, selectUserId } from 'src/app/Store/auth/auth.selectors';
import { PostDTO } from '../../../Models/post.dto';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
})
export class PostsListComponent {
  posts!: PostDTO[];

  constructor(
    private postService: PostService,
    private router: Router,
    private sharedService: SharedService,
    private store: Store<AppState>,
  ) {
    this.loadPosts();
  }
  // TODO 12

  private loadPosts(): void {
    this.store
      .select(selectUserId)
      .pipe(take(1))
      .subscribe((userId) => {
        if (!userId) return;

        this.postService.getPostsByUserId(userId).subscribe({
          next: (posts) => (this.posts = posts),
          error: (error: any) => this.sharedService.errorLog(error.error),
        });
      });
  }

  createPost(): void {
    this.router.navigateByUrl('/user/post');
  }

  updatePost(postId: string): void {
    this.router.navigateByUrl('/user/post/' + postId);
  }

  deletePost(postId: string): void {
    const result = confirm('Confirm delete post with id: ' + postId + ' .');

    if (result) {
      this.postService.deletePost(postId).subscribe({
        next: (rowsAffected) => {
          if (rowsAffected.affected > 0) {
            this.loadPosts();
          }
        },
        error: (error: any) => this.sharedService.errorLog(error.error),
      });
    }
  }
}
