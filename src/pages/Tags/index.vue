<template>
  <div class="w-full container mx-auto my-6 text-white relative">
    <button
      @click="modalsStore.openModal('addTagModal')"
      class="absolute right-0 bg-[#2A0096] md:block  hidden hover:bg-[#6909B8] m-2 p-2 text-sm rounded-full"
    >
      #+
    </button>
    <div>
      <h6 class="text-3xl text-white text-center">Tags</h6>
      <ul
        class="grid md:grid-cols-2 gap-2 mx-6 mt-12"
        v-if="tagsStore.tags.length > 0"
      >
        <li
          v-for="item in tagsStore.tags"
          class="group flex justify-between px-6 py-5 transition-all duration-300 cursor-pointer bg-[#DBE3FF1A] hover:bg-[#4200D8b9] rounded-lg text-white"
        >
          <div class="flex flex-col">
            <span class="text-sm font-medium leading-md">
              {{ item.title }}
            </span>
          </div>
          <button class="transition-all easy-in hover:scale-[1.3] duration-300 group-hover:opacity-100 md:opacity-0" @click="tagsStore.deleteTag(item.id)">
            <img src="@/assets/images/delete-icon.svg" class=" w-[28px]" alt="">
          </button>
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
        :is-modal-open="modalsStore.modals.addTagModal"
        @closeModal="modalsStore.closeModal"
        container-classes="bg-[#4200D8] px-4 py-8 rounded-md"
        modal-key="addTagModal"
      >
        <CreateTag @closeModal="modalsStore.closeModal" modal-key="addTagModal" />
      </TheModal>
    </teleport>
  </div>
</template>

<script setup lang="ts">
import { useTagsStore } from "@/store/useTags";
import TheModal from "@/components/TheModal.vue";
import CreateTag from "@/components/ModalForms/CreateTag.vue";
import {useModalsStore} from "@/store/useModalsStore";

const modalsStore = useModalsStore()
const tagsStore = useTagsStore();
</script>
