/**
 * @license
 * Copyright Mauricio Gemelli Vigolo and contributors.
 *
 * Use of this source code is governed by a MIT-style license that can be
 * found in the LICENSE file at https://github.com/mauriciovigolo/keycloak-angular/blob/main/LICENSE.md
 */
/**
 * Keycloak event types, as described at the keycloak-js documentation:
 * https://www.keycloak.org/docs/latest/securing_apps/index.html#callback-events
 */
export var KeycloakEventType;
(function (KeycloakEventType) {
    /**
     * Called if there was an error during authentication.
     */
    KeycloakEventType[KeycloakEventType["OnAuthError"] = 0] = "OnAuthError";
    /**
     * Called if the user is logged out
     * (will only be called if the session status iframe is enabled, or in Cordova mode).
     */
    KeycloakEventType[KeycloakEventType["OnAuthLogout"] = 1] = "OnAuthLogout";
    /**
     * Called if there was an error while trying to refresh the token.
     */
    KeycloakEventType[KeycloakEventType["OnAuthRefreshError"] = 2] = "OnAuthRefreshError";
    /**
     * Called when the token is refreshed.
     */
    KeycloakEventType[KeycloakEventType["OnAuthRefreshSuccess"] = 3] = "OnAuthRefreshSuccess";
    /**
     * Called when a user is successfully authenticated.
     */
    KeycloakEventType[KeycloakEventType["OnAuthSuccess"] = 4] = "OnAuthSuccess";
    /**
     * Called when the adapter is initialized.
     */
    KeycloakEventType[KeycloakEventType["OnReady"] = 5] = "OnReady";
    /**
     * Called when the access token is expired. If a refresh token is available the token
     * can be refreshed with updateToken, or in cases where it is not (that is, with implicit flow)
     * you can redirect to login screen to obtain a new access token.
     */
    KeycloakEventType[KeycloakEventType["OnTokenExpired"] = 6] = "OnTokenExpired";
    /**
     * Called when a AIA has been requested by the application.
     */
    KeycloakEventType[KeycloakEventType["OnActionUpdate"] = 7] = "OnActionUpdate";
})(KeycloakEventType || (KeycloakEventType = {}));
//# sourceMappingURL=keycloak-event.js.map