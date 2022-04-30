import { storageService } from '../../../services/storage.service.js'
import { utilService } from '../../../services/util.service.js'

export const emailService = {
    query,
    getById,
    moveMailToTrash,
    sendEmail,
    readMail,
    toggleStatus,
    backToInbox,
    unreadCount
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
    let emails = _loadFromStorage()
    if (!emails) {
        _createEmails()
        _saveToStorage()
    }

    emails = emails.filter(email => {
        return (mailStatus === 'inbox' && email.mailStatus === 'inbox' ||
            mailStatus === 'sent' && email.mailStatus === 'sent' ||
            mailStatus === 'star' && email.mailStatus === 'star' ||
            mailStatus === 'trash' && email.mailStatus === 'trash')
    })

    if (filterBy) {
        let { search, type } = filterBy
        emails = emails.filter(email => {
            return ((email.from.toLowerCase().includes(search.toLowerCase()) ||
                email.subject.toLowerCase().includes(search.toLowerCase()) ||
                email.body.toLowerCase().includes(search.toLowerCase()))) &&
                (type === 'starred' && email.isStarred ||
                    type === 'read' && email.isRead ||
                    type === 'unread' && !email.isRead ||
                    type === 'all')
        })
    }
    return Promise.resolve(emails)
}

function getById(emailId) {
    const emails = _loadFromStorage()
    const email = emails.find(email => {
        return email.id === emailId
    })
    return Promise.resolve(email)
}

function moveMailToTrash(emailId) {
    let emails = _loadFromStorage()
    let emailIdx = emails.findIndex(email => email.id === emailId)
    emails[emailIdx].mailStatus = 'trash'
    gEmails = emails
    _saveToStorage()
    return Promise.resolve()
}


function sendEmail(sentEmail) {
    if (sentEmail.to && sentEmail.body) {
        let emails = _loadFromStorage()
        const email = _createEmail(sentEmail.subject, sentEmail.body, sentEmail.to, 'sent', 'Me')
        emails = [email, ...emails]
        gEmails = emails
        _saveToStorage()
    }
    return Promise.resolve()
}

function readMail(emailId) {
    let emails = _loadFromStorage()
    let emailIdx = emails.findIndex(email => email.id === emailId)
    emails[emailIdx].isRead = true
    gEmails = emails
    _saveToStorage()
}

function toggleStatus(emailId) {
    let emails = _loadFromStorage()
    let emailIdx = emails.findIndex(email => email.id === emailId)
    emails[emailIdx].isRead = !emails[emailIdx].isRead
    gEmails = emails
    _saveToStorage()
    return Promise.resolve()
}

function backToInbox(emailId) {
    let emails = _loadFromStorage()
    let emailIdx = emails.findIndex(email => email.id === emailId)
    emails[emailIdx].mailStatus = 'inbox'
    gEmails = emails
    _saveToStorage()
    return Promise.resolve()
}

function unreadCount() {
    let emails = _loadFromStorage()
    emails = emails.filter(email => !email.isRead && email.mailStatus === 'inbox')
    const count = emails.length
    return Promise.resolve(count)
}

function _createEmails() {
    const emails = [
        _createEmail('How are you', utilService.makeLorem(150), 'user@appsus.com', 'inbox', 'Gal'),
        _createEmail('hey hey hey', utilService.makeLorem(150), 'user@appsus.com', 'inbox', 'Orit'),
        _createEmail('Are you ready to fight?', utilService.makeLorem(150), 'user@gmail.com', 'sent', 'Chuck norris'),
        _createEmail('schedule tomorrow`s meeting', utilService.makeLorem(150), 'user@gmail.com', 'sent', 'My annoying boss'),
        _createEmail('SALE SALE SALE - dont miss your opportunity!', utilService.makeLorem(150), 'user@gmail.com', 'sent', 'KSP'),
        _createEmail('Ready for your vacation?', utilService.makeLorem(150), 'user@appsus.com', 'inbox', 'Booking'),
        _createEmail('Your steam account - confirmation', utilService.makeLorem(150), 'user@appsus.com', 'inbox', 'Steam'),
        _createEmail('Thank you for your order', utilService.makeLorem(150), 'user@appsus.com', 'inbox', 'Macdonalds'),
        _createEmail('Prime amazon - new items arrived, come check it out!', utilService.makeLorem(150), 'user@appsus.com', 'inbox', 'Amazon'),
        _createEmail('Alondai1 invited you to coding academy', utilService.makeLorem(150), 'user@appsus.com', 'star', 'Coding Academy'),
        _createEmail('One in a lifetime concert', utilService.makeLorem(150), 'user@appsus.com', 'star', 'Tomorrowland'),
        _createEmail('New notification, come check it out!', utilService.makeLorem(150), 'user@appsus.com', 'inbox', 'Facebook'),
        _createEmail('Recommended shows - just for you', utilService.makeLorem(150), 'user@appsus.com', 'inbox', 'Netflix'),
        _createEmail('New alerts from your channel', utilService.makeLorem(150), 'user@appsus.com', 'inbox', 'Youtube'),
        _createEmail('Summer is here! book your next vacation now!', utilService.makeLorem(150), 'user@appsus.com', 'inbox', 'Booking'),
        _createEmail('Your flight details', utilService.makeLorem(150), 'user@appsus.com', 'inbox', 'Ryanair'),
        _createEmail('Games and puzzles', utilService.makeLorem(150), 'user@appsus.com', 'inbox', 'EscapeIt'),
        _createEmail('Windows 11 just arrived! come check it out', utilService.makeLorem(150), 'user@appsus.com', 'inbox', 'Microsoft')
    ]
    gEmails = emails
}

function _createEmail(subject, body, to, mailStatus, from) {
    return {
        id: utilService.makeId(),
        subject,
        body,
        isRead: false,
        sentAt: utilService.formatDate(new Date()),
        to,
        mailStatus,
        from,
        isStarred: false
    }
}

function _saveToStorage() {
    storageService.saveToStorage(KEY, gEmails)
}

function _loadFromStorage() {
    return storageService.loadFromStorage(KEY)
}
