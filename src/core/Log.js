
class DefaultBackend {
  debug(msg) {
    console.log('[debug] ' + msg);
  }

  info(msg) {
    console.log('[info] ' + msg);
  }

  warn(msg) {
    console.error('[warn] ' + msg);
  }

  error(msg) {
    console.error('[err] ' + msg);
  }
}


/**
 * Logging device.
 *
 * Display logging information using Log.info, Log.debug, Log.warn or Log.error
 * depending on the level of logging required.
 */
export const Log = {

  _logger: new DefaultBackend(),

  setBackend: (logger) => {
    this._logger = logger;
  },

  /**
   * Displays debug-level log.
   * Debug level should be used for verbose informations.
   *
   * @param {String} msg message to display
   */
  debug: function(msg) {
    this._logger.debug(msg);
  },

  /**
   * Displays info-level log.
   * Info level should be used for standard informations.
   *
   * @param {String} msg message to display
   */
  info: function(msg) {
    this._logger.info(msg);
  },

  /**
   * Displays warning-level log.
   * Warning level should be used for potential threats or expected begnin errors.
   *
   * @param {String} msg message to display
   */
  warn: function(msg) {
   this._logger.warn(msg);
  },

  /**
   * Displays error-level log.
   * Error level should be used for unexpected errors and failures.
   *
   * @param {String} msg message to display
   */
  error: function(msg) {
    this._logger.error(msg);
  }
};
