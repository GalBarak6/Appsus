import { storageService } from '../../../services/storage.service.js'
import { utilService } from '../../../services/util.service.js'

export const emailService = {
    query,
    getById
}

const KEY = 'emailDB'

let gEmails

const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

function query() {
    console.log('query');
    const emails = _loadFromStorage()
    if (!emails) {
        _createEmails()
        _saveToStorage()
    }
    console.log(emails);
    return Promise.resolve(emails)
}

function getById(emailId) {
    const emails = _loadFromStorage()
    const email = emails.find(email => {
        return email.id === emailId
    })
    return Promise.resolve(email)
}


function _createEmails() {
    const emails = [
        _createEmail('How are you', utilService.makeLorem(20), 'user@appsus.com'),
        _createEmail('hey hey hey', utilService.makeLorem(50), 'user@appsus.com'),
        _createEmail('testing number 3', utilService.makeLorem(50), 'user@gmail.com'),
        _createEmail('schedule tomorrow`s meeting', utilService.makeLorem(50), 'user@gmail.com'),
        _createEmail('birthday party!', utilService.makeLorem(50), 'user@gmail.com')
    ]
    gEmails = emails
    console.log(gEmails);
}

function _createEmail(subject, body, to) {
    return {
        id: utilService.makeId(),
        subject,
        body,
        isRead: false,
        sentAt: Date.now(),
        to,
    }
}


const criteria = {
    status: 'inbox/sent/trash/draft',
    txt: 'puki', // no need to support complex text search
    isRead: true, // (optional property, if missing: show all)
    isStared: true, // (optional property, if missing: show all)
    lables: ['important', 'romantic'] // has any of the labels
}




function _saveToStorage() {
    storageService.saveToStorage(KEY, gEmails)
}

function _loadFromStorage() {
    return storageService.loadFromStorage(KEY)


    // const email = {
    //     id: 'e101',
    //     subject: 'Miss you!',
    //     body: 'Would love to catch up sometimes',
    //     isRead: false,
    //     sentAt: 1551133930594,
    //     to: 'momo@momo.com'
    // }
}