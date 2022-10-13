import {derived, get, writable} from 'svelte/store';
import type Task from "../class/Task";
import {getStorage, setStorage} from "../storage";

const KEY = 'task';

export const tasks = writable<Task[]>(getStorage(KEY)??[]);

export const add = (task: Task) => {
    tasks.update((tasks: Task[]) => {
        tasks.push(task);

        setStorage(KEY, tasks);
        return tasks;
    });
}

export const remove = (task: Task) => {
    let tasksCopy = get(tasks).filter((elem: Task) => {
        return elem !== task;
    });

    tasks.set(tasksCopy);
}

export const update = (id: number) => {
    let task = get(tasks).find(task => task.id === id);
    remove(task);
    task.terminated = true;
    add(task);
}

export const getTasksFinished = (terminated = false) => {
    return derived(
        tasks,
        $tasks => $tasks.filter((task: Task) => task.terminated === terminated)
    )
}
