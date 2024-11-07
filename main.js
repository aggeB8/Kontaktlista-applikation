const createContactWrapper = document.getElementById("create-contact-wrapper")
const nameInput = document.getElementById("name-input")
const telephoneInput = document.getElementById("telephone-input")
const createContactBtn = document.getElementById("create-contact-btn")
const contactsContainer = document.getElementById("contacts-container")

const validInput = (name, telephone, element) => {
    if (name.length === 0 || telephone.length === 0) {
        element.querySelectorAll(".err-msg").forEach((e) => e.remove())
        const errMsg = document.createElement("p")
        errMsg.className = "err-msg"
        errMsg.textContent = "yayay"
        element.appendChild(errMsg)
        return false
    } else {
        element.querySelectorAll(".err-msg").forEach((e) => e.remove())
        return true
    }
}

const deleteContact = (contactId) => {
    const contact = document.getElementById(contactId)
    contact.remove()
}

const editContact = (contactId) => {
    const contact = document.getElementById(contactId)

    const contactName = contact.querySelector(".contact-name")
    const contactTelephone = contact.querySelector(".contact-telephone")
    const editBtn = contact.querySelector(".edit-btn")

    contactName.disabled = false
    contactTelephone.disabled = false
    editBtn.textContent = "Spara"

    editBtn.onclick = () => {
        if (validInput(contactName.value, contactTelephone.value, contact)) {
            contactName.disabled = true
            contactTelephone.disabled = true
            editBtn.textContent = "Ändra"
            editBtn.onclick = () => editContact(contactId)
        }
    }
}

const createContact = (name, telephone, contactId) => {
    if (validInput(name, telephone, createContactWrapper)) {
        const contact = document.createElement("div")

        contact.id = contactId

        contact.innerHTML = `
            <input class="contact-name" disabled value=${name}></input>
            <input class="contact-telephone" disabled value=${telephone}></input>
            <button class="edit-btn" onclick="editContact('${contactId}')">Ändra</button>
            <button onclick="deleteContact('${contactId}')">Radera</button>
        `

        contactsContainer.insertBefore(contact, contactsContainer.firstChild)
    }
}

createContactBtn.addEventListener("click", () => {
    createContact(nameInput.value, telephoneInput.value, Math.random().toString(16).slice(2))
})
