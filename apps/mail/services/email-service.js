import { storageService } from '../../../services/storage.service.js'
import { utilService } from '../../../services/util.service.js'

export const emailService = {
    query,
    getById,
    deleteEmail,
    deletePreview,
    countUnread,
    sendEmail
}

const KEY = 'emailDB'

let gEmails
let gPrevFolder = 'inbox'

const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

function query(filterBy, mailStatus) {
    if (!mailStatus) mailStatus = gPrevFolder
    else gPrevFolder = mailStatus
    console.log('query');
    let emails = _loadFromStorage()
    if (!emails) {
        _createEmails()
        _saveToStorage()
    }

    emails = emails.filter(email => {
        return (mailStatus === 'inbox' && email.mailStatus === 'inbox' ||
            mailStatus === 'sent' && email.mailStatus === 'sent' ||
            mailStatus === 'star' && email.mailStatus === 'star')
    })

    if (filterBy) {
        let { search, type } = filterBy
        emails = emails.filter(email => {
            return ((email.from.toLowerCase().includes(search.toLowerCase()) ||
                email.subject.toLowerCase().includes(search.toLowerCase()) ||
                email.body.toLowerCase().includes(search.toLowerCase()))) &&
                (type === 'starred' && email.isStarred ||
                    type === 'read' && email.isread ||
                    type === 'unread' && !email.read ||
                    type === 'all')
            // (mailStatus === 'inbox' && email.mailStatus === 'inbox' ||
            //     mailStatus === 'sent' && email.mailStatus === 'sent' ||
            //     mailStatus === 'star' && email.mailStatus === 'star')
        })
        // } else {
        //     emails = emails.filter(email => {
        //         return (mailStatus === 'inbox' && email.mailStatus === 'inbox' ||
        //             mailStatus === 'sent' && email.mailStatus === 'sent' ||
        //             mailStatus === 'star' && email.mailStatus === 'star')
        //     })
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
    let emails = _loadFromStorage()
    emails = emails.filter(email => email.id !== emailId)
    gEmails = emails
    _saveToStorage()
    return Promise.resolve()
}

function deletePreview(emailId) {
    let emails = _loadFromStorage()
    emails = emails.filter(email => email.id !== emailId)
    gEmails = emails
    _saveToStorage()
}

function countUnread() {
    let emails = _loadFromStorage()
    emails = emails.filter(email => !email.isRead)
    return Promise.resolve(emails.length)
}

function sendEmail(sentEmail) {
    let emails = _loadFromStorage()
    const email = _createEmail(sentEmail.subject, sentEmail.body, sentEmail.to, 'sent', 'Me')
    emails = [email, ...emails]
    gEmails = emails
    _saveToStorage()
    return Promise.resolve()
}

// function toggleUnread(email) {
//     email.isRead = !email.isRead
//     _saveToStorage
// }

function _createEmails() {
    const emails = [
        _createEmail('How are you', utilService.makeLorem(20), 'user@appsus.com', 'inbox', 'Gal'),
        _createEmail('hey hey hey', utilService.makeLorem(50), 'user@appsus.com', 'inbox', 'Orit'),
        _createEmail('testing number 3', utilService.makeLorem(50), 'user@gmail.com', 'sent', 'Chuck norris'),
        _createEmail('schedule tomorrow`s meeting', utilService.makeLorem(50), 'user@gmail.com', 'sent', 'Harel Financials'),
        _createEmail('SALE SALE SALE - dont miss your opportunity!', utilService.makeLorem(50), 'user@gmail.com', 'sent', 'KSP'),
        _createEmail('Ready for your vacation?', utilService.makeLorem(50), 'user@appsus.com', 'inbox', 'My annoying boss'),
        _createEmail('Your steam account - confirmation', utilService.makeLorem(50), 'user@appsus.com', 'inbox', 'My annoying boss'),
        _createEmail('Thank you for your order', utilService.makeLorem(50), 'user@appsus.com', 'inbox', 'My annoying boss'),
        _createEmail('Prime amazon - new items arrived, come check it out!', utilService.makeLorem(50), 'user@appsus.com', 'inbox', 'My annoying boss'),
        _createEmail('Alondai1 invited you to coding academy', utilService.makeLorem(50), 'user@appsus.com', 'inbox', 'My annoying boss')
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