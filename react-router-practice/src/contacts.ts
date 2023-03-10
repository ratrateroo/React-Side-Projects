import localforage from "localforage";
import { matchSorter } from "match-sorter";
import { sortBy } from "sort-by-typescript";

type Contact = {
  id: string;
  createdAt: number;
};

export async function getContacts(query?: string) {
  await fakeNetwork(`getContacts:${query}`);
  let contacts = (await localforage.getItem("contacts")) as Contact[];
  if (!contacts) contacts = [];
  if (query) {
    contacts = matchSorter(contacts, query, { keys: ["first", "last"] });
  }
  return contacts.sort(sortBy("last", "createdAt"));
}

export async function createContact() {
  await fakeNetwork();
  let id = Math.random().toString(36).substring(2, 9);
  let contact: Contact = { id: id, createdAt: Date.now() };
  let contacts = await getContacts();
  contacts.unshift(contact);
  await set(contacts);
  return contact;
}

export async function getContact(id: number) {
  await fakeNetwork(`contact:${id}`);
  let contacts: any[] | null = await localforage.getItem("contacts");
  if (contacts) {
    let contact = contacts.find((contact) => contact.id === id.toString());
    return contact ?? null;
  }
}

export async function updateContact(id: number, updates: string) {
  await fakeNetwork();
  let contacts: Contact[] = (await localforage.getItem(
    "contacts"
  )) as Contact[];
  let contact = contacts.find((contact) => contact.id === id.toString());
  if (!contact) throw new Error(`No contact found for ${id}`);
  Object.assign(contact, updates);
  await set(contacts);
  return contact;
}

export async function deleteContact(id: number) {
  let contacts: Contact[] | null = await localforage.getItem("contacts");
  let index = contacts?.findIndex((contact) => contact?.id === id.toString());
  if (index ? index > -1 : null) {
    if (index) {
      contacts?.splice(index, 1);
      await set(contacts);
      return true;
    }
  }
  return false;
}

function set(contacts: Contact[] | null) {
  return localforage.setItem("contacts", contacts);
}

// fake a cache so we don't slow down stuff we've already seen
let fakeCache: boolean[] = [];

async function fakeNetwork(key?: number) {
  if (!key) {
    fakeCache = [];
  }
  if (key) {
    if (fakeCache[key]) {
      return;
    }
  }
  if (key) {
    fakeCache[key] = true;
  }

  return new Promise((res) => {
    setTimeout(res, Math.random() * 800);
  });
}
