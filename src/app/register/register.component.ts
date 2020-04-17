import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  constructor(private httpClient: HttpClient, private router: Router) {
    this.httpClient = httpClient;
  }

  username;
  email;
  password;
  passconf;

  sendReg() {
    let body = {
      email: this.email,
      username: this.username,
      password: this.password,
      password_confirmation: this.passconf
    };

    let url = "http://85.160.64.233:3000/session/register";

    this.httpClient.post(url, body).subscribe(
      (data) => {
        this.router.navigate(["/login"]);
      },
      error => {
        console.log(error);
      }
    );

    //var password = document.getElementById("pass").value;
    //var username = document.getElementById("username").value;
    //var passwordConfirm = document.getElementById("passconf").value;
  }
  ngOnInit(): void {}
}
