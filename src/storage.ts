import type Task from "./class/Task";

export function getStorage(key: string) {
    return JSON.parse(localStorage.getItem(key));
}

export function setStorage(key, tasks: Task[]) {
    localStorage.setItem(key, JSON.stringify(tasks));
}
