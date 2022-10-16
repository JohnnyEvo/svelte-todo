<script lang="ts">
    import {createEventDispatcher} from 'svelte';
    import {fade} from "svelte/transition";
    import keycode from "keycode";
    import {_} from 'svelte-i18n';

    export let visible: boolean;
    export let title: string;

    const dispatch = createEventDispatcher();

    document.addEventListener('keydown', <KeyboardEvent>(e) => {
        if (keycode(e) === 'esc') {
            close();
        }
    });

    function close(): void {
        visible = false;
        dispatch('closeModal');
    }
</script>

{#if visible}
    <div
            class="w-full h-full bg-indigo-600 absolute top-0 left-0 z-50 flex justify-center items-center p-4 transition-all"
            transition:fade="{{ duration: 300 }}"
    >
        <div class="bg-white w-full max-w-2xl min-h-[10rem] p-2 rounded-3xl rounded-tl-none rounded-tr-none relative">
            <div class="absolute border border-black -top-6 h-12 flex items-center justify-center left-0 bg-yellow-200 rounded-3xl w-1/3">
                {title}
            </div>
            <div class="absolute border border-black -top-6 h-12 flex items-center justify-center -right-1 bg-yellow-200 rounded-3xl w-12 text-3xl cursor-pointer"
                 on:click={close}
                 title="{$_('close')}"
            >
                <span class="relative -top-1">⨯</span>
            </div>
            <div class="p-6 h-full">
                <slot/>
            </div>
        </div>
    </div>
{/if}