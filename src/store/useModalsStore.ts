import {defineStore} from "pinia"
import {reactive} from "vue"
export const useModalsStore = defineStore('useModalsStore', () => {
    const modals = reactive({
        addContactModal: false,
        addTagModal: false
    })
    function closeModal(key: string) {
        modals[key] = false
    }

    function openModal(key: string) {
        modals[key] = true
    }

    function closeAllModals() {
        modals.addContactModal = false
        modals.addTagModal = false
    }

    return {modals, closeModal, openModal, closeAllModals}
})