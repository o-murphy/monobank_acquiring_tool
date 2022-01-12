let aToken, tgToken, tgAdminID

function set_fields() {
    aToken = getCookie('aToken')
    tgToken = getCookie('tgToken')
    tgAdminID = getCookie('tgAdminID')
    if (aToken) { document.getElementById('aquireToken').value = aToken }
    if (aToken) { document.getElementById('tgBotToken').value = tgToken }
    if (aToken) { document.getElementById('tgBotAdminID').value = tgAdminID }
}

set_fields()

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
        fetch(f_url).then((data) => console.log(data))
    }
}

document.getElementById('submitBtn').onclick = createInvoice
