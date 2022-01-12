function wlnLoginHash () {
    sess = wialon.core.Session.getInstance()
    sess.initSession(`https://${getCookie('baseUrl')}`)
    sess.loginAuthHash(getCookie('wlnHash'), "", // trying login 
            function (code, data) { // login callback
                if (code, data) msg(wialon.core.Errors.getErrorText(code)); // login failed, print error
                else {
                    console.log("Logged successfully via hash");
                } // login succeed
            })
}

function vlnLoginToken() {
    sess = wialon.core.Session.getInstance()
    sess.initSession(`https://${getCookie('baseUrl')}`)
    sess.loginToken(getCookie('wlnToken'), "", // trying login 
            function (code, data) { // login callback
                if (code, data) msg(wialon.core.Errors.getErrorText(code)); // login failed, print error
                else {
                    console.log("Logged successfully via token");
                } // login succeed
            })
}

function getTokens() {
    sess.listTokens(
        sess.getCurrUser()._id, (code,data) => {
            if (data) {if (sess.getCurrUser().$$user_name && data.length > 0) {
                            console.log(data)
                       }
            }
        }
    )
}

function wlnUpdateToken() {
    sess.updateToken(
        'create',
        new Token, (code, data) => {
            if (code) {console.log(code)}
            else {
                document.cookie = "wlnToken=" + data.h
            }
        }
    )
}

class Token {
    dur = 0;
    fl = -1;
    app = 'aquireTools';
    at = 0;
    p = "{}"
}

if (getCookie('wlnHash') && getCookie('baseUrl') && !getCookie('wlnToken')) {
    wlnLoginHash()
    wlnUpdateToken()
}

if (getCookie('baseUrl') && getCookie('wlnToken')) {
    wlnLoginToken()
}
    