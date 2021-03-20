import { Link } from "react-router-dom"
import style from "./Header.module.css"
import{FaServicestack} from "react-icons/fa"


const Header=()=>{
    return(
        <div id={style.headerComponent}>
            <div id={style.bankName}>
                <FaServicestack id={style.logo}s/>
                <p id={style.name}>
                    SPARKBANK
                </p>
            </div>
            <div>
                <ul>
                    <li>
                        <Link to="/" id={style.links}>HOME</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}
export default Header;