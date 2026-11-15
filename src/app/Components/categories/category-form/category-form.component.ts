import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { CategoryDTO } from 'src/app/Models/category.dto';
import { CategoryService } from 'src/app/Services/category.service';
import { SharedService } from 'src/app/Services/shared.service';
import { AppState, selectUserId } from 'src/app/Store/auth/auth.selectors';

type CategoryFormModel = {
  title: FormControl<string>;
  description: FormControl<string>;
  css_color: FormControl<string>;
};

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent implements OnInit {
  category: CategoryDTO;
  title: FormControl<string>;
  description: FormControl<string>;
  css_color: FormControl<string>;

  categoryForm: FormGroup<CategoryFormModel>;
  isValidForm: boolean | null;

  private isUpdateMode: boolean;
  private categoryId: string | null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService,
    private formBuilder: NonNullableFormBuilder,
    private router: Router,
    private sharedService: SharedService,
    private store: Store<AppState>,
  ) {
    this.isValidForm = null;
    this.categoryId = this.activatedRoute.snapshot.paramMap.get('id');
    this.category = new CategoryDTO('', '', '');
    this.isUpdateMode = false;

    this.title = new FormControl(this.category.title, {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(55)],
    });

    this.description = new FormControl(this.category.description, {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(255)],
    });

    this.css_color = new FormControl(this.category.css_color, {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(7)],
    });

    this.categoryForm = this.formBuilder.group({
      title: this.title,
      description: this.description,
      css_color: this.css_color,
    });
  }

  ngOnInit(): void {
    // update
    if (this.categoryId) {
      this.isUpdateMode = true;
      this.categoryService.getCategoryById(this.categoryId).subscribe({
        next: (category) => {
          this.category = category;
          this.title.setValue(this.category.title);
          this.description.setValue(this.category.description);
          this.css_color.setValue(this.category.css_color);
        },
        error: (error: any) => this.sharedService.errorLog(error.error),
      });
    }
  }

  private editCategory(): void {
    if (this.categoryId) {
      this.store
        .select(selectUserId)
        .pipe(take(1))
        .subscribe((userId) => {
          if (!userId) return;

          this.category.userId = userId;
          this.categoryService
            .updateCategory(this.categoryId!, this.category)
            .subscribe({
              next: async () => {
                await this.sharedService.managementToast(
                  'categoryFeedback',
                  true,
                );
                this.router.navigateByUrl('categories');
              },
              error: (error: any) => {
                this.sharedService.errorLog(error.error);
                this.sharedService.managementToast(
                  'categoryFeedback',
                  false,
                  error.error,
                );
              },
            });
        });
    }
  }

  private createCategory(): void {
    this.store
      .select(selectUserId)
      .pipe(take(1))
      .subscribe((userId) => {
        if (!userId) return;

        this.category.userId = userId;
        this.categoryService.createCategory(this.category).subscribe({
          next: async () => {
            await this.sharedService.managementToast('categoryFeedback', true);
            this.router.navigateByUrl('categories');
          },
          error: (error: any) => {
            this.sharedService.errorLog(error.error);
            this.sharedService.managementToast(
              'categoryFeedback',
              false,
              error.error,
            );
          },
        });
      });
  }

  saveCategory(): void {
    this.isValidForm = false;

    if (this.categoryForm.invalid) {
      return;
    }

    this.isValidForm = true;
    const { title, description, css_color } = this.categoryForm.getRawValue();
    this.category = new CategoryDTO(title, description, css_color);

 
    if (this.isUpdateMode) {
      this.editCategory();
    } else {
      this.createCategory();
    }
  }
}
