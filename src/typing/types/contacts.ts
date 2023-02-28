import {TagsDataType} from "@/typing/types/tags";

export type Contact = {
  id: string;
  name: string;
  phone: string;
};

export type ContactDataType = {
  id: string;
  name: string;
  phone: string;
  email: string;
  tags: TagsDataType[] | []
};

