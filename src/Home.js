import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom";
export default function Home(){
    const nav=useNavigate();
    const [data, setData]=useState([])
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get("https://feedback-backend-5ni4.vercel.app/read");
            setData(response.data);
            console.log(response.data);
          } catch (error) {
            console.log(error);
          }
        };
    
        fetchData();
      }, []);
      const deleteStudent=(email)=>{
       let urladd="https://feedback-backend-5ni4.vercel.app/remove"
       let data={data:{email}};
       axios.delete(urladd,data)
       .then(res=>{
        alert("record deleted")
        window.location.reload()
       })
       .catch(err=>{
        console.log(err)
       })
      }
      const updateStudent=(name,email,feedback)=>{
        nav("/update", {state:{n:name,i:email,f:feedback}})
      }
    return(
        <>
        <center>
            <h1>Home page</h1>
            <table border="4" style={{"width":"70%"}}>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Feedback</th>
                    <th>Delete</th>
                    <th>Update</th>
                </tr>
                {
                    data.map( (e) =>(
                        <tr style={{"textAlign":"center"}}>
                            <td>{e.name}</td>
                            <td>{e.email}</td>
                            <td>{e.feedback}</td>
                            <td><button onClick={ ()=>{ if(window.confirm('are you sure you want to delete?'))deleteStudent(e.email)}}>Delete</button></td>
                            <td><button onClick={ ()=>{ updateStudent(e.name,e.email,e.feedback)}}>Update</button></td>
                        </tr>
                    ))
                }
            </table>
        </center>
        </>
    )
}