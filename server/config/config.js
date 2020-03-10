module.exports = {
    db: {
        uri: 'mongodb+srv://derekleonhardt:ue7wdezr@cen3031-spring-2020-eom5f.mongodb.net/test?retryWrites=true&w=majority', //place the URI of your mongo database here.
    },
    auth0: {
        required: false,
        auth0Logout: true,
        baseURL: "https://localhost:3000",
        issuerBaseURL: "https://dev-7fr1psml.auth0.com",
        clientID: "KKOGEYPFi6A7FER9K47Z53pnFMeg6QO2",
        appSessionSecret: "XSZSGN8slrsbdUd5aTNuCOWjhcMFYpw_li9GO7vvWelxxW7rwg7vRBaU3H3C9Qa9"
    }
};