<script lang="ts">
    export let id: number;
    export let title: string;
    export let realized: boolean = false;
</script>

<figure
        class="min-h-[6rem] bg-white rounded-2xl p-4 hover:bg-indigo-600 cursor-pointer transition-all border-2 border-black hover:text-white select-none"
        data-id="{id}"
>
    <h3 class="text-sm font-bold uppercase" class:line-through={realized}>{ title }</h3>
    <hr class="mt-2">
    <p class="p-2 text-justify"  class:line-through={realized}>
        <slot />
    </p>
</figure>