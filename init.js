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
            tgAdminID: get('tgadminid')
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

        function getInvoiceID() {
            if (aToken) {
                url = `https://api.monobank.ua/api/merchant/invoice/create`
                data = {
                    "amount": parseInt(document.getElementById('amount').value),
                    "ccy": parseFloat(document.getElementById('ccy').value),
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
                postData(url, data).then((data) => {console.log(data)})
                sendTgAdminMsg(data)
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

        function createInvoice() {
            getInvoiceID()
            
        }

        document.getElementById('mainForm').onsubmit = createInvoice
        document.getElementById('submitBtn').onclick = createInvoice

    } catch (error) {
        console.log(error)
    }

})()