const path = require("path")
const low = require("lowdb")
const FileSync = require("lowdb/adapters/FileSync")

/**
 * Application storage handler.
 */
class Storage {
  constructor() {
    this.path = path.resolve(__dirname, "db.json")
    this.setup()
  }

  /**
   * Initial method for storage setup.
   */
  async setup() {
    const adapter = new FileSync(this.path)
    this.db = low(adapter)
    this.db.defaults({ purchases: [], products: [] }).write()
  }

  /**
   * Stores value into local database.
   * @param {string} key Storage key
   * @param {string} value Storage value
   * @returns value
   */
  set(key, value) {
    return this.db.set(key, value)
  }

  /**
   * Method to retreive data.
   * @param {string} key Value to retreive data from local database.
   * @returns Value
   */
  get(key) {
    return this.db.get(key)
  }
}

module.exports = {
  storage: new Storage(),
}
