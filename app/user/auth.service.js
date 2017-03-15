"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var Rx_1 = require('rxjs/Rx');
var app_config_1 = require('../app.config');
var core_2 = require('angular2-cookie/core');
var navbar_service_1 = require('../nav/navbar.service');
var toastr_service_1 = require('../common/toastr.service');
var AuthService = (function () {
    function AuthService(config, http, cookieService, navBarService, toastr) {
        this.config = config;
        this.http = http;
        this.cookieService = cookieService;
        this.navBarService = navBarService;
        this.toastr = toastr;
        this.cached_user_trips = false;
    }
    AuthService.prototype.loginUser = function (email, password) {
        var _this = this;
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        console.log("Attempting to log in");
        return this.http.post(this.config.apiEndpoint + "/sign_in?email=" + email + "&password=" + password, options)
            .do(function (resp) {
            if (resp) {
                console.log("Logged in as: ", resp);
                _this.currentUser = JSON.parse(resp._body);
                console.log("Current user is: ", _this.currentUser);
                _this.cookieService.put("auth_token", _this.currentUser.auth_token);
                _this.toastr.success("Logged In");
            }
        }).catch(this.handleError);
    };
    AuthService.prototype.loginWithToken = function (token) {
        var _this = this;
        var headers = new http_1.Headers();
        headers.append('Authorization', token);
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.get(this.config.apiEndpoint + "/user", { headers: headers })
            .do(function (resp) {
            _this.currentUser = JSON.parse(resp._body);
            _this.currentUser.auth_token = token;
            _this.navBarService.update();
        }).catch(this.handleError);
    };
    AuthService.prototype.logout = function () {
        this.currentUser = null;
        this.cookieService.removeAll();
    };
    AuthService.prototype.getTrips = function () {
        var _this = this;
        var headers = new http_1.Headers();
        headers.append('Authorization', this.currentUser.auth_token);
        var options = new http_1.RequestOptions({ headers: headers });
        if (!this.cached_user_trips) {
            if (this.currentUser.auth_token) {
                return this.http.post(this.config.apiEndpoint + "/get_user_trips", options, { headers: headers })
                    .do(function (resp) {
                    _this.cached_user_trips = true;
                    _this.cached_user_trips_response = JSON.parse(resp._body);
                    console.log("Response from server is: ", resp);
                }).catch(this.handleError);
            }
        }
        else {
            return this.cached_user_trips_response;
        }
    };
    AuthService.prototype.getUser = function () {
        return this.currentUser;
    };
    AuthService.prototype.handleError = function (error) {
        // In a real world app, you might use a remote logging infrastructure
        var errMsg;
        if (error instanceof http_1.Response) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Rx_1.Observable.throw(errMsg);
    };
    AuthService = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(app_config_1.APP_CONFIG)),
        __param(4, core_1.Inject(toastr_service_1.TOASTR_TOKEN)), 
        __metadata('design:paramtypes', [Object, http_1.Http, core_2.CookieService, navbar_service_1.NavBarService, Object])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
var temp_user = {
    id: "idstring",
    first_name: "William",
    last_name: "Huang",
    trips_driving: [
        {
            id: "58bf35b56a48864d1494d88f",
            driver: {
                id: "58bf35996a48864ce84696b1",
                first_name: "Ted",
                last_name: "Mosby"
            },
            date: new Date('4/15/2017'),
            spaces: 2,
            price: 20,
            user_requests: [
                {
                    id: "58bf35996a48864ce84696b1",
                    first_name: "Robin",
                    last_name: "Scherbazky"
                },
                {
                    id: "58bf35996a48864ce84696b1",
                    first_name: "Marshall",
                    last_name: "Scherbazky"
                },
                {
                    id: "58bf35996a48864ce84696b1",
                    first_name: "Lily",
                    last_name: "Scherbazky"
                }
            ],
            accepted_users: [
                {
                    id: "58bf35996a48864ce84696b1",
                    first_name: "Robin",
                    last_name: "Scherbazky"
                },
                {
                    id: "58bf35996a48864ce84696b1",
                    first_name: "Marshall",
                    last_name: "Scherbazky"
                }
            ],
            location: {
                from: {
                    from_country: "Canada",
                    from_state: "Ontario",
                    from_city: "London",
                    from_metadata: "Western University",
                    pickup_location: "Anywhere on main campus"
                },
                destination: {
                    to_country: "Canada",
                    to_state: "Ontario",
                    to_city: "Toronto",
                    to_metadata: "Fairview"
                }
            }
        },
        {
            id: "58bf35b56a48864d1494d88f",
            driver: {
                id: "58bf35996a48864ce84696b1",
                first_name: "Ted",
                last_name: "Mosby"
            },
            date: new Date('4/15/2017'),
            spaces: 2,
            price: 20,
            user_requests: [
                {
                    id: "58bf35996a48864ce84696b1",
                    first_name: "Robin",
                    last_name: "Scherbazky"
                },
                {
                    id: "58bf35996a48864ce84696b1",
                    first_name: "Marshall",
                    last_name: "Scherbazky"
                },
                {
                    id: "58bf35996a48864ce84696b1",
                    first_name: "Lily",
                    last_name: "Scherbazky"
                }
            ],
            accepted_users: [
                {
                    id: "58bf35996a48864ce84696b1",
                    first_name: "Robin",
                    last_name: "Scherbazky"
                },
                {
                    id: "58bf35996a48864ce84696b1",
                    first_name: "Marshall",
                    last_name: "Scherbazky"
                }
            ],
            location: {
                from: {
                    from_country: "Canada",
                    from_state: "Ontario",
                    from_city: "London",
                    from_metadata: "Western University",
                    pickup_location: "Anywhere on main campus"
                },
                destination: {
                    to_country: "Canada",
                    to_state: "Ontario",
                    to_city: "Toronto",
                    to_metadata: "Fairview"
                }
            }
        }
    ],
    trips_requested: [
        {
            id: "58bf35b56a48864d1494d88f",
            driver: {
                id: "58bf35996a48864ce84696b1",
                first_name: "Ted",
                last_name: "Mosby"
            },
            date: new Date('4/15/2017'),
            spaces: 2,
            price: 20,
            user_requests: [
                {
                    id: "58bf35996a48864ce84696b1",
                    first_name: "Robin",
                    last_name: "Scherbazky"
                },
                {
                    id: "58bf35996a48864ce84696b1",
                    first_name: "Marshall",
                    last_name: "Scherbazky"
                },
                {
                    id: "58bf35996a48864ce84696b1",
                    first_name: "Lily",
                    last_name: "Scherbazky"
                }
            ],
            accepted_users: [
                {
                    id: "58bf35996a48864ce84696b1",
                    first_name: "Robin",
                    last_name: "Scherbazky"
                },
                {
                    id: "58bf35996a48864ce84696b1",
                    first_name: "Marshall",
                    last_name: "Scherbazky"
                }
            ],
            location: {
                from: {
                    from_country: "Canada",
                    from_state: "Ontario",
                    from_city: "London",
                    from_metadata: "Western University",
                    pickup_location: "Anywhere on main campus"
                },
                destination: {
                    to_country: "Canada",
                    to_state: "Ontario",
                    to_city: "Toronto",
                    to_metadata: "Fairview"
                }
            }
        },
        {
            id: "58bf35b56a48864d1494d88f",
            driver: {
                id: "58bf35996a48864ce84696b1",
                first_name: "Ted",
                last_name: "Mosby"
            },
            date: new Date('4/15/2017'),
            spaces: 2,
            price: 20,
            user_requests: [
                {
                    id: "58bf35996a48864ce84696b1",
                    first_name: "Robin",
                    last_name: "Scherbazky"
                },
                {
                    id: "58bf35996a48864ce84696b1",
                    first_name: "Marshall",
                    last_name: "Scherbazky"
                },
                {
                    id: "58bf35996a48864ce84696b1",
                    first_name: "Lily",
                    last_name: "Scherbazky"
                }
            ],
            accepted_users: [
                {
                    id: "58bf35996a48864ce84696b1",
                    first_name: "Robin",
                    last_name: "Scherbazky"
                },
                {
                    id: "58bf35996a48864ce84696b1",
                    first_name: "Marshall",
                    last_name: "Scherbazky"
                }
            ],
            location: {
                from: {
                    from_country: "Canada",
                    from_state: "Ontario",
                    from_city: "London",
                    from_metadata: "Western University",
                    pickup_location: "Anywhere on main campus"
                },
                destination: {
                    to_country: "Canada",
                    to_state: "Ontario",
                    to_city: "Toronto",
                    to_metadata: "Fairview"
                }
            }
        }
    ],
    past_trips_requested: [
        {
            id: "58bf35b56a48864d1494d88f",
            driver: {
                id: "58bf35996a48864ce84696b1",
                first_name: "Ted",
                last_name: "Mosby"
            },
            date: new Date('4/15/2017'),
            spaces: 2,
            price: 20,
            user_requests: [
                {
                    id: "58bf35996a48864ce84696b1",
                    first_name: "Robin",
                    last_name: "Scherbazky"
                },
                {
                    id: "58bf35996a48864ce84696b1",
                    first_name: "Marshall",
                    last_name: "Scherbazky"
                },
                {
                    id: "58bf35996a48864ce84696b1",
                    first_name: "Lily",
                    last_name: "Scherbazky"
                }
            ],
            accepted_users: [
                {
                    id: "58bf35996a48864ce84696b1",
                    first_name: "Robin",
                    last_name: "Scherbazky"
                },
                {
                    id: "58bf35996a48864ce84696b1",
                    first_name: "Marshall",
                    last_name: "Scherbazky"
                }
            ],
            location: {
                from: {
                    from_country: "Canada",
                    from_state: "Ontario",
                    from_city: "London",
                    from_metadata: "Western University",
                    pickup_location: "Anywhere on main campus"
                },
                destination: {
                    to_country: "Canada",
                    to_state: "Ontario",
                    to_city: "Toronto",
                    to_metadata: "Fairview"
                }
            }
        },
        {
            id: "58bf35b56a48864d1494d88f",
            driver: {
                id: "58bf35996a48864ce84696b1",
                first_name: "Ted",
                last_name: "Mosby"
            },
            date: new Date('4/15/2017'),
            spaces: 2,
            price: 20,
            user_requests: [
                {
                    id: "58bf35996a48864ce84696b1",
                    first_name: "Robin",
                    last_name: "Scherbazky"
                },
                {
                    id: "58bf35996a48864ce84696b1",
                    first_name: "Marshall",
                    last_name: "Scherbazky"
                },
                {
                    id: "58bf35996a48864ce84696b1",
                    first_name: "Lily",
                    last_name: "Scherbazky"
                }
            ],
            accepted_users: [
                {
                    id: "58bf35996a48864ce84696b1",
                    first_name: "Robin",
                    last_name: "Scherbazky"
                },
                {
                    id: "58bf35996a48864ce84696b1",
                    first_name: "Marshall",
                    last_name: "Scherbazky"
                }
            ],
            location: {
                from: {
                    from_country: "Canada",
                    from_state: "Ontario",
                    from_city: "London",
                    from_metadata: "Western University",
                    pickup_location: "Anywhere on main campus"
                },
                destination: {
                    to_country: "Canada",
                    to_state: "Ontario",
                    to_city: "Toronto",
                    to_metadata: "Fairview"
                }
            }
        }
    ],
    past_trips_driven: [
        {
            id: "58bf35b56a48864d1494d88f",
            driver: {
                id: "58bf35996a48864ce84696b1",
                first_name: "Ted",
                last_name: "Mosby"
            },
            date: new Date('4/15/2017'),
            spaces: 2,
            price: 20,
            user_requests: [
                {
                    id: "58bf35996a48864ce84696b1",
                    first_name: "Robin",
                    last_name: "Scherbazky"
                },
                {
                    id: "58bf35996a48864ce84696b1",
                    first_name: "Marshall",
                    last_name: "Scherbazky"
                },
                {
                    id: "58bf35996a48864ce84696b1",
                    first_name: "Lily",
                    last_name: "Scherbazky"
                }
            ],
            accepted_users: [
                {
                    id: "58bf35996a48864ce84696b1",
                    first_name: "Robin",
                    last_name: "Scherbazky"
                },
                {
                    id: "58bf35996a48864ce84696b1",
                    first_name: "Marshall",
                    last_name: "Scherbazky"
                }
            ],
            location: {
                from: {
                    from_country: "Canada",
                    from_state: "Ontario",
                    from_city: "London",
                    from_metadata: "Western University",
                    pickup_location: "Anywhere on main campus"
                },
                destination: {
                    to_country: "Canada",
                    to_state: "Ontario",
                    to_city: "Toronto",
                    to_metadata: "Fairview"
                }
            }
        },
        {
            id: "58bf35b56a48864d1494d88f",
            driver: {
                id: "58bf35996a48864ce84696b1",
                first_name: "Ted",
                last_name: "Mosby"
            },
            date: new Date('4/15/2017'),
            spaces: 2,
            price: 20,
            user_requests: [
                {
                    id: "58bf35996a48864ce84696b1",
                    first_name: "Robin",
                    last_name: "Scherbazky"
                },
                {
                    id: "58bf35996a48864ce84696b1",
                    first_name: "Marshall",
                    last_name: "Scherbazky"
                },
                {
                    id: "58bf35996a48864ce84696b1",
                    first_name: "Lily",
                    last_name: "Scherbazky"
                }
            ],
            accepted_users: [
                {
                    id: "58bf35996a48864ce84696b1",
                    first_name: "Robin",
                    last_name: "Scherbazky"
                },
                {
                    id: "58bf35996a48864ce84696b1",
                    first_name: "Marshall",
                    last_name: "Scherbazky"
                }
            ],
            location: {
                from: {
                    from_country: "Canada",
                    from_state: "Ontario",
                    from_city: "London",
                    from_metadata: "Western University",
                    pickup_location: "Anywhere on main campus"
                },
                destination: {
                    to_country: "Canada",
                    to_state: "Ontario",
                    to_city: "Toronto",
                    to_metadata: "Fairview"
                }
            }
        }
    ],
    facebook_link: "facebook.com/william.huang.7737",
    phone_number: "416-555-7485"
};
//# sourceMappingURL=auth.service.js.map