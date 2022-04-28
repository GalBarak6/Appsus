import { storageService } from '../../../services/storage.service.js'
import { utilService } from '../../../services/util.service.js'

export const emailService = {
    query,
    getById,
    deleteEmail,
    deletePreview,
    countUnread
}

const KEY = 'emailDB'

let gEmails

const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

function query(filterBy, mailStatus) {
    console.log('query');
    console.log(mailStatus);
    let emails = _loadFromStorage()
    if (!emails) {
        _createEmails()
        _saveToStorage()
    }

    emails = emails.filter(email => {
        return (mailStatus === 'inbox' && email.mailStatus === 'inbox' ||
            mailStatus === 'sent' && email.mailStatus === 'sent')
    })

    if (filterBy) {
        let { search, type } = filterBy
        console.log(search);
        console.log(type);
        emails = emails.filter(email => {
            console.log(email.mailStatus);
            return ((email.from.toLowerCase().includes(search.toLowerCase()) ||
                email.subject.toLowerCase().includes(search.toLowerCase()) ||
                email.body.toLowerCase().includes(search.toLowerCase()))) &&
                (type === 'starred' && email.isStarred ||
                    type === 'read' && email.isread ||
                    type === 'unread' && !email.read ||
                    type === 'all')
        })
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

function deleteEmail(emailId) {
    console.log(emailId);
    let emails = _loadFromStorage()
    emails = emails.filter(email => email.id !== emailId)
    gEmails = emails
    _saveToStorage()
    return Promise.resolve()
}

function deletePreview(emailId) {
    console.log(emailId);
    let emails = _loadFromStorage()
    emails = emails.filter(email => email.id !== emailId)
    gEmails = emails
    _saveToStorage()
}

function countUnread() {
    let emails = _loadFromStorage()
    emails = emails.filter(email => !email.isRead)
    console.log(emails.length);
    return Promise.resolve(emails.length)
}

// function toggleUnread(email) {
//     email.isRead = !email.isRead
//     _saveToStorage
// }

// function compose(email) {
//     let cars = _loadFromStorage()
//     const email = _createEmail(subject, body, to, status)
//     cars = [car, ...cars]
//     _saveToStorage(cars)
//     return Promise.resolve()
// }


function _createEmails() {
    const emails = [
        _createEmail('How are you', utilService.makeLorem(20), 'user@appsus.com', 'inbox', 'Gal'),
        _createEmail('hey hey hey', utilService.makeLorem(50), 'user@appsus.com', 'inbox', 'Orit'),
        _createEmail('testing number 3', utilService.makeLorem(50), 'user@gmail.com', 'sent', 'Chuck norris'),
        _createEmail('schedule tomorrow`s meeting', utilService.makeLorem(50), 'user@gmail.com', 'sent', 'Harel Financials'),
        _createEmail('birthday party!', utilService.makeLorem(50), 'user@gmail.com', 'sent', 'My annoying boss')
    ]
    gEmails = emails
    console.log(gEmails);
}

function _createEmail(subject, body, to, mailStatus, from) {
    return {
        id: utilService.makeId(),
        subject,
        body,
        isRead: false,
        sentAt: utilService.getMonthName(new Date()),
        to,
        mailStatus,
        from,
        isStarred: false
    }
}


const criteria = {
    mailStatus: 'inbox/sent/trash/draft',
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