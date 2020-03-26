import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ReturnedData } from "src/app/ReturnedData";
import { Router } from "@angular/router";
import { ConstantsService } from "../common/services/constants.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private _constant: ConstantsService
  ) {
    this.httpClient = httpClient;
  }
  pass;
  email;

  getAcesstoken() {
    let url = this._constant.ip + "/session/login";
    let body = {
      password: this.pass,
      email: this.email
    };
    this.httpClient.post<ReturnedData>(url, body).subscribe(
      data => {
        this._constant.access_token = data.access_token;
        this.router.navigate(["/client"]);
      },
      error => {
        console.log(error);
      }
    );
  }
  ngOnInit(): void {}
}
