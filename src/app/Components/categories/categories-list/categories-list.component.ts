import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryDTO } from 'src/app/Models/category.dto';
import { CategoryService } from 'src/app/Services/category.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { SharedService } from 'src/app/Services/shared.service';

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
    private localStorageService: LocalStorageService,
    private sharedService: SharedService,
  ) {
    this.loadCategories();
  }

  private loadCategories(): void {
    const userId = this.localStorageService.get('user_id');
    if (userId) {
      this.categoryService.getCategoriesByUserId(userId).subscribe({
        next: (categories) => (this.categories = categories),
        error: (error: any) => this.sharedService.errorLog(error.error),
      });
    }
  }

  createCategory(): void {
    // TODO 7
    this.router.navigateByUrl('/user/category/');
  }

  updateCategory(categoryId: string): void {
    // TODO 8
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
          // TODO 9
            this.loadCategories();
          }
        },
        error: (error: any) => this.sharedService.errorLog(error.error),
      });
    }
  }
}
