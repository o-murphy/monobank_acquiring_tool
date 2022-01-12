function getAccounts() {
    var flags = wialon.item.Item.dataFlag.base | wialon.item.Item.dataFlag.billingProps;
    sess.updateDataFlags(
    
        [{type: "type", data: "avl_resource", flags: flags, mode: 0}],
        function (code) {
                if (code) { console.log(wialon.core.Errors.getErrorText(code)); return; }
                let resources = sess.getItems("avl_resource");
                accounts = resources.filter((r) => r.$$user_accountId === r._id)
                console.log(accounts)
        }
    
    )
    
}
