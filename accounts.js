try {
    window.history.pushState("", "Title", "/monobank_acquiring_tool/accounts.html");
} catch {}

if (sess.getCurrUser().$$user_name) {
    getAccounts()
    full_account_data = accounts.map((e) => {return new Account(e, accounts_data[e._id])})
}

async function createTable() {
    
}

