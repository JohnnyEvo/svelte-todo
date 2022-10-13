class Task {
    id: number;
    title: string;
    content: string;
    terminated: boolean;

    constructor(title: string, content: string) {
        this.title = title;
        this.content = content;
        this.terminated = false;
        this.id = Date.now();
    }
}

export default Task;
