import { useEffect, useState } from "react";
import {db as firebase} from'../../firebase'
import {FaArrowAltCircleLeft} from 'react-icons/fa'
import { Link } from "react-router-dom";
import style from './AllTransactions.module.css'


const AllTransactions  = () =>{
    const allTransac ="6wq4QJaHQutRLvzgxhUv"
    const [users,setUsers] =  useState([])
    const [loading,setLoading] = useState(true)

    useEffect(()=>{
        firebase.collection('allTransactions')
        .doc(allTransac)
        .get()
        .then((snapshot=>{
            if(loading){
                if(loading){
                    setUsers(snapshot.data().transactions)
                    console.log(users)
                    setLoading(false)
                }          
            }
        }))
    })

    
    
    return (
        <div >
            <div id={style.backBar}>
                <Link to="/">
                    <FaArrowAltCircleLeft className="backBtn" />
                </Link>
                <p id={style.barHeading}>
                    ALL TRANSACTIONAS 
                </p>
            </div>
            
            {
                users.length > 0 ? 

                <div id={style.dataTable}>
                    <table>
                        <tr>
                            <th>Transfer Amount</th>
                            <th>Sender</th>
                            <th>Recipient</th> 
                        </tr>

                        {
                            users.map(
                                (transac)=>(
                                    <tr key={Math.random()}>
                                        <td>{transac.transferAmount}</td>
                                        <td>{transac.from}</td>
                                        <td>{transac.to}</td> 
                                    </tr>
                                )
                            )
                        }
                    </table>
                </div>
            :
                <p style={{textAlign:"center", fontSize:"20px"}}>No Transcations Found</p>
            }
        </div>
    );
}

export default AllTransactions;