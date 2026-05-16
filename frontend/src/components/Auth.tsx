import type { ChangeEvent } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import type { SignupInput } from "week13-common";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Auth=({type}:{type:"signup"|"signin"})=>{
    const navigate = useNavigate();
    const [postInputs, setpostInputs] = useState<SignupInput>({
        name:"",
        email:"",
        password:""
    })

    async function sendRequest(){
        try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs,{ 
                headers: { "Content-Type": "application/json" } 
            });
            const jwt = response.data.jwt;
            localStorage.setItem("token",jwt);
            navigate("/blogs");
        }
        catch(e: unknown){
            const err = e as { response?: { data?: unknown } };
            alert(JSON.stringify(err.response?.data) || "Error while signing up")
        }
    }

    return (
        <div className="h-screen flex justify-center flex-col">
            <div className="flex justify-center">
                <div>
                    <div className="px-10">
                        <div className="text-3xl font-extrabold">
                            {type === "signin" ? "Dont have an account ?" : "Already have an account?"}
                        </div>
                        <div className="text-slate-400">
                            Already have an account? 
                            <Link className="pl-2 underline" to={type === "signin" ? "/signup" : "/signin"}>{type === "signin" ? "Sign up" : "Sign in"}</Link>
                        </div>
                    </div>
                    <div className="pt-4">
                        {type === "signup" ? <LablledInput label="Name" placeholder="Ratnadeep" onchange={(e)=>{
                            setpostInputs({
                                ...postInputs, name: e.target.value
                            })
                            }}/> : null}
                        <LablledInput label="Username" placeholder="ratnadeep@gmail.com"
                        onchange={(e)=>{
                            setpostInputs({
                                ...postInputs, email: e.target.value
                            })
                            }}/>
                        <LablledInput label="Password" type={"password"} placeholder="12345" onchange={(e)=>{
                            setpostInputs({
                            ...postInputs, password: e.target.value
                            })
                            }}/>
                        <button onClick={sendRequest} type="button" className="mt-8 w-full text-white bg-gray-800 hover:bg-black font-medium rounded-lg text-sm px-4 py-2.5">
                            {type === "signup" ? "Sign up" : "Sign in"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

interface LablledInputType {
    label: string,
    placeholder: string,
    onchange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string
}

function LablledInput({label, placeholder, onchange, type}:LablledInputType){
    return(
        <div>
            <div>
            <label className="block mb-2.5 text-sm font-semibold pt-4 text-heading">{label}</label>
            <input onChange={onchange} type={type ||"text"} id="first_name" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder={placeholder} required />
        </div>
        </div>
    )
}