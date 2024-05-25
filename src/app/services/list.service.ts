import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ContactEntity {
  id: number;
  name: string;
  phone: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class ListService {

  private contactsSubject = new BehaviorSubject<ContactEntity[]>([]);
  contacts$ = this.contactsSubject.asObservable();
  private contacts: ContactEntity[] = [];
  private currentId = 1;

  constructor() { }

  getContacts() {
    return this.contacts$;
  }

  addContact(contact: ContactEntity) {
    contact.id = this.currentId++;
    this.contacts.push(contact);
    this.contactsSubject.next([...this.contacts]);
  }

  updateContact(updatedContact: ContactEntity) {
    const index = this.contacts.findIndex(c => c.id === updatedContact.id);
    if (index > -1) {
      this.contacts[index] = updatedContact;
      this.contactsSubject.next([...this.contacts]);
    }
  }

  deleteContact(id: number) {
    this.contacts = this.contacts.filter(c => c.id !== id);
    this.contactsSubject.next([...this.contacts]);
  }
}
