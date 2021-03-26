import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { first, tap } from 'rxjs/operators';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  post$: Observable<any>;
  user$: Observable<any>;
  comments$: Observable<any[]>;
  
  constructor(
    private _api: BlogService,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const {id = null} =  this._route.snapshot.params;
    this.post$ = this._api.getPostById(id).pipe(
      tap(post => this.user$ = this._api.getUserData(post.userId)),
      tap(post => this.comments$ = this._api.getPostComments(post.id)),
    );
  }

  async loadAll(id) {
    const post = await this._api.getPostById(id).pipe(first()).toPromise()
    this.loadComments(post.id);
    this.loadUser(post.userId);
  }

  async loadComments(id) {
    const comments = await this._api.getPostComments(id).pipe(first()).toPromise();
  }
  async loadUser(id) {
    const user = await this._api.getUserData(id).pipe(first()).toPromise();
  }

}
