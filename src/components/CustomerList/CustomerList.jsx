import { useEffect, useState } from "react";
import {db as firebase} from "../../firebase"
import style from './CustomerList.module.css'
import {Link} from "react-router-dom"
import {Redirect} from "react-router"
import CustomerData from "../Customer/customerData";
import {FaArrowAltCircleLeft} from 'react-icons/fa'

const CustomerList = () =>{


    const [users,setUsers] = useState([]);
    const [sender,setSender] = useState();
    const [showuser,setShowUser] = useState(false);
     
    useEffect(() => {
        setUsers([])
        firebase
          .collection('customers')
          .get()
          .then((snapshot) => {
            snapshot.docs.forEach((doc) => {
                setUsers((arr) => [
                  ...arr,
                  {
                    userID: doc.id,
                    name: doc.data().name,
                    email:doc.data().email
                  },
                ])
            })
          })
      }, [])

      function changeDetailsPage(){
        setShowUser(!showuser)
      }

      const backHome=()=>{
        <Redirect to="/"/>
    }

    return(
        <>
        {
          showuser ? <CustomerData docID={sender}  users={users} showUser={showuser} hideUser={changeDetailsPage}/> :
      
          <div id={style.userListComponent}>

            <div id={style.backBar}>

              <Link to="/" onClick={backHome}>
                <FaArrowAltCircleLeft className="backBtn"/>
              </Link>
              <p id={style.barHeading}>
                  List of customers
              </p>

            </div>
          
          <hr/>

          <ul id={style.usersList}>
          {users.length > 0 &&
            users
              .sort((cust_1, cust_2) => cust_1.name < cust_2.name)
              .map((user) => 
                  <li  key={user.userID} > 
                      <button className={style.usersDatabtn}
                        onClick={()=>{
                          setSender(user.userID)
                          setShowUser(!showuser)
                        }}
                      >
                        {user.name}
                        <p>{user.email}</p>

                      </button>
                  </li>
                )}
            </ul>
          </div>

        }
        </>
    );
}

export default CustomerList;