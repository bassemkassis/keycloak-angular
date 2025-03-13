/**
 * @license
 * Copyright Mauricio Gemelli Vigolo and contributors.
 *
 * Use of this source code is governed by a MIT-style license that can be
 * found in the LICENSE file at https://github.com/mauriciovigolo/keycloak-angular/blob/main/LICENSE.md
 */
import { __awaiter } from "tslib";
/**
 * A simple guard implementation out of the box. This class should be inherited and
 * implemented by the application. The only method that should be implemented is #isAccessAllowed.
 * The reason for this is that the authorization flow is usually not unique, so in this way you will
 * have more freedom to customize your authorization flow.
 */
export class KeycloakAuthGuard {
    constructor(router, keycloakAngular) {
        this.router = router;
        this.keycloakAngular = keycloakAngular;
    }
    /**
     * CanActivate checks if the user is logged in and get the full list of roles (REALM + CLIENT)
     * of the logged user. This values are set to authenticated and roles params.
     *
     * @param route
     * @param state
     */
    canActivate(route, state) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.authenticated = yield this.keycloakAngular.isLoggedIn();
                this.roles = yield this.keycloakAngular.getUserRoles(true);
                return yield this.isAccessAllowed(route, state);
            }
            catch (error) {
                throw new Error('An error happened during access validation. Details:' + error);
            }
        });
    }
}
//# sourceMappingURL=keycloak-auth-guard.js.map