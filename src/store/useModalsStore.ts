import {defineStore} from "pinia"
import {reactive} from "vue"
type ModalTypes = {
    addContactModal: boolean
    addTagModal: boolean
}
export const useModalsStore = defineStore('useModalsStore', () => {
    const modals: ModalTypes | any = reactive({
        addContactModal: false,
        addTagModal: false
    })
    function closeModal(key: string | any) {
        modals[key] = false
    }

    function openModal(key: string | any) {
        modals[key] = true
    }

    function closeAllModals() {
        modals.addContactModal = false
        modals.addTagModal = false
    }

    return {modals, closeModal, openModal, closeAllModals}
})