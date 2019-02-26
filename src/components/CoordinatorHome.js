import React from "react"
import { observer } from "mobx-react"
import styled from "styled-components"

import ReactTable from "react-table"
import "react-table/react-table.css"
import { blue, darkblue } from "../colors"

import { Input } from "reakit";
import { Block, Button, Backdrop, Portal, Overlay } from "reakit";

import { Image } from "reakit"
import strip_report from "../images/strip_report.jpg"

import { white, darkgrey } from "../colors"

import Heading from "../primitives/Heading"
import PhotoPopout from "../primitives/PhotoPopout"

import moment from "moment"

const CoordinatorHome = observer(({ store }) => {

  const tableColumns= [
    {
      Header: "Participant Info",
      columns: [
        {
          Header: "Status",
          accessor: "medication_report_dates",
          width: 110,
          // Link this up to the patient so that it changes after a test result is submitted
          Cell: row => (
            <span>
              <span style={{
                color: row.value === 'notreported' ? '#ff2e00'
                  : row.value === 'reported' ? '#ffbf00'
                  : '#57d500',
                transition: 'all .3s ease'
              }}>
                &#x25cf;
              </span> {
                row.value === 'notreported' ? 'Not Reported'
                : row.value === 'reported' ? `Reported`
                : 'Confirmed'
              }
            </span>
          )
        },
        {
          Header: "First",
          accessor: "firstname"
        },
        {
          Header: "Last",
          accessor: "lastname"
        }
      ]
    },
    {
      Header: 'Reported Data',
      columns: [
        {
          // TODO: Link up to the correct value
          Header: "Took Medication",
          accessor: "took_medication"
        },
        {
          // TODO: put side effects into a line break list
          Header: "Side Effects",
          accessor: "side_effects",
          Cell: e=> e.value.join("\n \n")
        },
        {
          Header: "Photo",
          accessor: "photo",
          Cell: e=>
            <PhotoPopout>
              <Image
                    src={strip_report}
                    alt={"Strip report"}
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                    }}
              />
            </PhotoPopout>
        },
        {
          Header: 'Test Result',
          // TODO: link each checkbox to each patient.
          // Right now we are routing all data to setPhotoStatus
          // and not capturing for whom
          accessor: 'status',
          width: 175,

          // TODO
          // onClick={e => store.setPhotoStatus(strip_report, "positive")}
          // onClick={e => store.setPhotoStatus(strip_report, "negative")}
          Cell: observer(e=> <div>
            <label>
              <Input
                type="checkbox"
                name="photostatus"
                onChange={null}
                checked={store.current_strip_report === 'positive'}
              />
              Positive

                <br></br>

                <Input
                  type="checkbox"
                  name="photostatus"
                  onChange={null}
                  checked={store.current_strip_report === 'negative'}
                />
                Negative / Unclear

                <br></br>

                <Input
                  type="submit"
                  name="photostatus"
                />
              </label>
            </div>
          )
        },
        {
          Header: "Contact",
          accessor: "phone",
          // Add's a What's App Link to the table
          // TODO: make sure phone number is properly formatted in DB
          Cell: e =><a href={'https://wa.me/' + e.value} target="_blank"> {e.value} </a>
        },
        {
          Header: "Profile",
          accessor: "id",
          Cell: e=><a hrer={e.value} target="_black"> View </a>
        },
        {
          Header: "My Notes",
          accessor: "coordinator_note",
          width: 175,
          Cell: e=>
          <div>
            <Input use="textarea" />
            <br></br>
            <br></br>
            <Button>Save Note</Button>
          </div>
          // TODO: Add an action to connect to the DB after
          // the Save Note button is clicked
        },
      ]
    },
    {
      Header: "Treatment",
      columns: [
        {
          Header: "% Adherence",
          accessor: "percent_since_start"
        },
        {
          Header: "Start Date",
          accessor: "treatment_start_date"
        },
      ]
    }
  ];

  return (
    <Layout>
      <span>{moment().format("YYYY-MM-DD")}</span>
      <br />
      <Heading>Manage Patient Progress</Heading>
      <br />

      <ReactTable
            data={store.coordinator.patients}
            columns={ tableColumns}
            defaultPageSize={10}
            showPagination={ false }
            className="-striped -highlight"
      />
    </Layout>
)})

// STYLING TODO:
// - get rid of the border
// - what is the heading style?
const Layout = styled.div`
  background-color: ${white};
  border: 1px solid ${darkgrey};
`

// Padding not working on this styled element
const Table = styled(ReactTable)`
  margin-top: 1rem;
  width: 100%;
  margin-left: 10px;
  margin-right: 10px;
  padding-top: 1rem;
  padding-right: 1rem;
  padding-bottom: 1rem;
  padding-left: 1rem;
`

CoordinatorHome.route = "/coordinator"
export default CoordinatorHome
