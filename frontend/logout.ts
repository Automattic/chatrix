async function chatrixLogoutSession(session) {
    return fetch(session.homeserver + '/_matrix/client/v3/logout', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + session.accessToken,
        },
    });
}

window.addEventListener('DOMContentLoaded', () => {
    for (const [key, value] of Object.entries(localStorage)) {
        if (!key.startsWith('chatrix_sessions')) {
            continue;
        }

        let sessions = JSON.parse(value);
        if (!sessions || sessions.length < 1) {
            continue;
        }

        let session = sessions[0];
        this.chatrixLogoutSession(session).then(() => {
            localStorage.removeItem(key);
        }).catch((error) => {
            console.log(`Failed to logout chatrix session. deviceId: ${session.deviceId}`, error);
        });
    }
});
