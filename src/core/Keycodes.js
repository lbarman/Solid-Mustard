/**
 * From https://github.com/timoxley/keycode/blob/master/index.js
 */
export const Keycodes = {
  'backspace': 8,
  'tab': 9,
  'enter': 13,
  'shift': 16,
  'ctrl': 17,
  'alt': 18,
  'pause/break': 19,
  'caps lock': 20,
  'esc': 27,
  'space': 32,
  'page up': 33,
  'page down': 34,
  'end': 35,
  'home': 36,
  'left': 37,
  'up': 38,
  'right': 39,
  'down': 40,
  'insert': 45,
  'delete': 46,
  'command': 91,
  'right click': 93,
  'numpad *': 106,
  'numpad +': 107,
  'numpad -': 109,
  'numpad .': 110,
  'numpad /': 111,
  'num lock': 144,
  'scroll lock': 145,
  'my computer': 182,
  'my calculator': 183,
  ';': 186,
  '=': 187,
  ',': 188,
  '-': 189,
  '.': 190,
  '/': 191,
  '`': 192,
  '[': 219,
  '\\': 220,
  ']': 221,
  "'": 222
}

// Helper aliases

export const aliases = {
  'windows': 91,
  '⇧': 16,
  '⌥': 18,
  '⌃': 17,
  '⌘': 91,
  'ctl': 17,
  'control': 17,
  'option': 18,
  'pause': 19,
  'break': 19,
  'caps': 20,
  'return': 13,
  'escape': 27,
  'spc': 32,
  'pgup': 33,
  'pgdn': 33,
  'ins': 45,
  'del': 46,
  'cmd': 91
}


/*!
 * Programatically add the following
 */

// lower case chars
for (i = 97; i < 123; i++) Keycodes[String.fromCharCode(i)] = i - 32

// numbers
for (var i = 48; i < 58; i++) Keycodes[i - 48] = i

// function keys
for (i = 1; i < 13; i++) Keycodes['f'+i] = i + 111

// numpad keys
for (i = 0; i < 10; i++) Keycodes['numpad '+i] = i + 96

/**
 * Get by code
 *
 *   exports.name[13] // => 'Enter'
 */

export const Keynames = {} // title for backward compat

// Create reverse mapping
for (i in Keycodes) Keynames[Keycodes[i]] = i

// Add aliases
for (var alias in aliases) {
  Keycodes[alias] = aliases[alias]
}
