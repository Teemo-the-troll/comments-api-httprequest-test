import { Component, OnInit } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { ReturnedData, User, Comment } from "src/app/ReturnedData";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { ConstantsService } from "../common/services/constants.service";
import { isNull } from "util";
import { InfoServantService } from "../common/services/info-servant.service";

@Component({
  selector: "app-client",
  templateUrl: "./client.component.html",
  styleUrls: ["./client.component.scss"],
})
export class ClientComponent implements OnInit {
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private _constant: ConstantsService,
    public servant: InfoServantService
  ) {
    this.httpClient = httpClient;
    this.access_token = this._constant.access_token;
    this.token = this.token.set("User_token", this._constant.access_token);
  }

  public tmpArray: User[] = [];

  private token = new HttpHeaders().set(
    "User_token",
    this._constant.access_token
  );

  access_token: string;
  user_id: number;
  id_sendTo: number;
  sendTo;
  user_email;
  username: string;
  comment: string;
  search: string;
  commentToChange: string;
  IDToChange: number;
  IDToDelete: number;
  pages: number[] = [];

  pstComment(user: User) {
    let body = {
      body: this.comment,
      user_id: user.id, //TVOJE ID ZDE
    };

    let url = this._constant.ip + "/comments";

    this.httpClient
      .post(url, body, {
        headers: this._constant.token,
        observe: "response",
      })
      .subscribe((data) => {
        alert("Message successfully sent to user " + user.username);
      });
  }

  //edits a comment
  editComment() {
    //get the whole comment by its ID,
    let url = this._constant.ip + "/comments/" + this.IDToChange;

    this.httpClient //get comment
      .get<Comment>(url, { headers: this._constant.token, observe: "response" })
      .subscribe(
        (data) => {
          let body = {
            //edit it
            user_id: data.body.id,
            body: this.commentToChange,
            author_id: {
              id: this.user_id,
              email: this.user_email,
              username: this.username,
            },
          };
          this.httpClient //send back
            .put<ReturnedData>(url, body, {
              headers: this._constant.token,
              observe: "response",
            })
            .subscribe((error) => {
              console.log(error);
            });
        },
        (error) => {
          console.log(error);
        }
      );
  }
  /**
   *deletes a comment
   */
  deleteComment() {
    let url = this._constant.ip + "/comments/" + this.IDToDelete;
    this.httpClient
      .delete(url, { headers: this._constant.token, observe: "response" })
      .subscribe();
  }

  logOut() {
    let url = this._constant.ip + "/session/logout";
    this.httpClient
      .delete(url, { headers: this._constant.token, observe: "response" })
      .subscribe();
  }

  get page() {
    return this.pages;
  }

  get users() {
    return this.tmpArray.filter((i) => {
      return i.username != null;
    });
  }

  pageRefresh(page: number) {
    this.servant.getUsers(page).subscribe(
      (data) => (this.tmpArray = data.body.users),
      (error) => console.log(error)
    );
  }

  popup(user: User) {
    this.comment = prompt(
      "What do you want to tell this user? (Please note that the message must be at least 10 characters long)"
    );
    this.pstComment(user);
  }

  ngOnInit(): void {
    if (sessionStorage.getItem("User-token") !== ("" || null)) {
      this.token = this.token.set(
        "User-token",
        sessionStorage.getItem("User-token")
      );
    }

    this.servant.getUsers(0).subscribe(
      (data) => {
        this.tmpArray = data.body.users;
        for (let i = 0; i < data.body.page_count + 1; i++) {
          this.pages.push(i + 1);
        }
      },
      (error) => {
        console.log(error);
        if (error.status === 401) {
        } else this.router.navigate(["/login"]);
      }
    );
  }
}
