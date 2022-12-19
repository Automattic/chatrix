window.addEventListener('DOMContentLoaded', () => {
    console.log("Logging out all chatrix sessions");

    let sessionsKey = "";
    for (const [key,] of Object.entries(localStorage)) {
        if (key.startsWith('chatrix_sessions')) {
            sessionsKey = key;
            break;
        }
    }

    let sessions = JSON.parse(localStorage.getItem(sessionsKey) ?? "");

    let logoutPromises: Promise<Response>[] = [];
    if (Array.isArray(sessions)) {
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
