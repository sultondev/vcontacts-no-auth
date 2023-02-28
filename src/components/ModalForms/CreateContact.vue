<template>
  <form @submit.prevent="createContact" class="flex flex-col gap-4">
    <FormGroup title="Name" class="text-white">
      <Input
        @input-change="handleInputChange"
        :error="formData.$v?.value.name.$error"
        class="py-1 px-2 rounded-md border-2 bg-white text-black"
        max="30"
        min="3"
        field-key="name"
        placeholder="Enter your name"
      />
    </FormGroup>
    <FormGroup title="Phone" class="text-white">
      <Input
        @input-change="handleInputChange"
        :error="formData.$v?.value.phone.$error"
        prefix-classes="mr-1"
        class="py-1 px-2 rounded-md border-2 bg-white text-black"
        prefix="+998"
        maskaOptions="## ###-##-##"
        placeholder="00 000-00-00"
        field-key="phone"
      />
    </FormGroup>
    <FormGroup title="Email" class="text-white">
      <Input
        @input-change="handleInputChange"
        :error="formData.$v?.value.email.$error"
        prefix-classes="mr-1"
        class="py-1 px-2 rounded-md border-2 bg-white text-black"
        field-key="email"
        placeholder="Enter username or email"
      />
    </FormGroup>
    <FormGroup title="Tags" header-classes="text-white mb-2">
      <Multiselect v-model="formData.values.tags" placeholder="Search or add a tag"
                   label="name" track-by="id" class="max-w-[315px]" :options="tagsStore?.tagOptions" :multiple="true" ></Multiselect>
    </FormGroup>

    <Button
      type="submit"
      :loading="false"
      aria-label="Submit"
      spinner-color="#cdcdcd"
      class="bg-[#2A0096] transition-all duration-600 hover:bg-[#0080D0] text-white py-2 rounded-xl text-center disabled:opacity-50"
      :disabled="
        formData.$v?.value.phone.$error || formData.$v.value.name.$error
      "
    >
      Create
    </Button>
  </form>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from "vue";
import Input from "@/components/UI/Input.vue";
import { minLength, required, email } from "@vuelidate/validators";
import { useContactsStore } from "@/store/useContacts";
import FormGroup from "@/components/UI/FormGroup.vue";
import Button from "@/components/UI/Button.vue";
import { useForm } from "@/composables/useForm";
import { useTagsStore } from "@/store/useTags";
import Multiselect from 'vue-multiselect'
interface Emits {
  (e: "closeModal", value?: string): void;
}
interface Props {
  modalKey?: string
}
const formStatus = reactive({
  loading: false,
  error: false,
});
const emits = defineEmits<Emits>();
const props = defineProps<Props>()
const value = ref("");
const contactStore = useContactsStore();
const tagsStore = useTagsStore();
const formData: any = useForm(
  {
    name: "",
    phone: "",
    email: "",
    tags: []
  },
  {
    name: {
      required,
      minLength: minLength(2),
    },
    phone: {
      required,
    },
    email: {
      required,
      email,
    },
  }
);

async function createContact() {
  formData.$v.value.$touch();
  if (!formData.$v.value.$invalid) {
    contactStore.addContact(formData.values)
    emits("closeModal", props.modalKey || '');
  }
}
function handleInputChange(value: string, key: string) {
  formData.values[key] = value;
}
function clearInputs() {
  formData.values.name = "";
  formData.values.phone = "";
}
</script>

<style>
.multiselect__tag {
  background: #0080D0 !important;
}
.multiselect__input {
  font-size: 14px;
  padding: 0;
  margin: 0;
}
.multiselect__placeholder {
  margin: 0;
}
.multiselect__tag-icon::after {
  color: white;
}
.multiselect__option--highlight, .multiselect__option--highlight::after {
  background: #0080D0;
}
</style>

