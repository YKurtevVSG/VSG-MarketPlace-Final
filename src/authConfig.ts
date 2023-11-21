export const msalConfig = {
    auth: {
        clientId: "86ceffd4-8632-4677-bbb6-e7badafa26ec",
        authority: "https://login.microsoftonline.com/50ae1bf7-d359-4aff-91ac-b084dc52111e",
        navigateToLoginRequestUrl: false
    },
    cache: {
        cacheLocation: "sessionStorage", // This configures where your cache will be stored
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    },
};

interface LoginRequest {
    scopes: string[]
}

export const loginRequest: LoginRequest = {
    scopes: ["email profile openid api://86ceffd4-8632-4677-bbb6-e7badafa26ec/Files.Read"]
};