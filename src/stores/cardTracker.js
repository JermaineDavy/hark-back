import { defineStore } from "pinia";
import { ref } from "vue";

export const useTrackerStore = defineStore('card-tracker', () => {
    const boardSize = ref(12);
    const boardItems = ref([]);
    const moveCounter = ref(0);
    const foundItems = ref([]);
    const currentlySelectedItems = ref([]);

    function initializeBoard(imageSet) {
        $reset();

        imageSet.forEach((image, index) => {
            boardItems.value.push({
                id: index,
                url: image,
                show: false
            });
        });
    }

    function clearCurrentItems() {
        if(!foundItems.value.includes(currentlySelectedItems.value[0])) {
            if(currentlySelectedItems.value[0] !== undefined) {
                boardItems.value[currentlySelectedItems.value[0]].show = false;
            }

            if(currentlySelectedItems.value[1] !== undefined) {
                boardItems.value[currentlySelectedItems.value[1]].show = false;
            }
        }

        currentlySelectedItems.value = [];
    }

    function addToFoundItems(firstCardId, secondCardId) {
        boardItems.value[firstCardId].show = true;
        boardItems.value[secondCardId].show = true;

        foundItems.value.push(firstCardId, secondCardId);
    }

    function checkCardsMatched(firstCardId, secondCardId) {
        if(firstCardId == secondCardId) {
            return false;
        }

        if(boardItems.value[firstCardId].url == boardItems.value[secondCardId].url) {
            return true;
        }

        return false;
    }

    function addItemToCurrentlySelected(itemId, showCardState) {
        if(showCardState) {
            return ;
        }

        if(currentlySelectedItems.value.length < 2) {
            currentlySelectedItems.value.push(itemId);

            boardItems.value[currentlySelectedItems.value[0]].show = true;
        }

        if(currentlySelectedItems.value.length >= 2) {
            moveCounter.value++;

            if(checkCardsMatched(currentlySelectedItems.value[0], currentlySelectedItems.value[1])) {
                addToFoundItems(currentlySelectedItems.value[0], currentlySelectedItems.value[1]);
            }

            setTimeout(() => clearCurrentItems(), 500);
        }
    }

    function $reset() {
        boardItems.value = [];
        foundItems.value = [];
        moveCounter.value = 0;
    }

    return {
        initializeBoard,
        addItemToCurrentlySelected,
        boardItems, 
        boardSize,
        foundItems,
        currentlySelectedItems,
        moveCounter
    };
});
