import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  APIURL ='http://localhost:3000/user'
  constructor(private http: HttpClient) { }

  getAllUsers() {
    return this.http.get(this.APIURL)
  }

  getUserById(id: any) {
    // return this.http.get(this.APIURL + '/' + id)
    return this.http.get(`${ this.APIURL }/${ id }`)
  }

  saveUser(data: any) {
    return this.http.post(this.APIURL, data)
  }

  updateUser(id: any, data: any) {
    return this.http.put(`${ this.APIURL }/${ id }`, data)
  }

  deleteUser(id: any) {
    return this.http.delete(`${ this.APIURL }/${ id }`)
  }
}

