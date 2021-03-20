import {useEffect,useState} from 'react'
import {db as firebase } from '../../firebase'
import style from './customerData.module.css'
import {FaArrowAltCircleLeft} from 'react-icons/fa'

const CustomerData = ({docID,users,hideUser}) =>{


    //managind all the states
    const [loading,setLoading] = useState(true)
    const [name,setName] = useState("")
    const [balance,setBalance] = useState(0)
    const [transactions,setTransactions] = useState([])
    const [reciver,setReciver] = useState("")
    const [transferamount,setTransferamount] =useState(0)

  
    
    const allTransac ="6wq4QJaHQutRLvzgxhUv"
    let allUsers = users.filter((users)=> users.userID !== docID)


    useEffect(()=>{

        firebase.collection('customers')
        .doc(docID)
        .get()
        .then((snapshot)=>{    
            if(loading){
                setName(snapshot.data().name)
                setBalance(snapshot.data().cur_amount)
                setTransactions(snapshot.data().transactions)
                setLoading(false)
            }   
        })

    },[loading])


    const proccedPayment=()=>{


        if (reciver!== "" &&  transferamount > 0 && transferamount <= balance) {
            firebase.collection('customers')
         .doc(reciver)
         .get()
         .then((reciverAcc)=>{
             firebase.collection('customers')
                .doc(reciver)
                .update({
                    transactions:[
                        ...reciverAcc.data().transactions,{
                            type:"Invoice",
                            from:name,
                            to: "You",
                            tranferMoney: parseFloat(transferamount),
                            updatedBalance: parseFloat(parseFloat(reciverAcc.data().cur_amount) + parseFloat(transferamount))
                        }
                    
                    ],
                    cur_amount:parseFloat(parseFloat(reciverAcc.data().cur_amount) + parseFloat(transferamount)),
                })
                .then(()=>{
                    firebase.collection('customers')
                    .doc(docID)
                    .get()
                    .then((senderAcc)=>{
                        firebase.collection('customers')
                         .doc(docID)
                         .update({
                            transactions:[
                                ...senderAcc.data().transactions,{
                                    type:"Payment",
                                    from:"You",
                                    to: reciverAcc.data().name,
                                    tranferMoney: parseFloat(transferamount),
                                    updatedBalance: parseFloat(parseFloat(senderAcc.data().cur_amount) - parseFloat(transferamount))
                                }
                            
                            ],
                            cur_amount:parseFloat(parseFloat(senderAcc.data().cur_amount) - parseFloat(transferamount)),
                         })
                         .then(()=>{
                             firebase.collection('allTransactions')
                             .doc(allTransac)
                             .get()
                             .then((transcAll)=>{
                                 firebase.collection('allTransactions')
                                  .doc(allTransac)
                                  .update({
                                      transactions:[
                                          ...transcAll.data().transactions,{
                                                from: senderAcc.data().name,
                                                to: reciverAcc.data().name,
                                                transferAmount: transferamount
                                          }
                                      ]
                                  })
                                  .then(()=>{
                                    setTransferamount(0)
                                    setReciver("")
                                    setLoading(true)
                                  }
                                )
                             })          
                        })     
                    })
                })
            })
        }
        else{
            if(reciver === "" && transferamount <= 0 )
            {
                alert("Plss enter data in both the fields ")
            }
            else if(reciver !== "" && transferamount <= 0){
                alert("Wrong Amount, plss enter amount again")
            }
            else if(reciver !=="" && transferamount > balance){
                alert("Transfer Amount cannot be greter than balance, Plss Re-enter")
            }
            else{
                alert("Plss select a Recipient")
            }
        }
        
    }

    return (
        <>
        {loading ? <p>Loading Data...</p> 
            : 
            <>
                <div>

                    <div id ={style.backBar}>
                        <FaArrowAltCircleLeft  onClick={hideUser}  className="backBtn"/>
                        <p className={style.barHeading}>
                            User Details
                        </p>
                    </div>
                    
                    <hr />

                    <div id={style.userData} >
                        <p> Name : <span>{name}</span></p>
                        <p>Balance : <span>{balance}</span></p>
                    </div>

                    <hr />

                    <div id={style.paydiv}>
                        <select className={style.inputbtn} onChange={(e)=>{setReciver(e.target.value)}}>
                            <option  disabled selected>
                                --Select Reciver--
                            </option>
                            {
                                allUsers.map
                                (
                                    (user)=>(
                                        <option value={user.userID} >
                                            {user.name}
                                        </option>
                                    ))       
                            }
                            
                        </select>
                        <input 
                                className={style.inputbtn}
                                type="number"
                                placeholder="Transfer Amount"
                                value={transferamount===0 ? "" : transferamount}
                                onChange={(e)=>setTransferamount(e.target.value)}    
                        />
                        <button onClick={proccedPayment} id={style.paybtn}> PAY </button>
                    </div>

                </div>
            
                <div>

                    <hr/>

                    <p className={style.heading}>
                        User Transactions
                    </p>
                    {
                        transactions.length > 0 ? 
                        <div className={style.dataTable}>
                            <table>
                                <tr>
                                    <th >Type</th>
                                    <th>Transfer Amount</th>
                                    <th>Recipient</th>
                                    <th>Sender</th>
                                    <th>Balance</th>
                                </tr>
                                {
                                    transactions.map(
                                        (transac)=>(
                                            <tr key={Math.random()}>
                                                <td style={{color: transac.type === "Invoice" ? "green":"red"}}>{transac.type}</td>
                                                <td>{transac.tranferMoney}</td>
                                                <td>{transac.to}</td>
                                                <td>{transac.from}</td>
                                                <td>{transac.updatedBalance}</td>
                                            </tr>
                                        )
                                    )
                                }
                            </table>
                        </div>  
                        :
                        <p  style={{textAlign:"center", fontSize:"20px"}}>
                            No Transcations Found
                        </p>
                    }
                </div> 
            </>
        }

        </>
    );
}

export default CustomerData;