import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
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
      tap(post => this.user$ = this._api.getUserData(post.id)),
      tap(post => this.comments$ = this._api.getPostComments(post.id))
    );
  }

}
