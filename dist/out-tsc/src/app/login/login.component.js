import { __decorate } from "tslib";
import { Component } from "@angular/core";
let LoginComponent = class LoginComponent {
    constructor(httpClient, router, _constant) {
        this.httpClient = httpClient;
        this.router = router;
        this._constant = _constant;
        this.httpClient = httpClient;
    }
    getAcesstoken() {
        let url = this._constant.ip + "/session/login";
        let body = {
            password: this.pass,
            email: this.email
        };
        this.httpClient.post(url, body).subscribe(data => {
            this._constant.access_token = data.access_token;
            sessionStorage.setItem('User-token', data.access_token);
            this.router.navigate(["/client"]);
        }, error => {
            console.log(error);
        });
    }
    ngOnInit() {
        if (sessionStorage.getItem('User-token')) {
            this._constant.access_token = sessionStorage.getItem('User-token');
            this.router.navigate(["/client"]);
        }
    }
};
LoginComponent = __decorate([
    Component({
        selector: "app-login",
        templateUrl: "./login.component.html",
        styleUrls: ["./login.component.scss"]
    })
], LoginComponent);
export { LoginComponent };
//# sourceMappingURL=login.component.js.map