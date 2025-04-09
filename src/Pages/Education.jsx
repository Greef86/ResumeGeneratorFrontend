import React, { useEffect, useState } from 'react'
import Cookies from "js-cookie"
import {FaEdit} from "react-icons/fa"
import {MdDelete} from "react-icons/md"

const Education = () => {

    const [schoolError, setSchoolError] = useState(false)
    const [schoolSuccess, setSchoolSuccess] = useState(false)
    const [showEduArr, setShowEduArr] = useState([])
    const [updateEducation, setUpdateEducation] = useState(false)

    const [educationObj, setEducationObj] = useState({
        school: "",
        certificate: "",
        qualification: "",
        startDate: "",
        endDate: ""
    })

    const [editEducationObj, setEditEducationObj] = useState({
        school: "",
        certificate: "",
        qualification: "",
        startDate: "",
        endDate: ""
    })

    const schoolArr = Cookies.get("school")
        useEffect(() => {
            if(Cookies.get("school")){
                const schoolStringArr = Cookies.get("school")
                const actualArr = JSON.parse(schoolStringArr)
                setShowEduArr(actualArr)
            }
        }, [schoolArr])

    const educationHandler = (event) => {
        event.preventDefault()
        if(!educationObj.school.trim() || !educationObj.certificate.trim() || !educationObj.qualification.trim() || !educationObj.startDate.trim() || !educationObj.endDate.trim()){
            setSchoolError("All fields in this form are required!")
        }else{
            if(!Cookies.get("school")){
                const genericArray = []
                genericArray.push({
                    school: educationObj.school.trim(), 
                    certificate: educationObj.certificate.trim(), 
                    qualification: educationObj.qualification.trim(), 
                    startDate: educationObj.startDate.trim(),
                    endDate: educationObj.endDate.trim()
                })
                Cookies.set("school", JSON.stringify(genericArray), {expires: 90})
            }else{
                const storedStringArray = Cookies.get("school")
                const storedActualArray = JSON.parse(storedStringArray)
                storedActualArray.push({
                    school: educationObj.school.trim(), 
                    certificate: educationObj.certificate.trim(), 
                    qualification: educationObj.qualification.trim(), 
                    startDate: educationObj.startDate.trim(),
                    endDate: educationObj.endDate.trim()
                })
                Cookies.set("school", JSON.stringify(storedActualArray), {expires: 90})
            }
            setSchoolError("")
            educationObj.school = ""
            educationObj.certificate = ""
            educationObj.qualification = ""
            educationObj.startDate = ""
            educationObj.endDate = ""
            setSchoolSuccess("School Information Saved Successfully!")
            setTimeout(() => {
                setSchoolSuccess(false)
            }, 6000)
        }
    }

    const [objToBeEditedIndex, setObjToBeEditedIndex] = useState(null) 
    const submitEditedEducation = (event) => {
        event.preventDefault()
        const storedStringArray = Cookies.get("school")
        const storedActualArray = JSON.parse(storedStringArray)
        storedActualArray[objToBeEditedIndex] = {
            school: editEducationObj.school,
            certificate: editEducationObj.certificate,
            qualification: editEducationObj.qualification,
            startDate: editEducationObj.startDate,
            endDate: editEducationObj.endDate
        }
        Cookies.set("school", JSON.stringify(storedActualArray), {expires: 90})
        setUpdateEducation(false)
    }

    const editEducation = (index) => {
        setObjToBeEditedIndex(index)
        setUpdateEducation(true)
        const storedStringArray = Cookies.get("school")
        const storedActualArray = JSON.parse(storedStringArray)
        const filteredArr = storedActualArray.filter((obj, i, array) => array[i] === array[index])
        setEditEducationObj(filteredArr[0])
    }
    
    const deleteEducation = (index) => {
        const storedStringArray = Cookies.get("school")
        const storedActualArray = JSON.parse(storedStringArray)
        const filteredArr = storedActualArray.filter((obj, i, array) => array[i] !== array[index])
        Cookies.set("school", JSON.stringify(filteredArr), {expires: 90})
        setShowEduArr(filteredArr)
    }

  return (
    <div>
        {Cookies.get("school") && showEduArr.length > 0 && showEduArr.map((schoolObj, index) => {
            return(
                <div key={index} className='shown-experience'>
                    
                    <div className='company-name-action-buttons'>
                        <strong>{schoolObj.school}</strong>
                        <span className="action-buttons">
                            <FaEdit className='btn-action' onClick={() => editEducation(index)}/>
                            <MdDelete className='btn-action' onClick={() => deleteEducation(index)}/>
                        </span>
                    </div>
                    <p>{schoolObj.certificate}</p>
                    <p>{schoolObj.qualification}</p>
                    <p>From {Number(schoolObj.startDate.split("-")[2])} {((schoolObj.startDate.split("-")[1] === "01") && "January") || 
                             ((schoolObj.startDate.split("-")[1] === "02") && "February") || 
                             ((schoolObj.startDate.split("-")[1] === "03") && "March") || 
                             ((schoolObj.startDate.split("-")[1] === "04") && "April") ||
                             ((schoolObj.startDate.split("-")[1] === "05") && "May") ||
                             ((schoolObj.startDate.split("-")[1] === "06") && "June") || 
                             ((schoolObj.startDate.split("-")[1] === "07") && "July") ||
                             ((schoolObj.startDate.split("-")[1] === "08") && "August") ||
                             ((schoolObj.startDate.split("-")[1] === "09") && "September") || 
                             ((schoolObj.startDate.split("-")[1] === "10") && "October") ||
                             ((schoolObj.startDate.split("-")[1] === "11") && "November") ||
                             ((schoolObj.startDate.split("-")[1] === "12") && "December")} {schoolObj.startDate.split("-")[0]} To {(schoolObj.endDate !== "Current") && Number(schoolObj.endDate.split("-")[2])} {
                             ((schoolObj.endDate.split("-")[1] === "01") && "January") ||
                             ((schoolObj.endDate.split("-")[1] === "02") && "February") || 
                             ((schoolObj.endDate.split("-")[1] === "03") && "March") || 
                             ((schoolObj.endDate.split("-")[1] === "04") && "April") ||
                             ((schoolObj.endDate.split("-")[1] === "05") && "May") ||
                             ((schoolObj.endDate.split("-")[1] === "06") && "June") || 
                             ((schoolObj.endDate.split("-")[1] === "07") && "July") ||
                             ((schoolObj.endDate.split("-")[1] === "08") && "August") ||
                             ((schoolObj.endDate.split("-")[1] === "09") && "September") || 
                             ((schoolObj.endDate.split("-")[1] === "10") && "October") ||
                             ((schoolObj.endDate.split("-")[1] === "11") && "November") ||
                             ((schoolObj.endDate.split("-")[1] === "12") && "December")
                            } {schoolObj.endDate.split("-")[0]}</p>
                </div>
            )
        })}

        {/* EDIT SCHOOL FORM */}
        {updateEducation && 
        <form onSubmit={submitEditedEducation} className="edit-work-exp">
            <div className="inner">
                <h2 style={{marginTop: "-0.5em", textAlign: "center"}}>Edit Education</h2>
                {/* {workExperienceError ? <small style={{margin: "-6px", color: "red", textAlign: "center"}}>{workExperienceError}</small> : <></>} */}
                <input required pattern='^\S+(?: \S+)*$' title='Please enter text without leading or trailing spaces' value={editEducationObj.school} onChange={event => setEditEducationObj({...editEducationObj, school: event.target.value})} type="text" placeholder="School"/>
                <input required pattern='^\S+(?: \S+)*$' title='Please enter text without leading or trailing spaces' value={editEducationObj.certificate} onChange={event => setEditEducationObj({...editEducationObj, certificate: event.target.value})} type="text" placeholder="Certificate Name"/>
                <input required pattern='^\S+(?: \S+)*$' title='Please enter text without leading or trailing spaces' value={editEducationObj.qualification} onChange={event => setEditEducationObj({...editEducationObj, qualification: event.target.value})} type="text" placeholder="Qualification Level"/>
                <label>Start Date</label>
                <input required value={editEducationObj.startDate} onChange={event => setEditEducationObj({...editEducationObj, startDate: event.target.value})} className='input-date' type="date" />
                <label>End Date</label>
                <input required value={editEducationObj.endDate} onChange={event => setEditEducationObj({...editEducationObj, endDate: event.target.value})} className='input-date' type="date" />
                <div className="edit-work-experience-btns">
                    <button type="submit">Save Info</button>
                    <button style={{backgroundColor: "red"}} onClick={() => {
                        setUpdateEducation(false)
                    }}>Dismiss</button>
                </div>
            </div>
        </form>}

        {/* SCHOOL FORM */}
        <form onSubmit={educationHandler} className="personal-form">
        <h2 style={{marginTop: "-0.5em", textAlign: "center"}}>Education</h2>
        {schoolError ? <small style={{margin: "-6px", color: "red", textAlign: "center"}}>{schoolError}</small> : <></>}
        {schoolSuccess ? <small style={{margin: "-6px", color: "green", textAlign: "center"}}>{schoolSuccess}</small> : <></>}
        <input value={educationObj.school} onChange={event => setEducationObj({...educationObj, school: event.target.value})} required pattern='^\S+(?: \S+)*$' title='Please enter text without leading or trailing spaces' type="text" placeholder="School"/>
        <input value={educationObj.certificate} onChange={event => setEducationObj({...educationObj, certificate: event.target.value})} required pattern='^\S+(?: \S+)*$' title='Please enter text without leading or trailing spaces' type="text" placeholder="Certificate Name"/>
        <input value={educationObj.qualification} onChange={event => setEducationObj({...educationObj, qualification: event.target.value})} required pattern='^\S+(?: \S+)*$' title='Please enter text without leading or trailing spaces' type="text" placeholder="Qualification Level"/>
        <label>Start Date</label>
        <input value={educationObj.startDate} onChange={event => setEducationObj({...educationObj, startDate: event.target.value})} required className='input-date' type="date" />
        <label>End Date</label>
        <input value={educationObj.endDate} onChange={event => setEducationObj({...educationObj, endDate: event.target.value})} required className='input-date' type="date" />
        <button type="submit">Save Info</button>
        </form>
        <br />
    </div>
  )
}

export default Education