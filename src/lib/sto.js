const nameStorage = 'rintNW'
const INTENBUY = 'INTEN_BUY'

const storage = {
  initStorage (app) {
    console.log('initStorage')
    if (process.browser) {
      const sdata = {
        session: 'nw-barbearia',
        token: '$2b$10$PNTMtbLp5Kqf5mXHUVRT5OcGd_0lDnYVgoQrKXiwTgYgk9hJ7EN9e',
        full: 'nw-barbearia:$2b$10$rLqxQ3XOocqiahnEUBmUWOHcQRAbyNSir1VeLJckJQ4GZQEaLzuKG'
      }
      window.localStorage.setItem(nameStorage, JSON.stringify({}))
    }
  },
  getStorage (app, name) {
    const data =  JSON.parse(window.localStorage.getItem(nameStorage))
    if (!data) {
      this.initStorage(app)
      return false
    } else {
      return data[name]
    }
  },
  setStorage (app, name, val) {
    const data = JSON.parse(window.localStorage.getItem(nameStorage))
    if (data) {
      data[name] = val
      window.localStorage.setItem(nameStorage, JSON.stringify(data))
    } else {
      this.initStorage(app)
      // const data = window.localStorage.getItem(nameStorage)
      // console.log('data nao existe', data)
    // data[name] = val
    }
  },
}
export default storage
