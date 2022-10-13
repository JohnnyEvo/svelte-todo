<script lang="ts">
    export let title: string;
</script>

<h2 class="text-center text-xl my-2">{title}</h2>
<div class="h-full">
    <slot/>
</div>