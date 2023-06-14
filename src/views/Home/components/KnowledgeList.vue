<script setup lang="ts">
import KnowledgeCard from './KnowledgeCard.vue'
</script>

<template>
    <div class="knowledge-list">
        <KnowledgeCard v-for="i in 5" :key="i"></KnowledgeCard>
    </div>
</template>

<style lang="scss" scoped>
.knowledge-list {
    padding: 0 15px;
}
</style>
