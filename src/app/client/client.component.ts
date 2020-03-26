import { Component, OnInit } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";
import { ReturnedData, User, Comment } from "src/app/ReturnedData";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { ConstantsService } from "../common/services/constants.service";
import { isNull } from "util";

@Component({
  selector: "app-client",
  templateUrl: "./client.component.html",
  styleUrls: ["./client.component.scss"]
})
export class ClientComponent implements OnInit {
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private _constant: ConstantsService
  ) {
    this.httpClient = httpClient;
    this.access_token = this._constant.access_token;
  }

  access_token;
  user_id;
  id_sendTo;
  sendTo;
  user_email;
  username;
  comment;
  search;
  commentToChange;
  IDToChange;
  IDToDelete;

  postComment() {
    let id;
    let idToFind;
    let name;
    let wasSent = false;
    let url = this._constant.ip + "/comments";
    let header = new HttpHeaders().set(
      "User_token",
      this._constant.access_token
    );
    for (let i = 0; i < this._constant.usersArray.length; i++) {
      const localUser: User = (this._constant.usersArray[i] as unknown) as User;

      if (isNaN(Number(this.sendTo))) {
        name = localUser.username;
        idToFind = this.sendTo;
      } else {
        name = localUser.id;
        idToFind = Number(this.sendTo);
      }

      if (name === idToFind) {
        wasSent = true;
        let body = {
          user_id: localUser.id,
          body: this.comment,
          author_id: {
            id: this.user_id,
            email: this.user_email,
            username: this.username
          }
        };
        this.httpClient
          .post<ReturnedData>(url, body, {
            headers: header,
            observe: "response"
          })
          .subscribe(error => {
            console.log(error);
          });
      }
    }
    if (!wasSent) {
      alert("no user with you inputed id or username exists, please try again");
    }
  }

  editComment() {
    //get the whole comment by its ID,
    let url = this._constant.ip + "/comments/" + this.IDToChange;
    let header = new HttpHeaders().set(
      "User_token",
      this._constant.access_token
    );
    this.httpClient
      .get<Comment>(url, { headers: header, observe: "response" })
      .subscribe(
        data => {
          let body = {
            user_id: data.body.id,
            body: this.commentToChange,
            author_id: {
              id: this.user_id,
              email: this.user_email,
              username: this.username
            }
          };
          this.httpClient
            .put<ReturnedData>(url, body, {
              headers: header,
              observe: "response"
            })
            .subscribe(error => {
              console.log(error);
            });
        },
        error => {
          console.log(error);
        }
      );
  }

  deleteComment() {
    let url = this._constant.ip + "/comments/" + this.IDToDelete;
    let header = new HttpHeaders().set(
      "User_token",
      this._constant.access_token
    );
    this.httpClient
      .delete(url, { headers: header, observe: "response" })
      .subscribe();
  }

  logOut() {
    let url = this._constant.ip + "/session/logout";
    let header = new HttpHeaders().set(
      "User_token",
      this._constant.access_token
    );
    this.httpClient
      .delete(url, { headers: header, observe: "response" })
      .subscribe();
  }

  getUserComments(id: Number) {
    let url = this._constant.ip + "/comments/?user_id=" + id;
    const body = new HttpHeaders().set(
      "User_token",
      this._constant.access_token
    );
    this.httpClient
      .get<ReturnedData>(url, { headers: body, observe: "response" })
      .subscribe(
        data => {
          const container = document.getElementById("comments");
          for (let i = 0; i < data.body.comments.length; i++) {}
          // make a row for each comment
          //author_id.username + " has sent you: " +
        },
        error => {
          console.log(error);
        }
      );
  }

  getUserInfo() {
    let url = this._constant.ip + "/user/";
    const body = new HttpHeaders().set(
      "User_token",
      this._constant.access_token
    );
    this.httpClient
      .get<User>(url, { headers: body, observe: "response" })
      .subscribe(
        data => {
          this.user_email = data.body.email;
          this.user_id = data.body.id;
          this.username = data.body.username;
        },
        error => {
          console.log(error);
        }
      );
  }

  ngOnInit(): void {
    this._constant.getUsers(); //get all users and store them

    this.getUserInfo(); //get info about the logged user => store them for use in posting and getting comments
    setTimeout(() => {
      this.getUserComments(this.user_id);
      for (let index = 0; index < this._constant.usersArray.length; index++) {
        console.log(index);

        const localUser: User = (this._constant.usersArray[
          index
        ] as unknown) as User;
        if (!isNull(localUser.username)) {
          const container = document.getElementById("users");

          let subcontainer = document.createElement("div");
          let Username = document.createElement("p");
          let icon = document.createElement("i");
          let button = document.createElement("button");
          let input_container = document.createElement("div");
          let input = document.createElement("input");

          input.setAttribute("type", "text");
          input.setAttribute(
            "placeholder",
            "What do you want to tell this user?"
          );
          input_container.classList.add(
            "bg-light",
            "rounded",
            "m-3",
            "content"
          );
          input_container.appendChild(input);

          subcontainer.classList.add("bg-light", "rounded", "m-3");

          Username.innerHTML = localUser.username;
          icon.classList.add("far", "fa-edit");

          button.addEventListener("click", function() {
            this.classList.toggle("active");
            var content: HTMLElement = (subcontainer.nextElementSibling as unknown) as HTMLElement;
            if (content.style.display === "block") {
              content.style.display = "none";
            } else {
              content.style.display = "block";
            }
          });

          button.classList.add("collapsible");
          button.appendChild(icon);
          Username.appendChild(button);
          subcontainer.appendChild(Username);
          container.appendChild(subcontainer);
          container.appendChild(input_container);
        }
      }
    }, 5000);
    console.log(this._constant.access_token);
  }
}
