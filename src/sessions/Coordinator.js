import { observable, action } from "mobx";
import Network from "../Network"

const patients = [
  {
    medication_report_dates: [ ],
    id: "abc234",
    name: "Amy Bernier",
    treatment_start_date: null,
    side_effects: ["Nausea"],
    percent_since_start: 0.91,
    photo: [],
    note: [],
    coordinator_note: [],
  },

  {
    medication_report_dates: [],
    id: "abc345",
    name: "Junior Casper",
    treatment_start_date: null,
    side_effects: ["Nausea"],
    percent_since_start: 0.91,
    photo: [],
    note: [],
    coordinator_note: [],
  },

  {
    medication_report_dates: [],
    id: "abc456",
    name: "Boyd Murazik",
    treatment_start_date: null,
    side_effects: ["Nausea"],
    percent_since_start: 0.91,
    photo: [],
    note: [],
    coordinator_note: [],
  },

  {
    medication_report_dates: [],
    id: "abc123",
    name: "Heriberto Schmitt",
    treatment_start_date: null,
    side_effects: ["Nausea"],
    percent_since_start: 0.91,
    photo: [],
    note: [],
    coordinator_note: [],
  },
]

class Coordinator {
  network = new Network(``)

  @observable alerts = []
  @observable patients = patients

  constructor() {
    this.network.watch("cirg")`
      provider.patients
    `(response => {
      response
        .json()
        .then(action(patients => {
          this.patients = patients
        }))
    })
  }

  @action alert(message) {
    this.alerts.push(message)
  }

  @action dismissAlert(message) {
    var index = this.alerts.indexOf(message);

    if (index > -1) {
      this.alerts.splice(index, 1);
    }
  }
}

export default Coordinator
