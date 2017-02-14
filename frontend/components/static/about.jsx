import React from 'react';
import { Link } from 'react-router';

const AboutPage = () => (
  <div>
  <h1>About Us</h1>

    <h4>Welcome to F*** That Noise!  F*** That Noise  is a platform to help you organize around the causes you care about. Propose actions, plan events and rallies, and take your activism from an idea of one to actions of many. So speak up, stand up, and together we can make the world a better place!</h4>

    <h4>F*** That Noise was developed in response to President Trump’s January 2017 refugee ban. While F*** That Noise welcomes activists of all types, movements promoting the equality of all people regardless of their identity, are particularly encouraged.</h4>

    <h4>If you have any questions, comments, or ideas for how to make this site better, please don't hesitate to <Link to="/contact">contact us</Link>.</h4>
  </div>
);

export default AboutPage;
