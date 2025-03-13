/**
 * @license
 * Copyright Mauricio Gemelli Vigolo and contributors.
 *
 * Use of this source code is governed by a MIT-style license that can be
 * found in the LICENSE file at https://github.com/mauriciovigolo/keycloak-angular/blob/main/LICENSE.md
 */
import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { KeycloakService } from './services/keycloak.service';
import { KeycloakBearerInterceptor } from './interceptors/keycloak-bearer.interceptor';
let CoreModule = class CoreModule {
};
CoreModule = __decorate([
    NgModule({
        imports: [CommonModule],
        providers: [
            KeycloakService,
            {
                provide: HTTP_INTERCEPTORS,
                useClass: KeycloakBearerInterceptor,
                multi: true
            }
        ]
    })
], CoreModule);
export { CoreModule };
//# sourceMappingURL=core.module.js.map