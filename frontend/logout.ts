async function chatrixLogoutSession(session) {
    return fetch(session.homeserver + '/_matrix/client/v3/logout', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + session.accessToken,
        },
    });
}

window.addEventListener('DOMContentLoaded', () => {
    console.log("logout called");

    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        if (!key.startsWith('chatrix')) {
            continue;
        }
        let data = localStorage.getItem(key);
        if (!data) {
            continue;
        }
        let parsed = JSON.parse(data);
        if (!parsed || parsed.length < 1) {
            continue;
        }

        let session = parsed[0];
        this.chatrixLogoutSession(session).then(() => {
            localStorage.removeItem(key);
        }).catch((error) => {
            console.log(`Failed to logout chatrix session. deviceId: ${session.deviceId}`, error);
        });
    }
});
