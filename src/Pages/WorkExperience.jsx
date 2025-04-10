import React, { useEffect, useState } from 'react'
import {FaEdit} from "react-icons/fa"
import {MdDelete} from "react-icons/md"
import Cookies from "js-cookie"

const WorkExperience = () => {

    const [workExperienceError, setWorkExperienceError] = useState(false)
    const [workExperienceSuccess, setWorkExperienceSuccess] = useState(false)
    const [workExperience, setWorkExperience] = useState([])
    const [updateWorkExperience, setUpdateWorkExperience] = useState(false)

    const [workExperienceObj, setWorkExperienceObj] = useState({
        company: "",
        jobTitle: "",
        startDate: "",
        endDate: ""
    })

    const [editWorkExperienceObj, setEditWorkExperienceObj] = useState({
        company: "",
        jobTitle: "",
        startDate: "",
        endDate: ""
    })

    const workExp = Cookies.get("WorkExperience")
    useEffect(() => {
        if(Cookies.get("WorkExperience")){
            const workExperienceStringArr = Cookies.get("WorkExperience")
            const actualArr = JSON.parse(workExperienceStringArr)
            setWorkExperience(actualArr)
        }
    }, [workExp])

    const workExperienceFormHandler = (event) => {
        event.preventDefault()

        if(!workExperienceObj.company.trim() || !workExperienceObj.jobTitle.trim() || !workExperienceObj.startDate.trim()){
            setWorkExperienceError("All fields in this form are required!")
        }else{
            if(!Cookies.get("WorkExperience")){
                const genericArray = []
                genericArray.push({
                    company: workExperienceObj.company.trim(), 
                    jobTitle: workExperienceObj.jobTitle.trim(), 
                    startDate: workExperienceObj.startDate.trim(), 
                    endDate: workExperienceObj.endDate?.trim() || "Current"
                })
                Cookies.set("WorkExperience", JSON.stringify(genericArray), {expires: 90})
            }else{
                const storedStringArray = Cookies.get("WorkExperience")
                const storedActualArray = JSON.parse(storedStringArray)
                storedActualArray.push({
                    company: workExperienceObj.company.trim(), 
                    jobTitle: workExperienceObj.jobTitle.trim(), 
                    startDate: workExperienceObj.startDate.trim(), 
                    endDate: workExperienceObj.endDate?.trim() || "Current"
                })
                Cookies.set("WorkExperience", JSON.stringify(storedActualArray), {expires: 90})
            }
            setWorkExperienceError("")
            workExperienceObj.company = ""
            workExperienceObj.jobTitle = ""
            workExperienceObj.startDate = ""
            workExperienceObj.endDate = ""
            setWorkExperienceSuccess("Work Experience Information Saved Successfully!")
            setTimeout(() => {
                setWorkExperienceSuccess(false)
            }, 6000)
        }
    }

    const [objToBeEditedIndex, setObjToBeEditedIndex] = useState(null) 
    const submitEditedWorkExp = (event) => {
        event.preventDefault()
        const storedStringArray = Cookies.get("WorkExperience")
        const storedActualArray = JSON.parse(storedStringArray)
        storedActualArray[objToBeEditedIndex] = {
            company: editWorkExperienceObj.company,
            jobTitle: editWorkExperienceObj.jobTitle,
            startDate: editWorkExperienceObj.startDate,
            endDate: editWorkExperienceObj.endDate
        }
        Cookies.set("WorkExperience", JSON.stringify(storedActualArray), {expires: 90})
        setUpdateWorkExperience(false)
    }

    const editWorkExperience = (index) => {
        setObjToBeEditedIndex(index)
        setUpdateWorkExperience(true)
        const storedStringArray = Cookies.get("WorkExperience")
        const storedActualArray = JSON.parse(storedStringArray)
        const filteredArr = storedActualArray.filter((obj, i, array) => array[i] === array[index])
        setEditWorkExperienceObj(filteredArr[0])
    }

    const deleteWorkExperience = (index) => {
        const storedStringArray = Cookies.get("WorkExperience")
        const storedActualArray = JSON.parse(storedStringArray)
        const filteredArr = storedActualArray.filter((obj, i, array) => array[i] !== array[index])
        Cookies.set("WorkExperience", JSON.stringify(filteredArr), {expires: 90})
        setWorkExperience(filteredArr)
    }

  return (
    <div>
        {Cookies.get("WorkExperience") && workExperience.length > 0 && workExperience.map((experience, index) => {
            return(
                <div key={index} className='shown-experience'>
                    <div className='company-name-action-buttons'>
                        <strong>{experience.company}</strong>
                        <span className="action-buttons">
                            <FaEdit className='btn-action' onClick={() => editWorkExperience(index)}/>
                            <MdDelete className='btn-action' onClick={() => deleteWorkExperience(index)}/>
                        </span>
                    </div>
                    <p>{experience.jobTitle}</p>
                    <p>From {Number(experience.startDate.split("-")[2])} {((experience.startDate.split("-")[1] === "01") && "January") || 
                             ((experience.startDate.split("-")[1] === "02") && "February") || 
                             ((experience.startDate.split("-")[1] === "03") && "March") || 
                             ((experience.startDate.split("-")[1] === "04") && "April") ||
                             ((experience.startDate.split("-")[1] === "05") && "May") ||
                             ((experience.startDate.split("-")[1] === "06") && "June") || 
                             ((experience.startDate.split("-")[1] === "07") && "July") ||
                             ((experience.startDate.split("-")[1] === "08") && "August") ||
                             ((experience.startDate.split("-")[1] === "09") && "September") || 
                             ((experience.startDate.split("-")[1] === "10") && "October") ||
                             ((experience.startDate.split("-")[1] === "11") && "November") ||
                             ((experience.startDate.split("-")[1] === "12") && "December")} {experience.startDate.split("-")[0]} To {(experience.endDate !== "Current") && Number(experience.endDate.split("-")[2])} {
                             ((experience.endDate.split("-")[1] === "01") && "January") ||
                             ((experience.endDate.split("-")[1] === "02") && "February") || 
                             ((experience.endDate.split("-")[1] === "03") && "March") || 
                             ((experience.endDate.split("-")[1] === "04") && "April") ||
                             ((experience.endDate.split("-")[1] === "05") && "May") ||
                             ((experience.endDate.split("-")[1] === "06") && "June") || 
                             ((experience.endDate.split("-")[1] === "07") && "July") ||
                             ((experience.endDate.split("-")[1] === "08") && "August") ||
                             ((experience.endDate.split("-")[1] === "09") && "September") || 
                             ((experience.endDate.split("-")[1] === "10") && "October") ||
                             ((experience.endDate.split("-")[1] === "11") && "November") ||
                             ((experience.endDate.split("-")[1] === "12") && "December")
                            } {experience.endDate.split("-")[0]}</p>
                </div>
            )
        })}

        {/* EDIT EXPERIENCE FORM */}
        {updateWorkExperience && 
        <form onSubmit={submitEditedWorkExp} className="edit-work-exp">
            <div className="inner">
                <h2 style={{marginTop: "-0.5em", textAlign: "center"}}>Edit Work Experience</h2>
                {workExperienceError ? <small style={{margin: "-6px", color: "red", textAlign: "center"}}>{workExperienceError}</small> : <></>}
                <input required pattern='^\S+(?: \S+)*\s?$' title='Please enter text without leading or trailing spaces' value={editWorkExperienceObj.company} onChange={event => setEditWorkExperienceObj({...editWorkExperienceObj, company: event.target.value})} type="text" placeholder="Company"/>
                <input required pattern='^\S+(?: \S+)*\s?$' title='Please enter text without leading or trailing spaces' value={editWorkExperienceObj.jobTitle} onChange={event => setEditWorkExperienceObj({...editWorkExperienceObj, jobTitle: event.target.value})} type="text" placeholder="Job Title"/>
                <label>Start Date</label>
                <input required value={editWorkExperienceObj.startDate} onChange={event => setEditWorkExperienceObj({...editWorkExperienceObj, startDate: event.target.value})} className='input-date' type="date" />
                <label>End Date</label>
                <input value={editWorkExperienceObj.endDate} onChange={event => setEditWorkExperienceObj({...editWorkExperienceObj, endDate: event.target.value})} className='input-date' type="date" />
                <div className="edit-work-experience-btns">
                    <button type="submit">Save Info</button>
                    <button style={{backgroundColor: "red"}} onClick={() => {
                        setUpdateWorkExperience(false)
                        }}>Dismiss</button>
                </div>
            </div>
        </form>}

        {/* WORK EXPERIENCE FORM */}
        <form onSubmit={workExperienceFormHandler} className="personal-form">
        <h2 style={{marginTop: "-0.5em", textAlign: "center"}}>Work Experience</h2>
        {workExperienceError ? <small style={{margin: "-6px", color: "red", textAlign: "center"}}>{workExperienceError}</small> : <></>}
        {workExperienceSuccess ? <small style={{margin: "-6px", color: "green", textAlign: "center"}}>{workExperienceSuccess}</small> : <></>}
        <input required pattern='^\S+(?: \S+)*\s?$' title='Please enter text without leading or trailing spaces' value={workExperienceObj.company} onChange={event => setWorkExperienceObj({...workExperienceObj, company: event.target.value})} type="text" placeholder="Company"/>
        <input required pattern='^\S+(?: \S+)*\s?$' title='Please enter text without leading or trailing spaces' value={workExperienceObj.jobTitle} onChange={event => setWorkExperienceObj({...workExperienceObj, jobTitle: event.target.value})} type="text" placeholder="Job Title"/>
        <label>Start Date</label>
        <input required value={workExperienceObj.startDate} onChange={event => setWorkExperienceObj({...workExperienceObj, startDate: event.target.value})} className='input-date' type="date" />
        <label>End Date (optional)</label>
        <input value={workExperienceObj.endDate} onChange={event => setWorkExperienceObj({...workExperienceObj, endDate: event.target.value})} className='input-date' type="date" />
        <button type="submit">Save Info</button>
        </form>
        <br />
    </div>
  )
}

export default WorkExperience