import React from 'react'
import Moment from 'react-moment'
import 'moment/locale/fr'

export const itemDate = (timeStamp) => {
    return(
        <Moment
            locale='fr'
            calendar={calendarStrings}
            date={timeStamp}
        />
    )
}

const calendarStrings = {
    lastDay : '[hier à] H[h]mm',
    sameDay : '[aujourd\'hui à] H[h]mm',
    lastWeek : 'dddd [dernier à] H[h]mm',
    sameElse : '[le] dddd D MMMM YYYY [à] H[h]mm'
}
