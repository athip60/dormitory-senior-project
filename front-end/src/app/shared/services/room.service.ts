import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const ROOM_API = 'http://localhost:8080/api/room/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(public http: HttpClient) { }
  // สร้างห้องใหม่
  createRoom(token, data): Observable<any> {
    return this.http.post(`${ROOM_API}create`, data, { headers: { 'x-access-token': JSON.parse(JSON.stringify(token)) } });
  }

  // แสดงข้อมูลห้องทั้งใน table room
  findAll(token): Observable<any> {
    return this.http.get(ROOM_API, { headers: { 'x-access-token': JSON.parse(JSON.stringify(token)) } });
  }
  // อัพเดทห้อง
  updateRoom(token, data, id): Observable<any> {
    return this.http.put(`${ROOM_API}update/${id}`, data, { headers: { 'x-access-token': JSON.parse(JSON.stringify(token)) } });
  }

  deleteRoom(token, id): Observable<any> {
    return this.http.delete(`${ROOM_API}delete/${id}`, { headers: { 'x-access-token': JSON.parse(JSON.stringify(token)) } });
  }

  // หาข้อมูลห้องจากเลขห้องมาแสดงในฝั่งขวาของฝั่งห้อง
  findByRoom(token, rid): Observable<any> {
    return this.http.get(`${ROOM_API}getbyroom/${rid}`, { headers: { 'x-access-token': JSON.parse(JSON.stringify(token)) } });
  }

  // หาข้อมูลห้องจากเลขห้องมาแสดงในฝั่งขวาของฝั่งห้อง
  findById(token, id): Observable<any> {
    return this.http.get(`${ROOM_API}getbyid/${id}`, { headers: { 'x-access-token': JSON.parse(JSON.stringify(token)) } });
  }

  checkRoomNumber(token, room_number): Observable<any> {
    return this.http.get(`${ROOM_API}check-room-number/${room_number}`, { headers: { 'x-access-token': JSON.parse(JSON.stringify(token)) } });
  }
}
