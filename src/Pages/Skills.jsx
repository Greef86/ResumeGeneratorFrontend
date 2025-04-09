import React, { useEffect, useState } from 'react'
import Select from "react-select"
import Cookies from "js-cookie"
import {MdDelete} from "react-icons/md"

const Skills = () => {

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
          maxHeight: "1.7em",
          textAlign: "left",
          borderColor: "black",
          border: "1.5px solid black",
        }),
        option: (current) => ({...current, color: "black"})
    }

    const skills = [
        {value: "Beginner", label: "Beginner"},
        {value: "Intermediate", label: "Intermediate"},
        {value: "Advanced", label: "Advanced"},
        {value: "Expert", label: "Expert"}
    ]

    const skillSubmitHandler = (event) => {
        event.preventDefault()
        console.log(skill)
        console.log(proficiency.value)
        
        if(!skill.trim() || !proficiency.value.trim()){
            setSchoolError("All fields in this form are required!")
        }else{
            if(!Cookies.get("skill")){
                const genericArray = []
                genericArray.push({skill: skill.trim(), proficiency: proficiency.value.trim()})
                Cookies.set("skill", JSON.stringify(genericArray), {expires: 90})
            }else{
                const storedStringArray = Cookies.get("skill")
                const storedActualArray = JSON.parse(storedStringArray)
                storedActualArray.push({skill: skill.trim(), proficiency: proficiency.value.trim()})
                Cookies.set("skill", JSON.stringify(storedActualArray), {expires: 90})
            }
            setSchoolError("")
            setSkill("")
            setProficiency(null)
            setSchoolSuccess("Skill Saved Successfully!")
            setTimeout(() => {
                setSchoolSuccess(false)
            }, 6000)
        }
    }

    const schoolArr = Cookies.get("skill")
    useEffect(() => {
        if(Cookies.get("skill")){
            const schoolStringArr = Cookies.get("skill")
            const actualArr = JSON.parse(schoolStringArr)
            setShowEduArr(actualArr)
        }
    }, [schoolArr])

    const deleteEducation = (index) => {
        const storedStringArray = Cookies.get("skill")
        const storedActualArray = JSON.parse(storedStringArray)
        const filteredArr = storedActualArray.filter((obj, i, array) => array[i] !== array[index])
        Cookies.set("skill", JSON.stringify(filteredArr), {expires: 90})
        setShowEduArr(filteredArr)
    }

  return (
    <div>
        {Cookies.get("skill") && showEduArr.length > 0 && showEduArr.map((skillObj, index) => {
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

        {/* SKILLS FORM */}
        <form onSubmit={skillSubmitHandler} className="personal-form">
        <h2 style={{marginTop: "-0.5em", textAlign: "center"}}>Skills</h2>
        {schoolError ? <small style={{margin: "-6px", color: "red", textAlign: "center"}}>{schoolError}</small> : <></>}
        {schoolSuccess ? <small style={{margin: "-6px", color: "green", textAlign: "center"}}>{schoolSuccess}</small> : <></>}
        <input value={skill} onChange={event => setSkill(event.target.value)} style={{marginBottom: "0.3em"}} required pattern='^\S+(?: \S+)*$' title='Please enter text without leading or trailing spaces' type="text" placeholder="Skill"/>
        <Select value={proficiency} onChange={setProficiency} required styles={customStyles} options={skills} placeholder="Proficiency"/>
        <button style={{marginTop: "0.5em"}} type="submit">Save Info</button>
        </form>
        <br />
    </div>
  )
}

export default Skills