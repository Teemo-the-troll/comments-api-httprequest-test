import { __decorate } from "tslib";
import { Injectable } from "@angular/core";
import { HttpHeaders } from "@angular/common/http";
let ConstantsService = class ConstantsService {
    constructor(httpClient, route, router) {
        this.httpClient = httpClient;
        this.route = route;
        this.router = router;
        this.access_token = "";
        this.ip = "http://85.160.64.233:3000";
        this.usersArray = [];
        this.httpClient = httpClient;
    }
    checkForToken(error) {
        if (error.status === 401) {
            //jestli je "unauthorized", tak presun na login
            if (sessionStorage.getItem("User-token")) {
                this.access_token = sessionStorage.getItem("User-token");
                // this.ngOnInit();
            }
            else
                this.router.navigate(["/login"]);
        }
        console.log(error);
    }
    getUsers(page) {
        let header = new HttpHeaders().set("User_token", this.access_token); //header
        let tempUsersArray = []; //array na usery
        let url = this.ip + "/users"; //ip
        let subUrl = url + "?page=" + page; //nova url s argumentem page
        return this.httpClient
            .get(subUrl, {
            headers: header,
            observe: "response"
        });
    }
};
ConstantsService = __decorate([
    Injectable({
        providedIn: "root"
    })
], ConstantsService);
export { ConstantsService };
//# sourceMappingURL=constants.service.js.map