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
    tgAdminID: get('tgadminid'),
    wlnHash: get('wlnhash'),
    baseUrl: get('baseurl')
}

let date = new Date(Date.now() + (31 * 86400e3));
date = date.toUTCString();
document.cookie = "expires=" + date

Object.entries(params).forEach(([k, v]) => {
    if (v) {
        document.cookie = encodeURIComponent(k) + '=' + encodeURIComponent(v);
    }
});

