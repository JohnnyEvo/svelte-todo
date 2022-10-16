<script lang='ts'>
    import './i18n';
    import List from './components/List.svelte';
    import Card from './components/Card.svelte';
    import FakeCard from './components/FakeCard.svelte';
    import Modal from './components/Modal.svelte';
    import FormCreateTask from './components/FormCreateTask.svelte';
    import {fade} from 'svelte/transition';
    import {draggable} from '@neodrag/svelte';
    import {getTasksFinished, update as updateTask} from './store/task';
    import {elementsOverlap} from './utils';
    import {_, isLoading} from 'svelte-i18n';
    import Loader from './components/Loader.svelte';

    export let fakeCardActive: boolean = false;
    export let fakeCardHover: boolean = false;

    $: tasksInProgress = getTasksFinished(false);
    $: tasksFinished = getTasksFinished(true);

    let showCreateTaskModal = false;

    function createTaskModal(): void {
        showCreateTaskModal = true;
    }

    function closeCreateTaskModal() {
        showCreateTaskModal = false;
    }

    function addedTask() {
        showCreateTaskModal = false;
    }

    function draggingStarted() {
        fakeCardActive = true;
    }

    function draggingEnded(event) {
        let fakeCardElement = document.getElementById('fakeCard');
        let eventElement = <HTMLElement>event.target;

        if (elementsOverlap(fakeCardElement, eventElement)) {
            let id = parseInt(eventElement.childNodes[0].dataset.id);
            updateTask(id);
        }

        fakeCardActive = false;
    }

    function dragging<CustomEvent>(event) {
        let fakeCardElement = document.getElementById('fakeCard');
        let eventElement = event.target;

        fakeCardHover = elementsOverlap(fakeCardElement, eventElement);
    }
</script>

{#if $isLoading}
    <Loader/>
{:else}
    <div class='m-4'>
        <h1 class="text-4xl text-center font-['Fredoka_One']">{$_('title')}</h1>

        <div class='text-center my-2'>
            <button
                    class='border border-black px-4 py-2 rounded-xl font-bold bg-yellow-200 relative group hover:rounded-3xl transition-all hover:bg-yellow-300'
                    on:click={createTaskModal}>
        <span
                class='block top-2 left-1 absolute px-4 py-2 rounded-xl font-bold bg-yellow-200 -z-10 bg-black w-full h-full group-hover:rounded-3xl transition-all'></span>
              {$_('create_task')}
            </button>
        </div>

        <div class='max-w-2xl mx-auto mt-2 grid sm:grid-cols-2 gap-2'>
            <div>
                <List title='{$_("todo")}'>
                    <ul>
                        {#each $tasksInProgress as task, i (task.id)}
                            <li class='my-2' animate:fade
                                use:draggable={{}}
                                on:neodrag:start={(e) => draggingStarted(e)}
                                on:neodrag={(e) => dragging(e)}
                                on:neodrag:end={(e) => draggingEnded(e)}>
                                <Card title='{task.title}' id='{task.id}'>
                                    {task.content}
                                </Card>
                            </li>
                        {/each}
                    </ul>
                </List>
            </div>
            <div>
                <List title='{$_("finished")}'>
                    <ul class='h-full'>
                        <li class='my-2'>
                            <FakeCard visible='{fakeCardActive}' active='{fakeCardHover}'/>
                        </li>
                        {#each $tasksFinished as task (task.id)}
                            <li class='my-2' animate:fade>
                                <Card title='{task.title}' id='{task.id}' realized>
                                    {task.content}
                                </Card>
                            </li>
                        {/each}
                    </ul>
                </List>
            </div>
        </div>
    </div>

    <Modal visible='{showCreateTaskModal}' title='{$_("new_event")}' on:closeModal={closeCreateTaskModal}>
        <FormCreateTask on:addedTask={addedTask}/>
    </Modal>
{/if}
