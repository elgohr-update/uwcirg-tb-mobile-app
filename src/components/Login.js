import React from "react"
import styled from "styled-components"
import { observer } from "mobx-react"

import Button from "../primitives/Button"
import Selection from "../primitives/Selection"
import ListOfLinks from "../layouts/ListOfLinks"
import { Input } from "reakit"
import { white, grey } from "../colors"
import InternalLink from "../primitives/InternalLink"
import Register from "./Register"

const Login = observer(({store}) => (
  <Layout>
    <p>
      {store.translate("login.welcome")}
    </p>

    <Form>
      <Field
        placeholder={store.translate("login.phone")}
        value={store.login_credentials.phone_number}
        onChange={(e) => store.login_credentials.phone_number = e.target.value}
      />

      <Field
        password
        placeholder={store.translate("login.password")}
        value={store.login_credentials.password}
        onChange={(e) => store.login_credentials.password = e.target.value}
      />

      <Button onClick={() => store.login()}>
        {store.translate("login.register")}
      </Button>
    </Form>

    <InternalLink to={Register} store={store} >
      {store.translate("link.register")}
    </InternalLink>
  </Layout>
))

const Layout = styled(ListOfLinks)`
`

const Field = styled(Input)`
  background-color: ${white}
  padding: 0.5rem;
  margin-bottom: 1rem;
  border-radius: 2px;
  border: 1px solid ${grey};
`

const Form = styled.div`
  display: grid;
  grid-template-rows: repeat(3, auto);
  grid-column-gap: 1rem;
`

Login.route = "/login"
export default Login;
