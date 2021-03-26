import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(
    private _http: HttpClient
  ) { }

  getAllPosts() {
    return this._http.get<any[]>('https://jsonplaceholder.typicode.com/posts');
  }

  getPostById(id: string) {
    return this._http.get<any>('https://jsonplaceholder.typicode.com/posts/' + id);
  }

  getUserData(id: string)  {
    return this._http.get<any>('https://jsonplaceholder.typicode.com/users/' + id);
  }

  getPostComments(postId: string)  {
    return this._http.get<any[]>('https://jsonplaceholder.typicode.com/comments?postId=' + postId);
  }
}
