(function () {

    try {
        function get(name) {
            if (name = (new RegExp('[?&]' + encodeURIComponent(name) + '=([^&]*)')).exec(location.search))
                return decodeURIComponent(name[1]);
        }

        const params = {
            aToken: get('atoken'),
            tgToken: get('tgtoken'),
            adminID: get('tgadminid')
        }

        Object.entries(params).forEach(([k, v]) => {
            if (v) {
                document.cookie = encodeURIComponent(k) + '=' + encodeURIComponent(v);
            }
        });


    } catch (error) {
        console.log(error)
    }

})()