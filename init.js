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
        let date = new Date(Date.now() + (31*86400e3));
        date = date.toUTCString();
        document.cookie = "expires=" + date

        function set_fields() {
            document.getElementById('aquireToken')
        }




    } catch (error) {
        console.log(error)
    }

})()