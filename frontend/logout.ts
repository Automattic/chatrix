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

    for (const [key, value] of Object.entries(localStorage)) {
        if (!key.startsWith('chatrix')) {
            continue;
        }
        if (!value) {
            continue;
        }
        let parsed = JSON.parse(value);
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
