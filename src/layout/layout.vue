<template>
  <div class="flex">
    <div
      class="bg-[#1F0354] h-screen sticky top-0 flex-col items-center py-8 md:flex hidden"
    >
      <div class="">
        <img
          src="@/assets/images/test-user-icon.png"
          alt=""
          class="w-[100px]"
        />
      </div>
      <TheNavbar />
      <button
        class="logout absolute bottom-4 left-1/2 -translate-x-1/2"
        @click="deleteAllData"
      >
        Delete All data
      </button>
    </div>
    <TheMobileNavbar />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import TheNavbar from "@/components/TheNavbar.vue";
import { useUserStore } from "@/store/userStore";
import { useTagsStore } from "@/store/useTags";
import {useContactsStore} from "@/store/useContacts";
import TheMobileNavbar from "@/components/TheMobileNavbar.vue";
const userStore = useUserStore();
const tagsStore = useTagsStore();
const contactsStore = useContactsStore()

tagsStore.initialize();

function deleteAllData() {
  userStore.clearAllData()
  tagsStore.initialize()
  contactsStore.initialize()
}
</script>

<style>
.logout {
  @apply transition-all whitespace-nowrap duration-200 p-2 bg-[#2A0096] text-white justify-self-end hover:bg-[#6909B8] block rounded-lg;
}
</style>
