import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { first } from 'rxjs/operators';
import { User } from '../../models/user';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Category } from '../../models/category';
import { CategoryService } from 'src/app/core/services/category.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  displayedUserColumns: string[] = ['id', 'username', 'email', 'isadmin'];
  userDataSource: MatTableDataSource<User> = new MatTableDataSource([]);
  @ViewChild('userPaginator') userPaginator: MatPaginator;
  @ViewChild('userTable') userSort: MatSort;

  displayedCatColumns: string[] = ['cid', 'name', 'description'];
  catDataSource: MatTableDataSource<Category> = new MatTableDataSource([]);
  @ViewChild('catPaginator') catPaginator: MatPaginator;
  @ViewChild('catTable') catSort: MatSort;

  constructor(private userService: UserService, private categoryService: CategoryService) { }

  ngOnInit() {
    this.userDataSource.paginator = this.userPaginator;
    this.userDataSource.sort = this.userSort;
    this.loadAllUsers();

    this.catDataSource.paginator = this.catPaginator;
    this.catDataSource.sort = this.catSort;
    this.loadAllCategories();
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
}
