const defaults: RequestInit = {
    method: "GET",
    headers: {
        "Content-Type": "application/json"
    },
};

export const auth = (email: string, password: string) => fetch("/api/users/auth", {
    ...defaults,
    method: "POST",
    body: JSON.stringify({
        email,
        password
    }),
});

export const signOut = (uid: string) => fetch("/api/users/signout", {
    ...defaults,
    method: "POST",
    body: JSON.stringify({
        uid
    }),
});