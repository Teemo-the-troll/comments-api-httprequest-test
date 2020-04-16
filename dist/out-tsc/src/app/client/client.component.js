import { __decorate } from "tslib";
import { Component } from "@angular/core";
import { HttpHeaders } from "@angular/common/http";
let ClientComponent = class ClientComponent {
    constructor(httpClient, router, _constant) {
        this.httpClient = httpClient;
        this.router = router;
        this._constant = _constant;
        this.tmpArray = [];
        this.token = new HttpHeaders().set("User_token", this._constant.access_token);
        this.httpClient = httpClient;
        this.access_token = this._constant.access_token;
    }
    pstComment(id) {
        let body = {
            body: this.comment,
            user_id: id //TVOJE ID ZDE
        };
        let url = this._constant.ip + "/comments";
        this.httpClient
            .post(url, body, {
            headers: this.token,
            observe: "response"
        })
            .subscribe(data => {
            console.log(data);
        });
    }
    //edits a comment
    editComment() {
        //get the whole comment by its ID,
        let url = this._constant.ip + "/comments/" + this.IDToChange;
        this.httpClient //get comment
            .get(url, { headers: this.token, observe: "response" })
            .subscribe(data => {
            let body = {
                //edit it
                user_id: data.body.id,
                body: this.commentToChange,
                author_id: {
                    id: this.user_id,
                    email: this.user_email,
                    username: this.username
                }
            };
            this.httpClient //send back
                .put(url, body, {
                headers: this.token,
                observe: "response"
            })
                .subscribe(error => {
                console.log(error);
            });
        }, error => {
            console.log(error);
        });
    }
    /**
     *deletes a comment
     */
    deleteComment() {
        let url = this._constant.ip + "/comments/" + this.IDToDelete;
        this.httpClient
            .delete(url, { headers: this.token, observe: "response" })
            .subscribe();
    }
    logOut() {
        let url = this._constant.ip + "/session/logout";
        this.httpClient
            .delete(url, { headers: this.token, observe: "response" })
            .subscribe();
    }
    /**
     * useless so far
     * @param id
     */
    getUserComments(id) {
        let url = this._constant.ip + "/comments/?user_id=" + id;
        this.httpClient
            .get(url, { headers: this.token, observe: "response" })
            .subscribe(data => {
            const container = document.getElementById("comments");
            for (let i = 0; i < data.body.comments.length; i++) { }
            // make a row for each comment
            //author_id.username + " has sent you: " +
        }, error => {
            console.log(error);
        });
    }
    getUserInfo() {
        let url = this._constant.ip + "/user/";
        this.httpClient
            .get(url, { headers: this.token, observe: "response" })
            .subscribe(data => {
            this.user_email = data.body.email;
            this.user_id = data.body.id;
            this.username = data.body.username;
        }, error => {
            console.log(error);
        });
    }
    get users() {
        return this.tmpArray.filter(i => {
            i.username !== null;
        });
    }
    ngOnInit() {
        console.log(sessionStorage.getItem("User-token"));
        if (sessionStorage.getItem("User-token")) {
            console.log(sessionStorage.getItem("User-token"));
            console.log(this.token);
            this.token.delete("User-token");
            console.log(this.token);
            this.token.set("User-token", sessionStorage.getItem("User-token"));
            console.log(this.token);
        }
        this.getUserInfo(); //get info about the logged user => store them for use in posting and getting comments
        this._constant.getUsers(0).subscribe(data => {
            this.tmpArray = data.body.users;
        }, error => {
            if (error.status === 401) {
                console.log(sessionStorage.getItem("User-token"));
                //jestli je "unauthorized", tak presun na login
                if (sessionStorage.getItem("User-token") !== "") {
                    this.token.set("User_token", sessionStorage.getItem("User-token"));
                }
                else
                    this.router.navigate(["/login"]);
            }
            console.log(error);
        });
    }
};
ClientComponent = __decorate([
    Component({
        selector: "app-client",
        templateUrl: "./client.component.html",
        styleUrls: ["./client.component.scss"]
    })
], ClientComponent);
export { ClientComponent };
//# sourceMappingURL=client.component.js.map