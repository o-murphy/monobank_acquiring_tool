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

        function set_fields() {
            document.getElementById('aquireToken').value = getCookie('atoken')
            document.getElementById('tgBotToken').value = getCookie('tgtoken')
            document.getElementById('tgBotAdminID').value = getCookie('tgadminid')
        }

        const params = {
            aToken: get('atoken'),
            tgToken: get('tgtoken'),
            adminID: get('tgadminid')
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

    } catch (error) {
        console.log(error)
    }

})()