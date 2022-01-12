class Account {
    constructor (res, data) {
        this._id = res._id
        this.res = res
        this.data = data
    }

    // createHtml () {
    //     document.createElement('')
    // }
}

let full_account_data = accounts.map((e) => {return new Account(e, accounts_data[e._id])})

