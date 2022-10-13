<script lang="ts">
    export let visible: boolean = false;
    export let active: boolean = false;
    export let idElement: string = 'fakeCard';
</script>

<figure class="min-h-[6rem] bg-opacity-40 rounded-2xl p-4 transition-all border-2 border-black border-dashed select-none"
        class:hidden={!visible}
        class:bg-indigo-600={active}
        class:bg-white={!active}
        id="{idElement}"
>
    <h3 class="text-sm font-bold uppercase"></h3>
    <p class="p-2 text-justify">
    </p>
</figure>