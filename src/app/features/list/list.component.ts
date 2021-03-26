import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  posts$: Observable<any[]>;
  constructor(
    private _api: BlogService
  ) { }

  ngOnInit(): void {
    this.posts$ = this._api.getAllPosts();
  }

}
