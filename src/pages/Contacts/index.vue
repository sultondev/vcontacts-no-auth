<template>
  <div class="w-full relative text-white">
    <button
      @click="openModal('addContactModal')"
      class="absolute right-0 bg-[#2A0096] hover:bg-[#6909B8] m-2 p-3 rounded-full"
    >
      <img src="@/assets/images/add-user-icon.svg" alt="" class="w-[16px]" />
    </button>

    <div class="w-[80%] mx-auto pt-2">
      <h5 class="text-3xl text-white text-center">Contacts</h5>
      <div class="mx-auto w-fit my-6">
        <Multiselect v-model="searchData.tags" placeholder="Search or add a tag"
                     label="name" track-by="id" class="max-w-[315px]" :options="tagsStore?.tagOptions" :multiple="true" ></Multiselect>
      </div>
      <ul
        class="flex flex-col gap-2 mt-12"
        v-if="contactStore.filteredContacts(searchData.tags)?.length > 0"
      >
        <li
          v-for="item in contactStore.filteredContacts(searchData.tags)"
          class="group px-6 flex justify-between py-5 transition-all duration-300 cursor-pointer bg-[#DBE3FF1A] hover:bg-[#4200D8b9] rounded-lg text-white"
          :key="item.id + item.email"
        >
          <div class="flex flex-col">
            <span class="text-sm font-medium leading-md">
              {{ item.name }}
            </span>
            <span class="text-[#DBE3FFA2] text-xs font-normal">
              +998 {{ item.phone }}
            </span>
            <span class="flex my-1 gap-1" v-if="item.tags">
              <span
                v-for="tag in item.tags"
                :key="tag?.id"
                class="hashtag"
              >
                #{{tagsStore.findTagById(tag?.id)}}
              </span>
            </span>
          </div>
          <div class="flex gap-4">
          <button class="transition-all easy-in hover:scale-[1.2] duration-200 group-hover:opacity-100 opacity-0" @click="contactStore.deleteContact(item.id)">
            <img src="@/assets/images/delete-icon.svg" class=" w-[28px]" alt="">
          </button>
          <button class="transition-all easy-in hover:scale-[1.2] duration-200 group-hover:opacity-100 opacity-0" @click="editContact(item?.id)">
            <img src="@/assets/images/edit-icon.png" class=" w-[28px]" alt="">
          </button>
          </div>
        </li>
      </ul>
      <div
        class="mx-auto flex flex-col items-center justify-center my-20"
        v-else
      >
        <img src="@/assets/images/no-data.svg" alt="" class="w-[260px]" />
        <h6 class="text-white text-4xl">No data</h6>
      </div>
    </div>
    <teleport to="#modal">
      <TheModal
        :is-modal-open="modals.addContactModal"
        @closeModal="closeModal"
        modal-key="addContactModal"
        container-classes="bg-[#4200D8] px-4 py-8 rounded-md"
      >
        <CreateContact @closeModal="closeModal" modal-key="addContactModal" />
      </TheModal>
    </teleport>
    <teleport to="#modal">
      <TheModal
          :is-modal-open="modals.editContactModal"
          @closeModal="closeModal"
          modal-key="editContactModal"
          container-classes="bg-[#4200D8] px-4 py-8 rounded-md"
      >
        <UpdateContact :contact-id="selectedContact.id" @closeModal="closeModal"
                       modal-key="editContactModal" />
      </TheModal>
    </teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed} from "vue";
import TheModal from "@/components/TheModal.vue";
import CreateContact from "@/components/ModalForms/CreateContact.vue";
import { useContactsStore } from "@/store/useContacts";
import {useTagsStore} from "@/store/useTags";
import Multiselect from 'vue-multiselect'
import UpdateContact from "@/components/ModalForms/UpdateContact.vue";

const modals: any = reactive({
  addContactModal: false,
  editContactModal: false
})
const selectedContact = reactive({
    id: ''
})

function closeModal(key: string | any){
  modals[key] = false;
}
function openModal(key: string | any){
  modals[key] = true;
}

function editContact(id: string) {
  selectedContact.id = id
  openModal('editContactModal')
}
const searchData = reactive({
  tags: []
})
const contactStore = useContactsStore();
const tagsStore = useTagsStore()
contactStore.initialize();

</script>

<style>
.hashtag {
  @apply text-xs bg-[#0080D0] p-1 block rounded-md;
}
</style>
