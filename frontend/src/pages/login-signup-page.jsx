import { ReactComponent as Svg1 } from '../assets/svg/svg1.svg'
import { ReactComponent as Svg2 } from '../assets/svg/svg2.svg'
import logoDark from '../assets/imgs/logo-horizontal-dark.png'

import { LoginSignup } from '../cmps/login-signup/login-signup'

export const LoginSignupPage = ({ type }) => {
  return (
    <main className="login-signup-page">
      <div className="logo-container">
        <img className="logo" src={logoDark} alt="tusk" />
      </div>
      <LoginSignup type={type} />
      <div className="background">
        <Svg1 className="svg svg1" />
        <Svg2 className="svg svg2" />
      </div>
    </main>
  )
}
