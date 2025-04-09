import React, { useEffect, useState } from 'react'
import Cookies from "js-cookie"
import {MdDelete} from "react-icons/md"

const Links = () => {

    const [skill, setSkill] = useState("")
    const [schoolError, setSchoolError] = useState(false)
    const [schoolSuccess, setSchoolSuccess] = useState(false)
    const [showEduArr, setShowEduArr] = useState([])

    const schoolArr = Cookies.get("links")
    useEffect(() => {
        if(Cookies.get("links")){
            const schoolStringArr = Cookies.get("links")
            const actualArr = JSON.parse(schoolStringArr)
            setShowEduArr(actualArr)
        }
    }, [schoolArr])

    const skillSubmitHandler = (event) => {
        event.preventDefault()
        
        if(!skill.trim()){
            setSchoolError("Link text is required!")
        }else{
            if(!Cookies.get("links")){
                const genericArray = []
                genericArray.push(skill.trim())
                Cookies.set("links", JSON.stringify(genericArray), {expires: 90})
            }else{
                const storedStringArray = Cookies.get("links")
                const storedActualArray = JSON.parse(storedStringArray)
                storedActualArray.push(skill.trim())
                Cookies.set("links", JSON.stringify(storedActualArray), {expires: 90})
            }
            setSchoolError("")
            setSkill("")
            setSchoolSuccess("Link Saved Successfully!")
            setTimeout(() => {
                setSchoolSuccess(false)
            }, 6000)
        }
    }

    const deleteEducation = (index) => {
        const storedStringArray = Cookies.get("links")
        const storedActualArray = JSON.parse(storedStringArray)
        const filteredArr = storedActualArray.filter((obj, i, array) => array[i] !== array[index])
        Cookies.set("links", JSON.stringify(filteredArr), {expires: 90})
        setShowEduArr(filteredArr)
    }

  return (
    <div>

        {Cookies.get("links") && showEduArr.length > 0 && showEduArr.map((link, index) => {
            return(
                <div key={index} className='shown-experience' style={{display: "flex", justifyContent: "space-between", marginBottom: "4px"}}>
                    
                    <div className='company-name-action-buttons'>
                        <a href={link} target='_blank' rel="noreferrer">{link}</a>
                    </div>
                    <span className="action-buttons">
                        <MdDelete className='btn-action' onClick={() => deleteEducation(index)}/>
                    </span>
                </div>
            )
        })}

        {/* LINKS FORM */}
        <form onSubmit={skillSubmitHandler} className="personal-form">
        <h2 style={{marginTop: "-0.5em", textAlign: "center"}}>Links</h2>
        {schoolError ? <small style={{margin: "-6px", color: "red", textAlign: "center"}}>{schoolError}</small> : <></>}
        {schoolSuccess ? <small style={{margin: "-6px", color: "green", textAlign: "center"}}>{schoolSuccess}</small> : <></>}
        <input value={skill} onChange={event => setSkill(event.target.value)} style={{marginBottom: "0.3em"}} required pattern='^\S+(?: \S+)*$' title='Please enter text without leading or trailing spaces' type="text" placeholder="Link Text"/>
        <button style={{marginTop: "0.5em"}} type="submit">Save Info</button>
        </form>
        <br />
    </div>
  )
}

export default Links