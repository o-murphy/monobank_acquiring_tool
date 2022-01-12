function getAccounts() {
    var flags = wialon.item.Item.dataFlag.base | wialon.item.Item.dataFlag.billingProps;
    sess.updateDataFlags(
    
        [{type: "type", data: "avl_resource", flags: flags, mode: 0}],
        function (code) {
                if (code) { console.log(wialon.core.Errors.getErrorText(code)); return; }
                var units = sess.getItems("avl_resource");
                units.filter((e) => e.$$user_accountId === e._id)
                console.log(units)
        }
    
    )
    
}

Array.prototype.filter(units)