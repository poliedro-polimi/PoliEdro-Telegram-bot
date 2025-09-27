getDateFromText = (txt) => {//"Today is Thursday 18th April. Tomorrow will be Friday 19th April."

    // Old regex with day check (useless)
    // const regexIt = /(Lunedì|Martedì|Mercoledì|Giovedì|Venerdì|Sabato|Domenica)\s(\d{1,2})\s(Gennaio|Febbraio|Marzo|Aprile|Maggio|Giugno|Luglio|Agosto|Settembre|Ottobre|Novembre|Dicembre)/gi;
    // const regexEn = /(Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday)\s(\d{1,2})(st|nd|rd|th)\s(January|February|March|April|May|June|July|August|September|October|November|December)/gi;


    const regexIt = /(\d{1,2})\s(Gennaio|Febbraio|Marzo|Aprile|Maggio|Giugno|Luglio|Agosto|Settembre|Ottobre|Novembre|Dicembre)/gi;
    const regexEn = /(January|February|March|April|May|June|July|August|September|October|November|December)\s(\d{1,2})(st|nd|rd|th)/gi;

    let matchesIt = txt.match(regexIt);
    let matchesEn = txt.match(regexEn);

    if(matchesIt===null && matchesEn===null){//If it didn't find anything
        return null;
    }

    const monthNamesIt = ["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre"];
    const monthNamesEn = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];

    let italianHasPriority = matchesEn === null ? true : matchesIt === null ? false : matchesIt.length >= matchesEn.length;
    let parts = (italianHasPriority?matchesIt[0]:matchesEn[0]).split(' ');//In case it didn't find in one of the languages it gives priority to Italian

    // Estrai giorno, mese e anno dalla stringa
    let day = parseInt(parts[0]); //It auto removes non numerical part
    let month = (italianHasPriority?monthNamesIt:monthNamesEn).indexOf(parts[1].toLowerCase());
    let year = new Date().getFullYear(); // If you have to announce the year, you have to change this and regex

    date = new Date(year, month, day);
    return date;
}

module.exports = {
    getDateFromText: getDateFromText
}