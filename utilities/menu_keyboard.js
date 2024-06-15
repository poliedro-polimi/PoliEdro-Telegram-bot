menuKeyboard = () => {
    let currentDate = new Date()
    let reply_markup = {
        inline_keyboard: [
            [
                {
                    text: "📣 PoliEdro Live",
                    url: "https://t.me/PoliEdroLive"
                },
                {
                    text: "📭 PoliEdro News",
                    url: process.env.POLIEDRO_NEWS_INVITE_LINK
                }
            ],
            [
                {
                    text: "📲 Instagram",
                    url: "https://www.instagram.com/poliedro.polimi/"
                },
                {
                    text: "🛍 PoliEdro Merch",
                    url: "https://www.redbubble.com/people/PoliEdro/explore?asc=u&page=1&sortOrder=recent"
                },
            ],
            [
                {
                    text: "🎵 Playlist Spotify",
                    url: "https://open.spotify.com/user/31s7jsn32tg5dhlctndbwjb7saiu"
                },
                {
                    text: "📆 Calendario degli eventi condiviso",
                    url: "https://telegra.ph/PoliEdro-Calendar-03-28"
                }
            ],
            [
                {
                    text: "📚 Bookclub",
                    url: process.env.POLIEDRO_BOOKCLUB_INVITE_LINK
                }
            ],
            [
                {
                    text: "💬 Suggestion form",
                    url: process.env.POLIEDRO_SUGGESTION_FORM_LINK
                }
            ],
            [
                {
                    text: "📋 Diventa sociə",
                    url: "https://poliedro-polimi.it/it/iscriviti/"
                }
            ]
        ] //
    }

    if (currentDate.getMonth() >= 4 && currentDate.getMonth() <= 6) {
        reply_markup.inline_keyboard.splice(4, 0, [
            {
                text: "🌈 polimipride.it",
                url: "https://polimipride.it"
            }
        ]);
    }
    return reply_markup
}

module.exports = {
    menuKeyboard
}