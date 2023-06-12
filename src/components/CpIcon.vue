<script setup lang="ts">
defineProps<{ name: string }>()
</script>

<template>
    <svg aria-hidden="true" class="cp-icon">
        <use :href="`#icon-${name}`" />
    </svg>
</template>

<style scoped lang="scss">
.cp-icon {
    // 和字体一样大
    width: 1em;
    height: 1em;
}
</style>
