import React from "react";
import styled from "styled-components"
import { observer, Observer } from "mobx-react"
import ReactCalendar from "react-calendar/dist/entry.nostyle"
import moment from "moment"

import { darkgrey, grey, white, green } from "../colors"

import { Icon } from "@mdi/react"
import {
  mdiCamera,
  mdiFormatListChecks,
  mdiPill,
} from "@mdi/js"

const Calendar = observer(({ store }) => (
  <CalendarComponent
    minDetail="year"
    tileContent={
      ({ date, view }) => (
        <DateWrapper
          date={date}
          medication_report={view === 'month' && store.medication_reports.find(e => e.date.unix() === moment(date).unix())}
          symptom_report={view === 'month' && store.symptom_reports.find(e => e.date.unix() === moment(date).unix())}
          strip_report={view === 'month' && store.strip_reports.find(e => e.date.unix() === moment(date).unix())}
        >
          <DateNumber>{date.getDate()}</DateNumber>
          <PillIcon />
          <SymptomIcon />
          <PhotoIcon />
        </DateWrapper>
    )}
  />
))

const PillIcon = styled(Icon).attrs({
  size: "0.5rem",
  color: darkgrey,
  path: mdiPill,
})``

const SymptomIcon = styled(Icon).attrs({
  size: "0.5rem",
  color: darkgrey,
  path: mdiFormatListChecks,
})``

const PhotoIcon = styled(Icon).attrs({
  size: "0.5rem",
  color: darkgrey,
  path: mdiCamera,
})``

const DateWrapper = styled.div`
  background:       ${(p) => p.date < new Date() ? green : "none" };
  border: 2px solid ${(p) => p.date < new Date() ? white : darkgrey };
  color:            ${(p) => p.date < new Date() ? white : darkgrey };

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  border-radius: 50%;
  margin-bottom: 0.5rem;
  margin-right: 0.5rem;
  padding: 10%;
  height: 2rem;
  width: 2rem;

  ${PillIcon} {
    ${p => p.medication_report || "display: none"}
  }

  ${SymptomIcon} {
    ${p => p.symptom_report || "display: none"}
  }

  ${PhotoIcon} {
    ${p => p.strip_report || "display: none"}
  }
`

const CalendarComponent = styled(ReactCalendar)`
  width: 100% !important;
  background: none !important;
  border: none !important;
  overflow: hidden !important;

  & .react-calendar__tile time {
    display: none;
  }

  & .react-calendar__month-view__days__day--neighboringMonth {
    color: ${grey}
  }

  & .react-calendar__navigation button {
    border-radius: 0;
    text-decoration: underline;
    font-size: 1rem;
    padding: 0.5rem;
  }
`

const DateNumber = styled.span`
  font-weight: 700;
`

export default Calendar;
