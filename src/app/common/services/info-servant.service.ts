import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ReturnedData, User, CommentPage, UserPage } from "src/app/ReturnedData";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { ConstantsService } from "./constants.service";

@Injectable({
  providedIn: "root"
})
export class InfoServantService {
  constructor(
    private httpClient: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private _constant: ConstantsService
  ) {
    this.httpClient = httpClient;
  }

  getUsers(page: number) {
    let subUrl = this._constant.ip + "/users?page=" + page;
    return this.httpClient.get<UserPage>(subUrl, {
      headers: this._constant.token,
      observe: "response"
    });
  }

  getUserComments(id: Number) {
    let url = this._constant.ip + "/comments/?user_id=" + id;
    return this.httpClient.get<ReturnedData>(url, {
      headers: this._constant.token,
      observe: "response"
    });
  }

  getUser() {
    let url = this._constant.ip + "/user";
    return this.httpClient.get<User>(url, {
      headers: this._constant.token,
      observe: "response"
    });
  }

  getComments(page?: number){
    let url = this._constant.ip + "/comments/?page" + page;
    return this.httpClient.get<CommentPage>(url, {
      headers: this._constant.token,
      observe: 'response'
    });
  }
}
