import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CategoryDTO } from 'src/app/Models/category.dto';
import { CategoryService } from 'src/app/Services/category.service';
import { SharedService } from 'src/app/Services/shared.service';
import { AppState, selectUserId } from 'src/app/Store/auth/auth.selectors';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss'],
})
export class CategoriesListComponent {
  categories!: CategoryDTO[];

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private sharedService: SharedService,
    private store: Store<AppState>,
  ) {
    this.loadCategories();
  }

  private loadCategories(): void {
    this.store
      .select(selectUserId)
      .pipe(take(1))
      .subscribe((userId) => {
        if (!userId) return;

        this.categoryService.getCategoriesByUserId(userId).subscribe({
          next: (categories) => (this.categories = categories),
          error: (error: any) => this.sharedService.errorLog(error.error),
        });
      });
  }

  createCategory(): void {
    this.router.navigateByUrl('/user/category/');
  }

  updateCategory(categoryId: string): void {
    this.router.navigateByUrl('/user/category/' + categoryId);
  }

  deleteCategory(categoryId: string): void {
    // show confirmation popup
    let result = confirm(
      'Confirm delete category with id: ' + categoryId + ' .',
    );
    if (result) {
      this.categoryService.deleteCategory(categoryId).subscribe({
        next: (rowsAffected) => {
          if (rowsAffected.affected > 0) {
            this.loadCategories();
          }
        },
        error: (error: any) => this.sharedService.errorLog(error.error),
      });
    }
  }
}
