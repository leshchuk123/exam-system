const defaults: RequestInit = {
    method: "GET",
    headers: {
        "Content-Type": "application/json"
    },
};

export const getExamTasks = (speciality: number, grade: number) => {
    return fetch(`/api/exam/${speciality}/${grade}`, {
        ...defaults,
    });
}