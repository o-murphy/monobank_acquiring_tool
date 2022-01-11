(function () {

    try {
        function get(name) {
            if (name = (new RegExp('[?&]' + encodeURIComponent(name) + '=([^&]*)')).exec(location.search))
                return decodeURIComponent(name[1]);
        }

        function getCookie(name) {
            let matches = document.cookie.match(new RegExp(
                "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
            ));
            return matches ? decodeURIComponent(matches[1]) : undefined;
        }

        let aToken, tgToken, tgAdminID

        function set_fields() {
            aToken = getCookie('aToken')
            tgToken = getCookie('tgToken')
            tgAdminID = getCookie('tgAdminID')
            if (aToken) { document.getElementById('aquireToken').value = aToken }
            if (aToken) { document.getElementById('tgBotToken').value = tgToken }
            if (aToken) { document.getElementById('tgBotAdminID').value = tgAdminID }
        }

        const params = {
            aToken: get('atoken'),
            tgToken: get('tgtoken'),
            tgAdminID: get('tgadminid'),
            wlnHash: get('wlnhash'),
            baseUrl: get('baseurl')
        }

        let date = new Date(Date.now() + (31 * 86400e3));
        date = date.toUTCString();
        document.cookie = "expires=" + date

        Object.entries(params).forEach(([k, v]) => {
            if (v) {
                document.cookie = encodeURIComponent(k) + '=' + encodeURIComponent(v);
            }
        });

        set_fields()

        function wlnLogin () {
            hash = getCookie('wlnHash')
            url = getCookie('baseUrl')


            sess = wialon.core.Session.getInstance()
            sess.initSession('https://wialon.trans-control.com')
            sess.loginAuthHash(hash, "", // trying login 
                    function (code) { // login callback
                        if (code) msg(wialon.core.Errors.getErrorText(code)); // login failed, print error
                        else console.log("Logged successfully"); // login succeed
                    })

        }

        wlnLogin()

        function getWlnAccs () {


        }


        function createInvoice() {
            if (aToken) {
                url = `https://api.monobank.ua/api/merchant/invoice/create`
                data = {
                    "amount": parseInt(parseFloat(document.getElementById('amount').value) * 100),
                    "ccy": parseInt(document.getElementById('ccy').value),
                    "merchantPaymInfo": {
                        "reference": document.getElementById('reference').value,
                        "destination": document.getElementById('destination').value,
                        "basketOrder": [
                            {
                                "name": "Мониторинг",
                                "qty": 10,
                                "sum": 100,
                                "icon": ""
                            }
                        ]
                    }
                }
                postData(url, data).then((json) => {
                    if (!json.errCode) {
                    sendTgAdminMsg(json);
                    document.getElementById('mainForm').submit()
                    } else {
                        document.getElementById('mainForm').requestSubmit()
                    }
                })
            }
        }

        async function postData(url = '', data = {}) {
            // Default options are marked with *
            const response = await fetch(url, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                headers: {
                    "Content-Type": "application/json",
                    "X-Token": aToken
                },
                body: JSON.stringify(data) // body data type must match "Content-Type" header
            });
            return await response.json(); // parses JSON response into native JavaScript objects
        }

        function sendTgAdminMsg(data) {
            if (tgToken != undefined && tgAdminID != undefined) {

                url = `https://api.telegram.org/bot${tgToken}/sendMessage`;
                text = `${JSON.stringify(data)}`;
                f_url = `${url}?chat_id=${tgAdminID}&text=${encodeURI(text)}&parse_mode=HTML&disable_notification=true`;
                fetch(f_url)
            }
        }

        document.getElementById('submitBtn').onclick = createInvoice

    } catch (error) {
        console.log(error)
    }

})()