class Account {
    constructor (res, data) {
        this.res = res
        this.balance = balance;
        this.created = created;
        this.daysCounter = daysCounter;
        this.dealerRights = dealerRights;
        this.enabled = enabled;
        this.flags = flags;
        this.parentAccountId = parentAccountId;
        this.parentAccountName = parentAccountName;
        this.parentEnabled = parentEnabled;
        this.plan = plan;
        this.services = services;
        this.subPlans = subPlans;
        this.switchTime = switchTime;
    }

    // createHtml () {
    //     document.createElement('')
    // }
}

full_acc_data = getAccounts()

// let accounts_data = accounts.map((e) => {acc = Account(e, accounts_data[e._id])})

