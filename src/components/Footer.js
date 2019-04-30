import React from "react";

const Footer = () => {
  return (
    <footer>
      <div className="copyright">
        <ul>
          <li>Home</li>
          <li>About Fivie</li>
          <li>Contact us</li>
          <li>Privacy Policy</li>
          <li>Terms of Use</li>
        </ul>
        <p>
          Copyright &copy; 2019 Designed by Jinkyu Kang / Developed by David
          Kim. All rights reserved.
        </p>
      </div>

      <div className="sign-up-container">
        <p>
          Sign up and we'll send you
          <br />
          the latest news about Fivie.
        </p>
        <form>
          <input type="text" placeholder="email@email.com" />
          <button type="submit">Sign up</button>
        </form>
      </div>
    </footer>
  );
};

export default Footer;
