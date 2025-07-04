var contacts = [];
var currentEditId = null;
function copyText(text, element) {
    navigator.clipboard.writeText(text);
    element.innerText = 'Copied !';
    setTimeout(function () {
        element.innerText = text;
    }, 1000);
}
function saveContacts() {
    localStorage.setItem("contacts", JSON.stringify(contacts));
}
function loadContacts() {
    var stored = localStorage.getItem("contacts");
    if (stored) {
        contacts = JSON.parse(stored);
        displayAllContacts(contacts);
    }
}
function displayContact(contact) {
    var li = document.createElement("li");
    li.classList.add("contact-item");
    var span_info = document.createElement("div");
    span_info.classList.add('span-info');
    var span_name = document.createElement("span_name");
    span_name.textContent = "".concat(contact.name);
    span_name.classList.add('span-name');
    span_name.addEventListener("click", function () {
        copyText(contact.name, span_name);
    });
    var span_email = document.createElement("span_email");
    span_email.textContent = "".concat(contact.email);
    span_email.classList.add('span-email');
    span_email.addEventListener("click", function () {
        copyText(contact.email, span_email);
    });
    var span_phone = document.createElement("span_phone");
    span_phone.textContent = "".concat(contact.phone ? contact.phone : "");
    span_phone.classList.add('span-phone');
    span_phone.addEventListener("click", function () {
        copyText(contact.phone ? contact.phone : '', span_phone);
    });
    span_info.appendChild(span_name);
    span_info.appendChild(span_email);
    if (contact.phone)
        span_info.appendChild(span_phone);
    var btn_div = document.createElement("div");
    btn_div.classList.add('btn-div');
    var btn_edit = document.createElement("button");
    btn_edit.textContent = "Edit";
    btn_edit.classList.add('edit-btn');
    btn_edit.addEventListener("click", function () {
        currentEditId = contact.id;
        name_input.value = contact.name;
        email_input.value = contact.email;
        phone_input.value = contact.phone || "";
        contact_form.style.display = "block";
    });
    console.log("Création bouton Delete pour contact id:", contact.id);
    var btn_delete = document.createElement("button");
    btn_delete.textContent = "Delete";
    btn_delete.classList.add('delete-btn');
    btn_delete.addEventListener("click", function () {
        contacts = contacts.filter(function (c) { return c.id !== contact.id; });
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
var contact_list;
var add_btn;
var name_input;
var email_input;
var phone_input;
var save_btn;
var contact_form;
var search_input;
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
    add_btn.addEventListener("click", function () {
        contact_form.style.display = "block";
    });
    save_btn.addEventListener("click", function () {
        if (currentEditId !== null) {
            var index = contacts.findIndex(function (c) { return c.id === currentEditId; });
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
            var newContact = {
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
    search_input.addEventListener("input", function () {
        var searchTerm = search_input.value.toLowerCase();
        var filteredContacts = contacts.filter(function (contact) {
            return contact.name.toLowerCase().includes(searchTerm) ||
                contact.email.toLowerCase().includes(searchTerm) ||
                (contact.phone && contact.phone.includes(searchTerm));
        });
        displayAllContacts(filteredContacts);
    });
}
document.addEventListener("DOMContentLoaded", init);
