window.addEventListener('DOMContentLoaded', () => {
    console.log("Logging out all chatrix sessions");

    let logoutPromises: Promise<Response>[] = [];
    for (const [key, value] of Object.entries(localStorage)) {
        if (!key.startsWith('chatrix_sessions')) {
            continue;
        }

        let sessions = JSON.parse(value);
        if (!Array.isArray(sessions)) {
            continue;
        }

        sessions.forEach(session => {
            logoutPromises.push(logoutSession(session));
        });
    }

    // Once all sessions have been logged out, delete all chatrix data from local storage.
    Promise.all(logoutPromises).finally(() => {
        for (const [key,] of Object.entries(localStorage)) {
            if (key.startsWith('chatrix')) {
                localStorage.removeItem(key);
            }
        }
    });
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
