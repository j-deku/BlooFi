import "./Navbar.css";
import { assets } from "../../assets/assets";

const Navbar = () => {

  const toggleProfile = () =>{
    document.querySelector('.drop').style.display = document.querySelector('.drop').style.display === 'block'? 'none' : 'block';
  }
  return (
    <div className="navbar">
      <img className="logo" src={assets.flower_logo2} alt="logo" />
      <img onClick={toggleProfile} className="profile" src="./PASSPORT SIZE.jpg" alt="Admin icon" />
      <div className="drop show">
        <h2><u>Contact Me</u></h2>
        <li>
            <p>Call on:</p>
            <a href="tel:+233246062758">+233 246 062 758</a>
        </li><hr />
        <li>
          <p>Whatsapp Line:</p>
          <a href="https://wa.me/+233544684595">0544684595</a>
        </li><hr />
        <li>
          <p>Send Message</p>
          <a href="sms:+233246062758">✉ SMS</a>
        </li>
      </div>
    </div>
  );
};

export default Navbar;
