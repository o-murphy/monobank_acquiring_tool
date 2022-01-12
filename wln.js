function wlnLogin () {
    sess = wialon.core.Session.getInstance()
    sess.initSession(`https://${getCookie('baseUrl')}`)
    sess.loginAuthHash(getCookie('wlnHash'), "", // trying login 
            function (code, data) { // login callback
                if (code, data) msg(wialon.core.Errors.getErrorText(code)); // login failed, print error
                else {
                    console.log(data)
                    console.log("Logged successfully");
                } // login succeed
            })
}

wlnLogin()