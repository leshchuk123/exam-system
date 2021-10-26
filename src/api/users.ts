const defaults = {
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

export const users = () => fetch("/api/users", {
    ...defaults,
});

export const user = (id: string | number) => fetch(`/api/users/${id}`, {
    ...defaults,
});
