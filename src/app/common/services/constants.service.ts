import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ReturnedData, User } from "src/app/ReturnedData";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class ConstantsService {
  constructor(
    private httpClient: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.httpClient = httpClient;
    this.token = this.token.set("User-token", sessionStorage.getItem("User-token"));
  }
  access_token: string = "";
  token = new HttpHeaders(); //set na value access_token na 
  ip: string = "http://85.160.64.233:3000";
   
}
