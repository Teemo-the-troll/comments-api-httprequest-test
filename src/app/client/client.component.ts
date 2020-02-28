import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ReturnedData } from 'src/app/data';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ConstantsService } from '../common/services/constants.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {



  constructor(private httpClient: HttpClient, private route: ActivatedRoute,
    private router: Router, private _constant: ConstantsService) {
    this.httpClient = httpClient;
    this.access_token = this._constant.access_token;
  }

  access_token;
  user_id;
  user_email;
  username;
  comment;

  postComment() {
    let url = 'http://85.160.64.233:3000/comments/'
    let header = new HttpHeaders()
      .set("User_token", this._constant.access_token)

    let body = {
      "user_id": this.user_id,
      "body": this.comment,
      "author_id": {
        "id": this.user_id,
        "email": this.user_email,
        "username": this.username
      }
    }
    this.httpClient
      .post<ReturnedData>(url, body, { headers: header, observe: 'response' })
      .subscribe((data) => {
        console.log(data);
      }, (error) => {
        console.log(error)
      });

  }

  editComment() {


  }

  deleteComment() {

  }

  logOut() {
    let url = 'http://85.160.64.233:3000/session/logout'
    let header = new HttpHeaders()
      .set("User_token", this._constant.access_token)
    this.httpClient
      .delete(url, { headers: header, observe: 'response' })
      .subscribe((data) => {
        console.log(data);
        this.router.navigate(["/login"])
      }, (error) => {
        console.log(error)
      });
  }




  ngOnInit(): void {
    console.log(this._constant.access_token);

    let url = 'http://85.160.64.233:3000/user/'
    const body = new HttpHeaders()
      .set("User_token", this._constant.access_token);
    this.httpClient
      .get<ReturnedData>(url, { headers: body, observe: 'response' })
      .subscribe((data) => {
        this.user_email = data.body.email;
        this.user_id = data.body.id
        this.username = data.body.username;

      }, (error) => {
        console.log(error)
      });



  }

}

