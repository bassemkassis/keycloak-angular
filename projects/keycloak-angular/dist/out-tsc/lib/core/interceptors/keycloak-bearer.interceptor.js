/**
 * @license
 * Copyright Mauricio Gemelli Vigolo and contributors.
 *
 * Use of this source code is governed by a MIT-style license that can be
 * found in the LICENSE file at https://github.com/mauriciovigolo/keycloak-angular/blob/main/LICENSE.md
 */
import { __awaiter, __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { combineLatest, from, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { KeycloakService } from '../services/keycloak.service';
/**
 * This interceptor includes the bearer by default in all HttpClient requests.
 *
 * If you need to exclude some URLs from adding the bearer, please, take a look
 * at the {@link KeycloakOptions} bearerExcludedUrls property.
 */
let KeycloakBearerInterceptor = class KeycloakBearerInterceptor {
    constructor(keycloak) {
        this.keycloak = keycloak;
    }
    /**
     * Calls to update the keycloak token if the request should update the token.
     *
     * @param req http request from @angular http module.
     * @returns
     * A promise boolean for the token update or noop result.
     */
    conditionallyUpdateToken(req) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.keycloak.shouldUpdateToken(req)) {
                return yield this.keycloak.updateToken();
            }
            return true;
        });
    }
    /**
     * @deprecated
     * Checks if the url is excluded from having the Bearer Authorization
     * header added.
     *
     * @param req http request from @angular http module.
     * @param excludedUrlRegex contains the url pattern and the http methods,
     * excluded from adding the bearer at the Http Request.
     */
    isUrlExcluded({ method, url }, { urlPattern, httpMethods }) {
        const httpTest = httpMethods.length === 0 ||
            httpMethods.join().indexOf(method.toUpperCase()) > -1;
        const urlTest = urlPattern.test(url);
        return httpTest && urlTest;
    }
    /**
     * Intercept implementation that checks if the request url matches the excludedUrls.
     * If not, adds the Authorization header to the request if the user is logged in.
     *
     * @param req
     * @param next
     */
    intercept(req, next) {
        const { enableBearerInterceptor, excludedUrls } = this.keycloak;
        if (!enableBearerInterceptor) {
            return next.handle(req);
        }
        const shallPass = !this.keycloak.shouldAddToken(req) ||
            excludedUrls.findIndex((item) => this.isUrlExcluded(req, item)) > -1;
        if (shallPass) {
            return next.handle(req);
        }
        return combineLatest([
            from(this.conditionallyUpdateToken(req)),
            of(this.keycloak.isLoggedIn())
        ]).pipe(mergeMap(([_, isLoggedIn]) => isLoggedIn
            ? this.handleRequestWithTokenHeader(req, next)
            : next.handle(req)));
    }
    /**
     * Adds the token of the current user to the Authorization header
     *
     * @param req
     * @param next
     */
    handleRequestWithTokenHeader(req, next) {
        return this.keycloak.addTokenToHeader(req.headers).pipe(mergeMap((headersWithBearer) => {
            const kcReq = req.clone({ headers: headersWithBearer });
            return next.handle(kcReq);
        }));
    }
};
KeycloakBearerInterceptor = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [KeycloakService])
], KeycloakBearerInterceptor);
export { KeycloakBearerInterceptor };
//# sourceMappingURL=keycloak-bearer.interceptor.js.map