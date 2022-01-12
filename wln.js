function wlnLoginHash() {
    sess = wialon.core.Session.getInstance()
    sess.initSession(`https://${getCookie('baseUrl')}`)
    sess.loginAuthHash(getCookie('wlnHash'), "", // trying login 
        function (code, data) { // login callback
            if (code, data) console.log(wialon.core.Errors.getErrorText(code)); // login failed, print error
            else {
                console.log("Logged successfully via hash");
            } // login succeed
        })
}

function wlnLoginToken() {
    sess = wialon.core.Session.getInstance()
    sess.initSession(`https://${getCookie('baseUrl')}`)
    sess.loginToken(getCookie('wlnToken'), "", // trying login 
        function (code, data) { // login callback
            if (code, data) console.log(wialon.core.Errors.getErrorText(code)); // login failed, print error
            else {
                console.log("Logged successfully via token");
            } // login succeed
        })
}

function getTokens() {
    sess = wialon.core.Session.getInstance()
    sess.listTokens(
        sess.getCurrUser()._id, (code, data) => {
            if (code, data) console.log(wialon.core.Errors.getErrorText(code));
            else if (data) {
                if (sess.getCurrUser().$$user_name && data.length > 0) {
                    console.log(data)
                }
            }
        }
    )
}

function wlnUpdateToken() {
    sess = wialon.core.Session.getInstance()
    sess.updateToken(
        'create',
        new Token, (code, data) => {
            if (code) { console.log(wialon.core.Errors.getErrorText(code)) }
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



function getAccounts() {
    let accounts, accounts_data
    sess = wialon.core.Session.getInstance()
    sess.loadLibrary("resourceAccounts")
    let flags = wialon.item.Item.dataFlag.base | wialon.item.Item.dataFlag.billingProps;
    sess.updateDataFlags(
        [{ type: "type", data: "avl_resource", flags: flags, mode: 0 }],
        function (code) {
            if (code) { console.log(wialon.core.Errors.getErrorText(code)); return; }
            resources = sess.getItems("avl_resource");
            accounts = resources.filter((r) => r.$$user_accountId === r._id).map(e => e._id)
            sess.getAccountsData(accs, 1, (code, data) => {
                if (code) { console.log(wialon.core.Errors.getErrorText(code)); return; }
                accounts_data = data
            })
        }
    )
    return accounts, accounts_data
}

if (getCookie('wlnHash') && getCookie('baseUrl') && !getCookie('wlnToken')) {
    wlnLoginHash()
    wlnUpdateToken()
}

if (getCookie('baseUrl') && getCookie('wlnToken')) {
    wlnLoginToken()
}
