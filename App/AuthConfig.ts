import { Configuration, RedirectRequest, LogLevel } from "@azure/msal-browser";

// Config client ID for application in Azure AD B2C tenant
const ClientId = "11111111-1111-1111-1111-111111111111";

// Replace this value with the name of your Azure AD B2C tenant
export const tenantName = "YOUR_TENANT_NAME";

export const authorityDomain = tenantName + ".b2clogin.com";
export const tenantDomain = tenantName + ".onmicrosoft.com";
const basePolicyUrl = "https://" + authorityDomain + "/" + tenantDomain + "/";

const signUpSignIn = "b2c_1_susi";
const signIn = "B2C_1_signin";
const signUp = "B2C_1_signup";
const customSignUpSignIn = "B2C_1A_SIGNUP_SIGNIN";
const customEditProfile = "B2C_1A_PROFILEEDIT";
const resetPassword = "b2c_1_reset";
const editProfile = "b2c_1_edit_profile";

export const b2cPolicies = {
    names: {
        signUpSignIn: signUpSignIn,
        signIn: signIn,
        signUp: signUp,
        customSignUpSignIn: customSignUpSignIn,
        customEditProfile: customEditProfile,
        resetPassword: resetPassword,
        editProfile: editProfile
    },
    authorities: {
        signUpSignIn: {
            authority: basePolicyUrl + signUpSignIn,
        },
        forgotPassword: {
            authority: basePolicyUrl + resetPassword,
        },
        editProfile: {
            authority: basePolicyUrl + editProfile
        }
    },
    authorityDomain: authorityDomain
}

export const msalConfig: Configuration = {
    auth: {
        clientId: ClientId,
        authority: b2cPolicies.authorities.signUpSignIn.authority,
        knownAuthorities: [b2cPolicies.authorityDomain],
        redirectUri: "/",
        postLogoutRedirectUri: "/",
        navigateToLoginRequestUrl: true        
    },
    cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: false,
    },
    system: {
        loggerOptions: {
            loggerCallback: (level, message, containsPii) => {
                if (containsPii) {
                    return;
                }
                switch (level) {
                    case LogLevel.Error:
                        console.error(message);
                        return;
                    case LogLevel.Warning:
                        console.warn(message);
                        return;
                }
            }
        }
    }

};

export const AppOwnsDataApiPermissionScopes: string[] = [
    "https://powerbidevcampauth.onmicrosoft.com/81d70ab2-2492-4203-9fa0-40f5d6d36c31/Reports.Embed"
]

export const SignInSignUpRequest: RedirectRequest = {
    scopes: AppOwnsDataApiPermissionScopes,
    redirectStartPage: window.location.href
};

export const TokenRequest: RedirectRequest = {
    scopes: AppOwnsDataApiPermissionScopes
};

export const SignInRequest: RedirectRequest = {
    scopes: AppOwnsDataApiPermissionScopes,
    authority: basePolicyUrl + signIn,
    redirectStartPage: window.location.href
};

export const SignUpRequest: RedirectRequest = {
    scopes: AppOwnsDataApiPermissionScopes,
    authority: basePolicyUrl + signUp,
    redirectStartPage: window.location.href
};

export const ResetPasswordRequest: RedirectRequest = {
    scopes: AppOwnsDataApiPermissionScopes,
    authority: basePolicyUrl + resetPassword,
    redirectStartPage: window.location.href
};

export const EditProfileRequest: RedirectRequest = {
    scopes: AppOwnsDataApiPermissionScopes,
    authority: basePolicyUrl + editProfile,
    redirectStartPage: window.location.href
};