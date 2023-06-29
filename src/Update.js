import { useState,useRef ,useEffect} from "react"
import axios from "axios"
import { ErrorResponse } from "@remix-run/router";
import { useNavigate,useLocation } from "react-router-dom";
export default function Update(){
    const nav=useNavigate();
    const loc=useLocation();
     
    useEffect( ()=>{
        setName(loc.state.n)
        setEmail(loc.state.i)
        setFeedback(loc.state.f)
    },[])

    const rName= useRef();
    const[name,setName]=useState("")
    const[email,setEmail]=useState("")
    const[feedback,setFeedback]=useState("")
    const [errors, setErrors] = useState({});

    const hname=(event)=>{setName(event.target.value);}
    const hemail=(event)=>{setEmail(event.target.value);}
    const hfeedback=(event)=>{setFeedback(event.target.value);}
 
    const validateForm = () => {
        let formErrors = {};
        let isValid = true;
    
        // Validate name
        if (!name) {
          formErrors.name = " *Name is required";
          isValid = false;
        } else if (/\d/.test(name)) {
            <br/>
          formErrors.name = " *Name should not contain numbers";
          isValid = false;
        } else if (/[^a-zA-Z0-9]/.test(name)) {
          formErrors.name = " *Name should not contain special characters";
          isValid = false;
        }
    
        // Validate email
        if (!email) {
          formErrors.email = " *Email is required";
          isValid = false;
        } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email.toLowerCase()) )
        {
          formErrors.email = " *Email is invalid";
          isValid = false;
        }
    
        // Validate feedback
        if (!feedback) {
          formErrors.feedback = " *Feedback is required";
          isValid = false;
        }
    
        setErrors(formErrors);
        return isValid;
      };
    

    const save=(event)=>{
        event.preventDefault();
        // let data = name+" "+email+" "+feedback;

        // alert(data);
        if (validateForm()) {
            
            let urladd= "https://feedback-backend-5ni4.vercel.app/change";
            let data={name,email,feedback};
            axios.put(urladd, data)
            .then(res => {
                
                alert("Record updated");
            // Rest of the code
           nav("/")
          
           
           
        })
        .catch((error) => {
            
            if (error.code === "ERR_NETWORK") {
                alert("Server down! Please try again later.");
                // Rest of the code
                setName("");
                setEmail("");
                setFeedback("");
                rName.current.focus();
            } 
        });
        
    }
    }
    return(
        <>
        <center>
            <h1>Update page</h1>
            <form onSubmit={save}>
                <input type="text" placeholder="Enter your name" onChange={hname} value={name} ref={rName}/>  {errors.name && <div>{errors.name}</div>}
                <br/><br/>
                <input type="text" placeholder="Enter your email" onChange={hemail} value={email} disabled={true}/>
                <br/><br/>
                <textarea rows="5" cols="33" placeholder="Enter your feedback " onChange={hfeedback} value={feedback}></textarea>{errors.feedback && <div>{errors.feedback}</div>}
                <br/><br/>
                <input type='submit' placeholder="Enter your name"/>
                <br/><br/>
            </form>
        </center>
        </>
    )
}