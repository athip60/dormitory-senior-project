import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const COMMENT_API = 'http://localhost:8080/api/comment/';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(public http: HttpClient) { }

  // comment function

  viewComment(token, id): Observable<any> {
    return this.http.get(`${COMMENT_API}${id}`, { headers: { 'x-access-token': JSON.parse(JSON.stringify(token)) } });
  }

  createComment(token, data): Observable<any> {
    return this.http.post(`${COMMENT_API}`, data, { headers: { 'x-access-token': JSON.parse(JSON.stringify(token)) } });
  }

  updateComment(token, data): Observable<any> {
    return this.http.put(`${COMMENT_API}${data.id}`, data, { headers: { 'x-access-token': JSON.parse(JSON.stringify(token)) } });
  }

  deleteComment(token, id): Observable<any> {
    return this.http.delete(`${COMMENT_API}${id}`, { headers: { 'x-access-token': JSON.parse(JSON.stringify(token)) } });
  }

  deleteCommentAll(token, id): Observable<any> {
    return this.http.delete(`${COMMENT_API}delete/all/${id}`, { headers: { 'x-access-token': JSON.parse(JSON.stringify(token)) } });
  }

}

