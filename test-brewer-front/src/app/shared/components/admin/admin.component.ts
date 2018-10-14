import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { first } from 'rxjs/operators';
import { User } from '../../models/user';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Category } from '../../models/category';
import { CategoryService } from 'src/app/core/services/category.service';
import { AlertService } from 'src/app/core/services/alert.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  displayedUserColumns: string[] = ['id', 'username', 'email', 'is_admin'];
  userDataSource: MatTableDataSource<User> = new MatTableDataSource([]);
  @ViewChild('userPaginator') userPaginator: MatPaginator;
  @ViewChild('userTable') userSort: MatSort;

  displayedCatColumns: string[] = ['id', 'category_name', 'actions'];
  catDataSource: MatTableDataSource<Category> = new MatTableDataSource([]);
  @ViewChild('catPaginator') catPaginator: MatPaginator;
  @ViewChild('catTable') catSort: MatSort;
  catForm: FormGroup;

  constructor(
    private userService: UserService,
    private categoryService: CategoryService,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.userDataSource.paginator = this.userPaginator;
    this.userDataSource.sort = this.userSort;
    this.loadAllUsers();

    this.catDataSource.paginator = this.catPaginator;
    this.catDataSource.sort = this.catSort;
    this.loadAllCategories();

    this.catForm = this.formBuilder.group({
      catName: ['', Validators.required],
    });
  }

  private loadAllUsers() {
    this.userService.getAll().pipe(first()).subscribe((users: User[]) => {
        this.userDataSource.data = users;
    });
  }

  applyUserFilter(filterValue: string) {
    this.userDataSource.filter = filterValue.trim().toLowerCase();
    if (this.userDataSource.paginator) {
      this.userDataSource.paginator.firstPage();
    }
  }

  private loadAllCategories() {
    this.categoryService.getAll().pipe(first()).subscribe((cats: Category[]) => {
        this.catDataSource.data = cats;
    });
  }

  applyCatFilter(filterValue: string) {
    this.catDataSource.filter = filterValue.trim().toLowerCase();
    if (this.catDataSource.paginator) {
      this.catDataSource.paginator.firstPage();
    }
  }

  editUser(event, id: number) {
    this.userService.promote(id, event.checked).pipe(first()).subscribe(
      resp => {
        this.alertService.success(`Sucessfully updated status of user with ID ${id}!`);
      },
      error => {
        this.alertService.error(error);
        event.source.checked = !event.checked;
      }
    );
  }

  deleteCategory(id: number) {
    if (window.confirm(`Are you sure you want to delete category with ID ${id}?`)) {
      this.categoryService.delete(id).pipe(first()).subscribe(
        resp => {
          this.alertService.success('Sucessfully deleted!');
          this.catDataSource.data = this.catDataSource.data.filter(cat => cat.id !== id);
          this.catDataSource.paginator.firstPage();
        },
        error => {
          this.alertService.error(error);
        }
      );
    }
  }

  addCategory() {
    const catName = this.catForm.controls.catName.value;
    this.categoryService.add(catName).pipe(first()).subscribe(
      (resp: Category) => {
        this.alertService.success('Sucessfully inserted!');
        const data = this.catDataSource.data;
        data.push(resp);
        this.catDataSource.data = data;
        this.catDataSource.paginator.lastPage();
        this.catForm.reset();
      },
      error => {
        this.alertService.error(error);
      }
    );
  }

}
