import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;

  constructor(private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.userService.getById(id).pipe(first()).subscribe(resp => {
      this.user = resp;
      console.log('response', resp);
    });

  }

}
