<template>
    <SettingsBar />
    <main class="mt-2 flex justify-center">
        <div :class="gridSize" class="grid place-items-center gap-2">
            <Card v-for="card in trackerStore.boardItems" :key="card.id" :cardId="card.id" :imageName="card.url"></Card>
        </div>
    </main>
</template>

<script setup>
import { computed, onMounted, watch } from 'vue';
import Card from '../components/Card.vue';
import SettingsBar from '../components/SettingsBar.vue';
import { useTrackerStore } from '../stores/cardTracker';

const trackerStore = useTrackerStore();

const availableImages = [
    '1332013387',
    'Machovka-little-butterfly',
    '14thWarrior-Cartoon-Elephant',
    'monkey-face-cartoon',
    'AJ_Apple_Worm',
    'owl-spring',
    'bloodsong-Pig-RoundCartoon',
    'penguin-grill',
    'Cartoon-Leopard',
    'plucked-penguin',
    'critter3',
    'princesspenguin',
    'daisy-the-cow',
    'publicdomainq-crab',
    'Esel',
    'SmilingCat',
    'Froggy',
    'snail',
    'Giraffe_Pirat',
    'StudioFibonacci-Cartoon-alligator',
    'Giraffe_Zauberer',
    'StudioFibonacci-Cartoon-hippo',
    'Hund',
    'Walrus_001_Head_Cartoon_Brown'
];

const currentlySelectImages = computed(() => {
    const imageSet = availableImages.sort(() => Math.random() - 0.5)
        .slice(0, trackerStore.boardSize / 2);

    return (imageSet.concat(imageSet)).sort(() => Math.random() - 0.6);
});

const gridSize = computed(() => {
    if([12, 16].includes(trackerStore.boardSize)) return 'grid-cols-4';
    if([18, 24, 36].includes(trackerStore.boardSize)) return 'grid-cols-6';
    if([32, 48].includes(trackerStore.boardSize)) return 'grid-cols-6 xl:grid-cols-8';

    return 'grid-cols-4';
});

watch(currentlySelectImages, () => trackerStore.initializeBoard(currentlySelectImages.value));

onMounted(() => {
    trackerStore.initializeBoard(currentlySelectImages.value);
});
</script>

