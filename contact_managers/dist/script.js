"use strict";
let contacts = [];
let currentEditId = null;
function copyText(text, element) {
    navigator.clipboard.writeText(text);
    element.innerText = 'Copied !';
    setTimeout(() => {
        element.innerText = text;
    }, 1000);
}
function saveContacts() {
    localStorage.setItem("contacts", JSON.stringify(contacts));
}
function loadContacts() {
    const stored = localStorage.getItem("contacts");
    if (stored) {
        contacts = JSON.parse(stored);
        displayAllContacts(contacts);
    }
}
function displayContact(contact) {
    const li = document.createElement("li");
    li.classList.add("contact-item");
    const span_info = document.createElement("div");
    span_info.classList.add('span-info');
    const span_name = document.createElement("span_name");
    span_name.textContent = `${contact.name}`;
    span_name.classList.add('span-name');
    span_name.addEventListener("click", () => {
        copyText(contact.name, span_name);
    });
    const span_email = document.createElement("span_email");
    span_email.textContent = `${contact.email}`;
    span_email.classList.add('span-email');
    span_email.addEventListener("click", () => {
        copyText(contact.email, span_email);
    });
    const span_phone = document.createElement("span_phone");
    span_phone.textContent = `${contact.phone ? contact.phone : ""}`;
    span_phone.classList.add('span-phone');
    span_phone.addEventListener("click", () => {
        copyText(contact.phone ? contact.phone : '', span_phone);
    });
    span_info.appendChild(span_name);
    span_info.appendChild(span_email);
    if (contact.phone)
        span_info.appendChild(span_phone);
    const btn_div = document.createElement("div");
    btn_div.classList.add('btn-div');
    const btn_edit = document.createElement("button");
    btn_edit.textContent = "Edit";
    btn_edit.classList.add('edit-btn');
    btn_edit.addEventListener("click", () => {
        currentEditId = contact.id;
        name_input.value = contact.name;
        email_input.value = contact.email;
        phone_input.value = contact.phone || "";
        contact_form.style.display = "block";
    });
    console.log("Création bouton Delete pour contact id:", contact.id);
    const btn_delete = document.createElement("button");
    btn_delete.textContent = "Delete";
    btn_delete.classList.add('delete-btn');
    btn_delete.addEventListener("click", () => {
        contacts = contacts.filter(c => c.id !== contact.id);
        saveContacts();
        displayAllContacts(contacts);
        resetForm();
    });
    btn_div.appendChild(btn_edit);
    btn_div.appendChild(btn_delete);
    li.appendChild(span_info);
    li.appendChild(btn_div);
    contact_list.appendChild(li);
}
function displayAllContacts(contactArray) {
    contact_list.innerHTML = "";
    contactArray.forEach(displayContact);
}
function resetForm() {
    name_input.value = "";
    email_input.value = "";
    phone_input.value = "";
    contact_form.style.display = "none";
    currentEditId = null;
}
let contact_list;
let add_btn;
let name_input;
let email_input;
let phone_input;
let save_btn;
let contact_form;
let search_input;
function init() {
    contact_list = document.querySelector("#contact-items");
    add_btn = document.querySelector("#add-btn");
    name_input = document.querySelector("#name-input");
    email_input = document.querySelector("#email-input");
    phone_input = document.querySelector("#phone-input");
    save_btn = document.querySelector("#save-btn");
    contact_form = document.querySelector("#contact-form");
    search_input = document.querySelector("#search-input");
    loadContacts();
    add_btn.addEventListener("click", () => {
        contact_form.style.display = "block";
    });
    save_btn.addEventListener("click", () => {
        if (currentEditId !== null) {
            const index = contacts.findIndex(c => c.id === currentEditId);
            if (index !== -1) {
                contacts[index] = {
                    id: currentEditId,
                    name: name_input.value,
                    email: email_input.value,
                    phone: phone_input.value
                };
            }
            currentEditId = null;
        }
        else {
            const newContact = {
                id: Date.now(),
                name: name_input.value,
                email: email_input.value,
                phone: phone_input.value
            };
            contacts.push(newContact);
        }
        saveContacts();
        displayAllContacts(contacts);
        resetForm();
    });
    search_input.addEventListener("input", () => {
        const searchTerm = search_input.value.toLowerCase();
        const filteredContacts = contacts.filter(contact => contact.name.toLowerCase().includes(searchTerm) ||
            contact.email.toLowerCase().includes(searchTerm) ||
            (contact.phone && contact.phone.includes(searchTerm)));
        displayAllContacts(filteredContacts);
    });
}
document.addEventListener("DOMContentLoaded", init);
