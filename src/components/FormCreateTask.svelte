<script lang="ts">
    import {createEventDispatcher} from 'svelte';
    import {add, tasks} from '../store/task';
    import Task from "../class/Task";
    import validator from 'validator';
    import {fade} from "svelte/transition";
    import {onMount} from 'svelte';

    export let titleMessageError: string = '';
    export let contentMessageError: string = '';

    const dispatch = createEventDispatcher();

    function addTask(event) {
        event.stopPropagation();
        event.preventDefault();

        titleMessageError = ''
        contentMessageError = ''

        let title: string = document.getElementById<HTMLInputElement>('title').value;
        let content: string = document.getElementById<HTMLInputElement>('content').value;

        if (validator.isEmpty(title)) {
            titleMessageError = "Le titre est obligatoire";
            return;
        }

        if (validator.isEmpty(content)) {
            contentMessageError = "Le contenu est obligatoire";
            return;
        }

        let task = new Task(title, content);
        add(task);

        dispatch('addedTask', task);
    }

    onMount(() => {
        document.getElementById<HTMLInputElement>('title').focus();
    });
</script>

<form action="#" class="flex flex-col justify-center items-center">
    { #if titleMessageError }
        <div class="text-red-500" transition:fade="{{ duration: 300 }}">
            <span>{titleMessageError}</span>
        </div>
    {/if}
    <div class="relative w-full after:content-['*'] after:relative after:w-full after:h-12 after:bg-black after:block after:rounded-lg after:-top-10 after:left-2 after:z-0">
        <label for="title" class="sr-only">Titre</label>
        <input type="text" id="title"
               class="relative w-full border-2 border-black rounded-lg h-12 z-10 placeholder:text-slate-400 focus-visible:outline-black focus-visible:outline-0 pl-5"
               placeholder="Titre"
        >
    </div>
    { #if contentMessageError }
        <div class="text-red-500" transition:fade="{{ duration: 300 }}">
            <span>{contentMessageError}</span>
        </div>
    {/if}
    <div class="relative w-full after:content-['*'] after:relative after:w-full after:h-12 after:bg-black after:block after:rounded-lg after:-top-10 after:left-2 after:z-0">
        <label for="content" class="sr-only">Contenu</label>
        <textarea name="content" id="content" cols="30" rows="10"
                  class="relative w-full border-2 border-black rounded-lg h-12 z-10 placeholder:text-slate-400 focus-visible:outline-black focus-visible:outline-0 pl-5 pt-2 min-h-[4rem]"
                  placeholder="Ma tâche"></textarea>
    </div>
    <div class="self-end">
        <div class="relative group">
            <span class="block top-2 left-1 absolute px-4 py-2 rounded-xl font-bold bg-yellow-200 bg-black w-full h-full group-hover:rounded-3xl transition-all"></span>
            <button type="submit"
                    class="absolute top-0 left-0 border border-black px-4 py-2 rounded-xl font-bold bg-yellow-200 relative group-hover:rounded-3xl transition-all group-hover:bg-yellow-300"
                    on:click={addTask}>
                Créer une tâche
            </button>
        </div>
    </div>
</form>