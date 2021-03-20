import { Link } from "react-router-dom"
import style  from './Home.module.css'
import imageIllus from './payment.svg'

const Home  = () =>
{
    return(
        <div id={style.homeComponent}>
            <div id={style.operations}>
                <div id={style.textData} >
                    <p id={style.heading}>
                        Spark Foundation
                    </p>
                    <p id={style.textContent}>
                        Web Designing Internship Task-1. 
                        <br/>
                        Creating a Baisc Banking Web App which allows money transfer and shows the transcations 
                    </p>
                </div>
                
                <div id={style.btndiv}>
                    <Link to="/customerList">
                        <button className={style.btn}>
                            View Customers
                        </button>
                    </Link>
                    <Link to="/transactions">
                        <button className={style.btn}>
                            View Transactions
                        </button>
                    </Link>
                </div>
                
            </div>
            <div id={style.illustration}>
                <img src={imageIllus} alt="Not Available" id={style.illustrationImage}/>
            </div>
                
        </div>
    );
}
export default Home;