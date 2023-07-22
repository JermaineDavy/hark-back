<template>
    <div class="max-w-screen-xl grid grid-place-items-center md:place-items-center grid-cols-2 sm:grid-cols-2 md:grid-cols-4 mx-auto p-4 border-gray-200 bg-sky-500 text-white rounded-br rounded-bl">
        <div class="relative">
            <button @click="showSizeSelector =! showSizeSelector" type="button" class="flex justify-center place-items-center bg-sky-400 hover:bg-sky-300 py-1 px-3 rounded">
                <span>{{ trackerStore.boardSize }} cards</span>
                <svg class="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                </svg>
            </button>
            
            <ul v-if="showSizeSelector" class="text-sm shadow duration-700 w-28 px-0 py-2 text-center absolute left-auto top-10 z-20 bg-sky-400 text-white font-medium list-none rounded border-0 before:left-auto before:top-10">
                <li v-for="(block, index) in availableSizes" :key="index" @click="setBoardSize(block)" class="p-1 ease-soft clear-both block w-full hover:bg-gray-800 hover:text-white bg-transparent whitespace-nowrap">{{ block }} cards</li>
            </ul>
        </div>

        <div class="font-medium">{{ remainingItems }}/{{ trackerStore.boardSize }} Cards remaining</div>
        
        <div class="font-medium">{{ trackerStore.moveCounter }} Move<span v-if="trackerStore.moveCounter != 1">s</span></div>
        
        <div class="font-medium">{{ timeTaken }}</div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useTrackerStore } from '../stores/cardTracker';

const availableSizes = [12, 16, 18, 24, 32, 36, 48];
const counter = ref(0);
const showSizeSelector = ref(false);

const trackerStore = useTrackerStore();

const timer = setInterval(() => {
    counter.value++;
}, 1000);

const remainingItems = computed(() => {
    return trackerStore.boardSize - trackerStore.foundItems.length;
});

const timeTaken = computed(() => {
    let minutes = Math.floor(counter.value / 60);
    const seconds = counter.value - (minutes * 60);

    if(minutes > 59) {
        const hours = Math.floor(minutes / 60);
        minutes = minutes - (hours * 60);

        return `${hours}:${padTimeValue(minutes)}:${padTimeValue(seconds)}`;
    }

    return `${padTimeValue(minutes)}:${padTimeValue(seconds)}`;
});

function setBoardSize(newBoardSize) {
    trackerStore.boardSize = newBoardSize;
    counter.value = 0;
    showSizeSelector.value = false;
}

function padTimeValue(value) {
    if(value < 10) {
        return `0${value}`;
    }

    return value;
}

watch(remainingItems, () => {
    if(remainingItems.value == 0) {
        clearInterval(timer);
    }
});
</script>