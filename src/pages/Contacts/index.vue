<template>
  <div class="w-full relative text-white">
    <button
      @click="modalsStore.openModal('addContactModal')"
      class="absolute right-0 bg-[#2A0096] hover:bg-[#6909B8] md:block hidden m-2 p-3 rounded-full"
    >
      <img src="@/assets/images/add-user-icon.svg" alt="" class="w-[16px]" />
    </button>

    <div class="w-[80%] mx-auto pt-2">
      <h5 class="text-3xl text-white text-center">Contacts</h5>
      <div class="mx-auto flex md:flex-row flex-col-reverse w-full justify-center gap-4 my-6">
        <div>
            <Multiselect v-model="search.data" placeholder="Search or add a tag"
                         v-if="search.type?.name === 'tags'"
                         label="name" track-by="id" class="md:w-[315px] w-full"  :options="tagsStore?.tagOptions" :multiple="true" >
            </Multiselect>
          <Input
              v-else
              :text="search.data"
              @input-change="handleInputChange"
              class="px-2 py-2 rounded-md border-2 bg-white text-sm text-black"
              max="30"
              min="3"
              field-key="data"
              :placeholder="`Enter your information`"
          />
        </div>
          <Multiselect v-model="search.type" placeholder="Search mode"
                       label="name" track-by="id" class="md:max-w-[160px] w-full" :options="search.options" :multiple="false" >
          </Multiselect>
      </div>
      <ul
        class="flex flex-col gap-2 mt-12"
        v-if="searchResult?.length > 0"
      >
        <li
          v-for="item in searchResult"
          class="group px-6 flex justify-between py-5 transition-all duration-300 cursor-pointer bg-[#DBE3FF1A] hover:bg-[#4200D8b9] rounded-lg text-white"
          :key="item.id + item.email"
        >
          <div class="flex flex-col gap-y-1 gap-x-2">
            <span class="text-sm font-medium leading-md">
              {{ item.name }}
            </span>
            <span class="text-[#DBE3FFA2] text-xs font-normal">
              {{item.email}}
            </span>
            <span class="text-[#DBE3FFA2] text-xs font-normal">
              +998 {{ item.phone }}
            </span>
            <span class="flex flex-wrap my-1 gap-1" v-if="item?.tags.length">
              <span
                v-for="tag in item.tags"
                :key="tag?.id"
                class="hashtag"
              >
                #{{tagsStore.findTagById(tag?.id, item?.id)}}
              </span>
            </span>
          </div>
          <div class="flex gap-4 min-w-[118px]">
            <button class="transition-all easy-in hover:scale-[1.2] duration-200 group-hover:opacity-100 md:opacity-0"
                  @click="viewContact(item?.id)"
            >
              <img src="@/assets/images/view-icon.png" class=" w-[30px]" alt="">
            </button>
            <button class="transition-all easy-in hover:scale-[1.2] duration-200 group-hover:opacity-100 md:opacity-0"
                    @click="contactStore.deleteContact(item.id)">
              <img src="@/assets/images/delete-icon.svg" class=" w-[28px]" alt="">
            </button>
            <button class="transition-all easy-in hover:scale-[1.2] duration-200 group-hover:opacity-100 md:opacity-0"
                    @click="editContact(item?.id)">
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
        :is-modal-open="modalsStore.modals.addContactModal"
        @closeModal="modalsStore.closeModal"
        modal-key="addContactModal"
        container-classes="bg-[#4200D8] px-4 py-8 rounded-md"
      >
        <CreateContact @closeModal="modalsStore.closeModal" modal-key="addContactModal" />
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
    <teleport to="#modal">
      <TheModal
          :is-modal-open="modals.readOnlyContactModal"
          @closeModal="closeModal"
          modal-key="readOnlyContactModal"
          container-classes="bg-[#4200D8] px-4 py-8 rounded-md"
      >
        <ReadContact :contact-id="selectedContact.id" @closeModal="closeModal"
                       modal-key="readOnlyContactModal" />
      </TheModal>
    </teleport>
  </div>
</template>

<script setup lang="ts">
import { watch, reactive, computed } from "vue";
import TheModal from "@/components/TheModal.vue";
import CreateContact from "@/components/ModalForms/CreateContact.vue";
import { useContactsStore } from "@/store/useContacts";
import {useTagsStore} from "@/store/useTags";
import Multiselect from 'vue-multiselect'
import UpdateContact from "@/components/ModalForms/UpdateContact.vue";
import Input from "@/components/UI/Input.vue";
import {ContactSearchType} from "@/typing/types/contacts";
import {useModalsStore} from "@/store/useModalsStore";
import ReadContact from "@/components/ModalForms/ReadContact.vue";

const modals: any = reactive({
  editContactModal: false,
  readOnlyContactModal: false
})
const modalsStore = useModalsStore()
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

function viewContact(id: string) {
  selectedContact.id = id
  console.log('dwadw')
  openModal('readOnlyContactModal')
}
const search: ContactSearchType | any = reactive({
  data: "",
  type: "",
  options: [
    {
      name: "name",
      id: "WLJIAJdlwljljiI"
    },
    {
      name: "email",
      id: "defaDQQ2312"
    },
    {
      name: "phone",
      id: "98JDLWAIJ"
    },
    {
      name: "tags",
      id: "08JDIAWj"
    }
  ]
})
// const readOnyContactOptions = ref([
//   {name:}
// ])
const contactStore = useContactsStore();
const tagsStore = useTagsStore()
contactStore.initialize();
const searchResult = computed(()=>contactStore.filteredContacts(search.data, search?.type?.name))


function handleInputChange(value: string, key: string) {
  search[key] = value;
}

watch(()=> search.type, () => {
  search.data = ''
})

</script>

<style>
.hashtag {
  @apply text-xs bg-[#0080D0] p-1 block rounded-md;
}
</style>
