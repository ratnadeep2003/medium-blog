import type { ChangeEvent } from "react";
import { useState } from "react";
import { Link } from "react-router-dom"
import type { SignupInput } from "week13-common";

export const Auth=({type}:{type:"signup"|"signin"})=>{
    const [postInputs, setpostInputs] = useState<SignupInput>({
        name:"",
        email:"",
        password:""
    })
    return (
        <div className="h-screen flex justify-center flex-col">
            <div className="flex justify-center">
                <div>
                    <div className="text-3xl font-extrabold">
                        Create an account
                    </div>
                    <div className="text-slate-400">
                        Already have an account? 
                        <Link className="pl-2 underline" to={"/signin"}>Login</Link>
                    </div>
                </div>
                <LablledInput label="Name" placeholder="Ratnadeep" onchange={(e)=>{
                    setpostInputs({
                        ...postInputs, name: e.target.value
                    })
                }}/>
            </div>
        </div>
    )
}

interface LablledInputType {
    label: string,
    placeholder: string,
    onchange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function LablledInput({label, placeholder, onchange}:LablledInputType){
    return(
        <div>
            <div>
            <label className="block mb-2.5 text-sm font-medium text-heading">{label}</label>
            <input onChange={onchange} type="text" id="first_name" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder={placeholder} required />
        </div>
        </div>
    )
}