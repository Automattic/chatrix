window.addEventListener('DOMContentLoaded', () => {
    let logoutPromises: Promise<Response>[] = [];

    for (const [key, value] of Object.entries(localStorage)) {
        if (!key.startsWith('chatrix_sessions')) {
            continue;
        }

        let sessions = JSON.parse(value);
        if (!sessions || sessions.length < 1) {
            continue;
        }

        for (const session in sessions) {
            logoutPromises.push(logoutSession(session));
        }
    }
});

async function logoutSession(session) {
    let promise = fetch(session.homeserver + '/_matrix/client/v3/logout', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + session.accessToken,
        },
    });

    promise.catch(error => {
        console.log(`Failed to logout chatrix session. deviceId: ${session.deviceId}`, error);
    });

    return promise;
}
