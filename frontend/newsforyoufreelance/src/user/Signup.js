import React, {useState} from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import {signup} from "../auth/helper";


const Signup = () =>{

    const [values, setValues] = useState({
        firstname:"",
        lastname:"",
        phoneno:"",
        email:"",
        password:"",
        error:"",
        success: false
    });

    const {firstname, lastname, email, phoneno, password, error, success} = values

    const handleChange = firstname => event =>{
        setValues({...values, error: false, [firstname]: event.target.value})
    }

    const onSubmit = event =>{
        event.preventDefault()
        setValues({...values, error: false})
        signup({firstname, lastname,phoneno, email, password})
        .then(data =>{
            if(data.error){
                setValues({...values, error:data.error, success: false})
            } else {
                setValues({
                    ...values,
                    firstname: "",
                    lastname:"",
                    phoneno:"",
                    email:"",
                    password: "",
                    error:"",
                    success: true
                })
            }
        })
        .catch()
    }

    const successMessage =() =>{
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div className="alert alert-success"
                    style={{display: success ? "": "none"}}
                    >
                        New account was created successfullty. Please {" "}
                        <Link to="user/signin"></Link>
                    </div>
                </div>
            </div>
        );
    };


    const errorMessage =() =>{
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div className="alert alert-danger"
                    style={{display: error ? "": "none"}}
                    >
                        {error}
                    </div>
                </div>
            </div>
        );
    };

    const signUpForm =() =>{
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-light">First Name</label>
                            <input className="form-control" onChange={handleChange("firstname")} type= "text" value={firstname} />
                        </div>
                        <div className="form-group">
                            <label className="text-light">Last Name</label>
                            <input className="form-control" onChange={handleChange("lastname")} type= "text" value={lastname} />
                        </div>
                        <div className="form-group">
                            <label className="text-light">Phone Number</label>
                            <input className="form-control" onChange={handleChange("phoneno")} type= "text" value={phoneno} />
                        </div>
                        <div className="form-group">
                            <label className="text-light">Email</label>
                            <input className="form-control" onChange={handleChange("email")} type= "email" value={email} />
                        </div>
                        <div className="form-group">
                            <label className="text-light">Password</label>
                            <input className="form-control" onChange={handleChange("password")} type= "password" value={password} />
                        </div>
                        <button onClick={onSubmit} className="btn btn-success btn-block">Submit</button>
                    </form>
                </div>
            </div>
        );
    };

    return (
        <Base title= "Sign up Page">
            {successMessage()}
            {errorMessage()}
            {signUpForm()}
        </Base>
    );
};

export default Signup;