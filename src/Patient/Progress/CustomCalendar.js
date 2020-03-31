import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Calendar from 'react-calendar';
import { DateTime } from 'luxon';
import Styles from '../../Basics/Styles';
import useStores from '../../Basics/UseStores';
import Colors from '../../Basics/Colors';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import { observer } from 'mobx-react'

const useStyles = makeStyles({
    calendar: {

        "& > div.react-calendar__navigation > button":{
            backgroundColor: "white",
            border: "none",
            
        },
        "& > div.react-calendar__viewContainer > div > div > div > div.react-calendar__month-view__days > button > abbr": {
            display: "none"
        },
        "& > div.react-calendar__viewContainer > div > div > div > div.react-calendar__month-view__days > button": {
            background: "none",
            border: "none",
            height: "7vh",
            padding: "5px 0 5px 0",
            margin: 0,
            outline: "none"
        },

        "& > div.react-calendar__viewContainer > div > div > div > div.react-calendar__month-view__weekdays > div": {
            textAlign: "center",
            marginBottom: ".5em",
            "& > abbr": {
                textDecoration: "none"
            }
        },

        '& > div.react-calendar__navigation': {
            marginBottom: "1em",
            "& > button": {
                fontSize: "1.25em",
                color: "black"
            }
        },
        width: "90%"

    },
    day: {
        fontSize: "1.25em",
        width: "100%",
        height: "100%",
        margin: "2px 0 2px 0",
        ...Styles.flexCenter
    },
    today: {
        fontWeight: "bold"
    },
    positive: {
        backgroundColor: Colors.calendarGreen,
    },

    start: {
        borderRadius: "2vh 0 0 2vh"
    },

    end: {
        borderRadius: "0 2vh 2vh 0"
    },
    single: {
        borderRadius: "2vh"
    },
    negative: {
        backgroundColor: "rgba(238,2,2,.32)",
    },
    selected: {
        "& > p":{
            width: "90%",
            height: "90%",
            ...Styles.flexCenter,
            border: `solid 2px ${Colors.accentBlue}`,
            borderRadius: "2vh"
        }
    },

})

const CustomCalendar = () => {

    const classes = useStyles();
    const { patientStore, uiStore } = useStores();

    const handleChange = (date) => {
        patientStore.uiState.selectedCalendarDate = DateTime.fromJSDate(date);
    }

    return (
        <Calendar
            tileDisabled={({ date }) => {
                return (DateTime.fromJSDate(date) > DateTime.local() || DateTime.fromJSDate(date) < DateTime.fromISO(patientStore.treatmentStart) )
            }
            }
            calendarType="US"
            minDetail="month"
            view="month"
            onChange={() => { }}
            value={new Date()}
            locale={uiStore.locale}
            className={classes.calendar}
            navigationLabel={(
                { date }) => `${DateTime.fromJSDate(date).get("monthLong")} ${DateTime.fromJSDate(date).get("year")}`
            }
            tileContent={({ date, view }) => (
                view === "month"
                    ? <Day dateObj={date} date={DateTime.fromJSDate(date).day} />
                    : null
            )}
            next2Label={""}
            prev2Label=""
            nextLabel={<ChevronRight />}
            prevLabel={<ChevronLeft />}
            onChange={handleChange}
        />
    )

}


const Day = observer((props) => {
    const classes = useStyles();
    const { patientStore } = useStores();

    let dt = DateTime.fromJSDate(props.dateObj);

    let compositeClass;

    if (dt.startOf('day').equals(patientStore.uiState.selectedCalendarDate)) {
        compositeClass += ' ' + classes.selected
    }

    const dayBefore = patientStore.savedReports[`${dt.startOf('day').minus(1, 'day').toISODate()}`]
    const dayFromServer = patientStore.savedReports[`${dt.startOf('day').toISODate()}`]
    const dayAfter = patientStore.savedReports[`${dt.endOf('day').plus(1, 'day').toISODate()}`]

    //if(dayBefore && dayAfter) console.log(dayBefore.date + ' ' + dayFromServer.date +  ' ' + dayAfter.date)

    if (dayFromServer && dayFromServer.medicationTaken){compositeClass += ' ' + classes.positive}
    else if(dayFromServer && !dayFromServer.medicationTaken ){ compositeClass += ' ' + classes.negative + ' ' + classes.single}

    if (!dayBefore || !dayAfter) compositeClass += ' ' + classes.single;

    if (dayBefore && dayAfter && dayFromServer) {
        if (!dayBefore.medicationTaken && dayFromServer.medicationTaken) compositeClass += ' ' + classes.start;

        if (!dayAfter.medicationTaken && dayFromServer.medicationTaken) compositeClass += ' ' + classes.end;

        if (!dayFromServer.medicationTaken) compositeClass += ' ' + classes.didntTake;

        if (dayFromServer.medicationTaken && !dayBefore.medicationTaken && !dayAfter.medicationTaken) compositeClass += ' ' + classes.single;
    }

    

    return <div className={`${classes.day} ${compositeClass}`}><p>{props.date}</p></div>
});

export default CustomCalendar;