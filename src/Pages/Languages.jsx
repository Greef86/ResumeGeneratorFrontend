import React, { useEffect, useState } from 'react'
import Select from "react-select"
import Cookies from "js-cookie"
import {MdDelete} from "react-icons/md"


const Languages = () => {

    const [skill, setSkill] = useState("")
    const [proficiency, setProficiency] = useState(null)
    const [schoolError, setSchoolError] = useState(false)
    const [schoolSuccess, setSchoolSuccess] = useState(false)
    const [showEduArr, setShowEduArr] = useState([])

    const customStyles = {
        control: (current) => ({
          ...current,
          width: "100%", 
          minHeight: "1em",
          maxHeight: "2em",
          textAlign: "left",
          borderColor: "black",
          border: "1.5px solid black",
        }),
        option: (current) => ({...current, color: "black"})
    }

    const skills = [
        {value: "Native", label: "Native"},
        {value: "Beginner", label: "Beginner"},
        {value: "Intermediate", label: "Intermediate"},
        {value: "Advanced", label: "Advanced"}
    ]

    const schoolArr = Cookies.get("languages")
        useEffect(() => {
            if(Cookies.get("languages")){
                const schoolStringArr = Cookies.get("languages")
                const actualArr = JSON.parse(schoolStringArr)
                setShowEduArr(actualArr)
            }
        }, [schoolArr])

    const skillSubmitHandler = (event) => {
        event.preventDefault()
        
        if(!skill.trim() || !proficiency.value.trim()){
            setSchoolError("All fields in this form are required!")
        }else{
            if(!Cookies.get("languages")){
                const genericArray = []
                genericArray.push({skill: skill.trim(), proficiency: proficiency.value.trim()})
                Cookies.set("languages", JSON.stringify(genericArray), {expires: 90})
            }else{
                const storedStringArray = Cookies.get("languages")
                const storedActualArray = JSON.parse(storedStringArray)
                storedActualArray.push({skill: skill.trim(), proficiency: proficiency.value.trim()})
                Cookies.set("languages", JSON.stringify(storedActualArray), {expires: 90})
            }
            setSchoolError("")
            setSkill("")
            setProficiency(null)
            setSchoolSuccess("Language Saved Successfully!")
            setTimeout(() => {
                setSchoolSuccess(false)
            }, 6000)
        }
    }

    const deleteEducation = (index) => {
            const storedStringArray = Cookies.get("languages")
            const storedActualArray = JSON.parse(storedStringArray)
            const filteredArr = storedActualArray.filter((obj, i, array) => array[i] !== array[index])
            Cookies.set("languages", JSON.stringify(filteredArr), {expires: 90})
            setShowEduArr(filteredArr)
        }

  return (
    <div>
        {Cookies.get("languages") && showEduArr.length > 0 && showEduArr.map((skillObj, index) => {
            return(
                <div key={index} className='shown-experience' style={{display: "flex", justifyContent: "space-between", marginBottom: "4px"}}>
                    
                    <div className='company-name-action-buttons'>
                        <strong>{skillObj.skill}</strong>
                        <p>&nbsp;&nbsp;{"====>"}&nbsp;&nbsp;</p>
                        <p>{skillObj.proficiency}</p>
                    </div>
                    <span className="action-buttons">
                        <MdDelete className='btn-action' onClick={() => deleteEducation(index)}/>
                    </span>
                </div>
            )
        })}

        {/* LANGUAGES FORM */}
        <form onSubmit={skillSubmitHandler} className="personal-form">
        <h2 style={{marginTop: "-0.5em", textAlign: "center"}}>Languages</h2>
        {schoolError ? <small style={{margin: "-6px", color: "red", textAlign: "center"}}>{schoolError}</small> : <></>}
        {schoolSuccess ? <small style={{margin: "-6px", color: "green", textAlign: "center"}}>{schoolSuccess}</small> : <></>}
        <input value={skill} onChange={event => setSkill(event.target.value)} style={{marginBottom: "0.3em"}} required pattern='^\S+(?: \S+)*\s?$' title='Please enter text without leading or trailing spaces' type="text" placeholder="Language"/>
        <Select value={proficiency} onChange={setProficiency} required styles={customStyles} options={skills} placeholder="Proficiency"/>
        <button style={{marginTop: "0.5em"}} type="submit">Save Info</button>
        </form>
        <br />
    </div>
  )
}

export default Languages