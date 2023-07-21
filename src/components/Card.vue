<template>
    <div :class="flipCard" class="card-content col-span-1 min-h-20 h-20 md:h-24 lg:h-32 min-w-10 w-10 md:w-20 lg:w-40 flex justify-center items-center bg-sky-300 hover:bg-sky-200 px-1 shadow rounded" @click="trackerStore.addItemToCurrentlySelected(props.cardId, showCard)">
        <img :src="imagePath" :alt="imageName" v-show="showCard" style="max-height: 90%;">

        <img src="/assets/Jellyfish-Coloring-book.svg" alt="🍌" v-show="!showCard" style="max-height: 25%;">
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useTrackerStore } from '../stores/cardTracker';

const props = defineProps(['imageName', 'showImage', 'cardId']);
const imagePath = computed(() => `/assets/images/${props.imageName}.svg`);
const trackerStore = useTrackerStore();

const showCard = computed(() => {
    if(trackerStore.boardItems[props.cardId].show || trackerStore.currentlySelectedItems.includes(props.cardId)) {
        return true;
    }

    return false;
});

const flipCard = computed(() => {
    if(showCard.value) {
        return 'flip-up';
    }

    return 'flip-down';
});
</script>

<style>
.card-content {
    transform: rotateY(180deg);
    cursor: pointer;
    z-index: 1;
}

.flip-up {
    animation: flip-card-up 0.5s
}

.flip-down {
    animation: flip-card-down 0.5s;
}

@keyframes flip-card-up {
    from {
        transform: rotateY(180deg);
    }

    to {
        transform: rotateY(-180deg);
    }
}

@keyframes flip-card-down {
    from {
        transform: rotateY(180deg);
    }

    to {
        transform: rotateY(-180deg);
    }
}
</style>