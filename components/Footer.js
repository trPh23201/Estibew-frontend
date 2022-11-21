import style from "../styles/Footer.module.css"
import { BsFacebook, BsTwitter, BsInstagram } from "react-icons/bs"

export default function Footer() {
    return (
        <footer className={style.footer}>
            <div className={style["mld-grid"]}>
                <div className={style["footer-link"]}>
                    <h4>Support</h4>
                    <ul>
                        <li>
                            <a href="#">Website FAQs</a>
                        </li>
                        <li>
                            <a href="#">Contact Us</a>
                        </li>
                        <li>
                            <a href="#">Privacy Policy</a>
                        </li>
                        <a href="#">Terms of Service</a>
                    </ul>
                </div>
                <div className={style["footer-link"]}>
                    <h6>Game</h6>
                    <ul>
                        <li>
                            <a href="#">Your Game</a>
                        </li>
                        <li>
                            <a href="#">Game Patches</a>
                        </li>
                        <li>
                            <a href="#">Package Versions</a>
                        </li>
                    </ul>
                </div>
                <div className={style["footer-link"]}>
                    <h6>Estibew Shop</h6>
                    <ul>
                        <li>
                            <a href="#">News</a>
                        </li>
                        <li>
                            <a href="#">Want To Join Us?</a>
                        </li>
                    </ul>
                </div>
                <div className={style["footer-link"]}>
                    <h6>Connected</h6>
                    <a href="#"><BsFacebook className={style["footer-icon"]} /></a>
                    <a href="#"><BsTwitter className={style["footer-icon"]} /></a>
                    <a href="#"><BsInstagram className={style["footer-icon"]} /></a>
                </div>
            </div>
            <div className={style["footer-bottom"]}>
                <p>©Estibew. All Rights Reserved. Trademarks and characters are property of their respective owners.</p>
            </div>
        </footer>
    )
}