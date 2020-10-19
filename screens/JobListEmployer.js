import React, { useState } from 'react';
import './Homepage.css';
import logo from '../../assets/UI_logo.png';
import reactlogo from '../../assets/logo.svg';
import Login from '../../components/auth/logincomponent.jsx';
import Signup from '../../components/auth/signupcomponent.jsx';

function Home() {
  const [state, setState] = useState({ login: true, signup: false });
  return (
    <div class="home_layout">
      <div class="home_navbar">
        <img src={logo} height="120" width="120" alt="main_logo"/>
        <div class="navlinks">
          <ol>
            <li><a href="/about">About</a></li>
            <li><a href="/contactus">Contact Us</a></li>
          </ol>
        </div>
      </div>
      <div class="home_body">
        <div class="hbody_left">
          <div class="hbody_left_logo">
            <img class="react_logo" src={reactlogo} alt="react_logo"/>
          </div>
          <div class="hbody_left_content">
            <h1> Forlan CMS </h1>
            <h3> Content Management System </h3>
            <h2> built using React </h2>
          </div>
        </div>
        <div class="hbody_right">
          <div class="login_signup_card">
            <div class="card_buttons">
             <span id="login" onClick={()=> setState({ login: true, signup: false })}
              className={state.login ? "ncolor":"ocolor"}>Login</span>
             <span id="signup" onClick={()=> setState({ login: false, signup: true })}
              className={state.signup ? "ncolor":"ocolor"}>Signup</span>
            </div>
            <div class="card_render">
              { state.login ? <Login/> : null }
              { state.signup ? <Signup/> : null }
            </div>
          </div>
        </div>
      </div>
      <div class="home_footer">
        <div class="footer_holder">
          <img src={logo} alt="main_logo" height="100" width="100"/>
          <h1>FORLAN CMS</h1>
        </div>
      </div>
    </div>
  );
}
export default Home;