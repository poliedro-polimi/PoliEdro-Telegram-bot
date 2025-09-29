import {InlineKeyboard} from "grammy";

export function produceKeyboard(): InlineKeyboard {
  let inline_keyboard = new InlineKeyboard()
    .url("📣 PoliEdro Live", "https://t.me/PoliEdroLive")
    .url("📭 PoliEdro News", "https://invite-link-here.com").row()
    .url("📲 Instagram", "https://www.instagram.com/poliedro.polimi/")
    .url("🛍 PoliEdro Merch", "https://www.redbubble.com/people/PoliEdro/explore?asc=u&page=1&sortOrder=recent").row()
    .url("🎵 PoliDrag 3 Playlist", "https://open.spotify.com/user/31s7jsn32tg5dhlctndbwjb7saiu")
    .url("📆 Calendario degli eventi condiviso", "https://telegra.ph/PoliEdro-Calendar-03-28").row()
    .url("📚 Bookclub", "https://telegra.ph/book-club-link")
    .url("💬 Suggestion form", "https://telegra.ph/book-club-link").row()
    .url("📋 Diventa sociə", "https://poliedro-polimi.it/it/iscriviti/")
    .url("👥 Collabora con noi", "https://forms.office.com/e/MYTrsHuXMD?origin=lprLink").row()

  inline_keyboard.url("🌈 polimipride.it", "https://polimipride.it")

  let currentDate = new Date()
  if (currentDate.getMonth() >= 4 && currentDate.getMonth() <= 6) {
    inline_keyboard.url("🌈 polimipride.it", "https://polimipride.it")
  }

  return inline_keyboard
}
