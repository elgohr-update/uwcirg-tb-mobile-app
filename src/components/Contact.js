import React from "react";

import { Button, Link, List, Provider, Divider } from "reakit";
import theme from "reakit-theme-default";
import { blue, green, white, red} from "../colors"

import Discuss from './discuss/Discuss'

import InternalLink from "../primitives/InternalLink"

import Icon from "@mdi/react"
import {
  mdiWhatsapp,
  mdiChat
} from "@mdi/js"

import { observer } from "mobx-react"

import PopUp from './Notification'


@observer
class Contact extends React.Component {
render(){

  return(
    <Provider theme={theme}>
    <div>
      <h3>
        {this.props.assembly.translate("contact.contact_title")}
      </h3>

      <Link href="http://wa.me/5491127481963" target="_blank">
        <Button backgroundColor={green}>{this.props.assembly.translate("contact.whatsapp")}
          <Icon
            path={mdiWhatsapp}
            color={white}
            size="1.5rem"
          />
        </Button>
      </Link>

        <p>{this.props.assembly.translate("contact.first")}</p>
        

      <Divider />

      <h3>
        {this.props.assembly.translate("discussion_board.title")}
      </h3>
      <InternalLink to={Discuss} assembly={this.props.assembly} >
      <Button backgroundColor={green}>{this.props.assembly.translate("discussion_board.title")}
          <Icon
            path={mdiChat}
            color={white}
            size="1.5rem"
          />
          {this.props.assembly.notificationStore.totalNumberOfNotifications > 0 ?<PopUp color={red} number={this.props.assembly.notificationStore.totalNumberOfNotifications} />: "" }
        </Button>

  </InternalLink>
      <p> {this.props.assembly.translate("contact.discussion_title")}</p>

    </div>
  </Provider>
  )
}

}




Contact.route = "/contact"
export default Contact;
