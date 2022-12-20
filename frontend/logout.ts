window.addEventListener('DOMContentLoaded', () => {
    const logoutCookieName = "chatrix-logout";
    const cookies = document.cookie.split(';');
    const hasLogoutCookie = cookies.some(item => item.trim().startsWith(`${logoutCookieName}=`));

    if (!hasLogoutCookie) {
        return;
    }

    console.log("Logging out all chatrix sessions");
    logoutAndDeleteData().catch(error => console.log(error));
});

async function logoutAndDeleteData() {
    let sessionsKey = "";
    for (const [key,] of Object.entries(localStorage)) {
        if (key.startsWith('chatrix_sessions')) {
            sessionsKey = key;
            break;
        }
    }

    // Logout all sessions.
    const sessions = JSON.parse(localStorage.getItem(sessionsKey) ?? "[]");
    let logoutPromises: Promise<Response>[] = [];
    if (Array.isArray(sessions)) {
        sessions.forEach(session => logoutPromises.push(logoutSession(session)));
    }

    // Wait for all sessions to have been logged out.
    await Promise.all(logoutPromises);

    // Delete from local storage.
    for (const [key,] of Object.entries(localStorage)) {
        if (key.startsWith('chatrix') || key.startsWith('hydrogen')) {
            localStorage.removeItem(key);
        }
    }

    // Delete from indexedDB.
    const databases = await indexedDB.databases();
    for (const database of databases) {
        const name = database.name ?? "";
        if (name.startsWith('chatrix') || name.startsWith("hydrogen")) {
            await indexedDB.deleteDatabase(name);
        }
    }
}

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
