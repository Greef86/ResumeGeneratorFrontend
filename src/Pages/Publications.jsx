import React, { useEffect, useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import Cookies from "js-cookie"
import {FaEdit} from "react-icons/fa"
import {MdDelete} from "react-icons/md"

const Publications = () => {

    const [schoolError, setSchoolError] = useState(false)
    const [schoolSuccess, setSchoolSuccess] = useState(false)
    const [showEduArr, setShowEduArr] = useState([])
    const [updateEducation, setUpdateEducation] = useState(false)

    const [publicationObj, setPublicationObj] = useState({
        name: "",
        link: "",
        date: "",
        details: ""
    })

    const [editPublicationObj, setEditPublicationObj] = useState({
        name: "",
        link: "",
        date: "",
        details: ""
    })

    const schoolArr = Cookies.get("publications")
        useEffect(() => {
            if(Cookies.get("publications")){
                const schoolStringArr = Cookies.get("publications")
                const actualArr = JSON.parse(schoolStringArr)
                setShowEduArr(actualArr)
            }
        }, [schoolArr])

    const publicationsHandler = (event) => {
        event.preventDefault()

        if(!publicationObj.name.trim() || !publicationObj.link.trim() || !publicationObj.date.trim() || !publicationObj.details.trim()){
            setSchoolError("All fields in this form are required!")
        }else{
            if(!Cookies.get("publications")){
                const genericArray = []
                genericArray.push({
                    name: publicationObj.name.trim(), 
                    link: publicationObj.link.trim(), 
                    date: publicationObj.date.trim(), 
                    details: publicationObj.details.trim()
                })
                Cookies.set("publications", JSON.stringify(genericArray), {expires: 90})
            }else{
                const storedStringArray = Cookies.get("publications")
                const storedActualArray = JSON.parse(storedStringArray)
                storedActualArray.push({
                    name: publicationObj.name.trim(), 
                    link: publicationObj.link.trim(), 
                    date: publicationObj.date.trim(), 
                    details: publicationObj.details.trim()
                })
                Cookies.set("publications", JSON.stringify(storedActualArray), {expires: 90})
            }
            setSchoolError("")
            publicationObj.name = ""
            publicationObj.link = ""
            publicationObj.date = ""
            publicationObj.details = ""
            setSchoolSuccess("Publication Information Saved Successfully!")
            setTimeout(() => {
                setSchoolSuccess(false)
            }, 6000)
        }
    }

    const [objToBeEditedIndex, setObjToBeEditedIndex] = useState(null) 
    const submitEditedEducation = (event) => {
        event.preventDefault()
        const storedStringArray = Cookies.get("publications")
        const storedActualArray = JSON.parse(storedStringArray)
        storedActualArray[objToBeEditedIndex] = {
            name: editPublicationObj.name,
            link: editPublicationObj.link,
            date: editPublicationObj.date, 
            details: editPublicationObj.details
        }
        Cookies.set("publications", JSON.stringify(storedActualArray), {expires: 90})
        setUpdateEducation(false)
    }

    const editEducation = (index) => {
        setObjToBeEditedIndex(index)
        setUpdateEducation(true)
        const storedStringArray = Cookies.get("publications")
        const storedActualArray = JSON.parse(storedStringArray)
        const filteredArr = storedActualArray.filter((obj, i, array) => array[i] === array[index])
        setEditPublicationObj(filteredArr[0])
    }
    
    const deleteEducation = (index) => {
        const storedStringArray = Cookies.get("publications")
        const storedActualArray = JSON.parse(storedStringArray)
        const filteredArr = storedActualArray.filter((obj, i, array) => array[i] !== array[index])
        Cookies.set("publications", JSON.stringify(filteredArr), {expires: 90})
        setShowEduArr(filteredArr)
    }

  return (
    <div>

    {Cookies.get("publications") && showEduArr.length > 0 && showEduArr.map((publicationObj, index) => {
            return(
                <div key={index} className='shown-experience'>
                    
                    <div className='company-name-action-buttons'>
                        <strong>{publicationObj.name}</strong>
                        <span className="action-buttons">
                            <FaEdit className='btn-action' onClick={() => editEducation(index)}/>
                            <MdDelete className='btn-action' onClick={() => deleteEducation(index)}/>
                        </span>
                    </div>
                    <a href={publicationObj.link} target='_blank' rel="noreferrer">{publicationObj.link}</a>
                    <p>Published: {Number(publicationObj.date.split("-")[2])} {((publicationObj.date.split("-")[1] === "01") && "January") || 
                             ((publicationObj.date.split("-")[1] === "02") && "February") || 
                             ((publicationObj.date.split("-")[1] === "03") && "March") || 
                             ((publicationObj.date.split("-")[1] === "04") && "April") ||
                             ((publicationObj.date.split("-")[1] === "05") && "May") ||
                             ((publicationObj.date.split("-")[1] === "06") && "June") || 
                             ((publicationObj.date.split("-")[1] === "07") && "July") ||
                             ((publicationObj.date.split("-")[1] === "08") && "August") ||
                             ((publicationObj.date.split("-")[1] === "09") && "September") || 
                             ((publicationObj.date.split("-")[1] === "10") && "October") ||
                             ((publicationObj.date.split("-")[1] === "11") && "November") ||
                             ((publicationObj.date.split("-")[1] === "12") && "December")} {publicationObj.date.split("-")[0]}</p>
                    <p>{publicationObj.details}</p>
                </div>
            )
        })}

        {/* EDIT PUBLICATIONS FORM */}
        {updateEducation && 
        <form onSubmit={submitEditedEducation} className="edit-work-exp">
            <div className="inner">
                <h2 style={{marginTop: "-0.5em", textAlign: "center"}}>Edit publications</h2>
                {schoolError ? <small style={{margin: "-6px", color: "red", textAlign: "center"}}>{schoolError}</small> : <></>}
                {schoolSuccess ? <small style={{margin: "-6px", color: "green", textAlign: "center"}}>{schoolSuccess}</small> : <></>}
                <input value={editPublicationObj.name} onChange={event => setEditPublicationObj({...editPublicationObj, name: event.target.value})} required pattern='^\S+(?: \S+)*\s?$' title='Please enter text without leading or trailing spaces' type="text" placeholder="Name of publication"/>
                <input value={editPublicationObj.link} onChange={event => setEditPublicationObj({...editPublicationObj, link: event.target.value})} required pattern='^\S+(?: \S+)*\s?$' title='Please enter text without leading or trailing spaces' type="text" placeholder="publication Link"/>
                <label>Date Published</label>
                <input value={editPublicationObj.date} onChange={event => setEditPublicationObj({...editPublicationObj, date: event.target.value})} required className='input-date' type="date" />
                <TextareaAutosize value={editPublicationObj.details} onChange={event => setEditPublicationObj({...editPublicationObj, details: event.target.value})} minRows={4} maxRows={6} required pattern='^\S+(?: \S+)*\s?$' title='Please enter text without leading or trailing spaces' className='autoSizeTextArea' type='text' placeholder='Publication details'/>
                <div className="edit-work-experience-btns">
                    <button type="submit">Save Info</button>
                    <button style={{backgroundColor: "red"}} onClick={() => {
                        setUpdateEducation(false)
                    }}>Dismiss</button>
                </div>
            </div>
        </form>}

        {/* PUBLICATIONS FORM */}
        <form onSubmit={publicationsHandler} className="personal-form">
        <h2 style={{marginTop: "-0.5em", textAlign: "center"}}>Publications</h2>
        {schoolError ? <small style={{margin: "-6px", color: "red", textAlign: "center"}}>{schoolError}</small> : <></>}
        {schoolSuccess ? <small style={{margin: "-6px", color: "green", textAlign: "center"}}>{schoolSuccess}</small> : <></>}
        <input value={publicationObj.name} onChange={event => setPublicationObj({...publicationObj, name: event.target.value})} required pattern='^\S+(?: \S+)*\s?$' title='Please enter text without leading or trailing spaces' type="text" placeholder="Name of publication"/>
        <input value={publicationObj.link} onChange={event => setPublicationObj({...publicationObj, link: event.target.value})} required pattern='^\S+(?: \S+)*\s?$' title='Please enter text without leading or trailing spaces' type="text" placeholder="publication Link"/>
        <label>Date Published</label>
        <input value={publicationObj.date} onChange={event => setPublicationObj({...publicationObj, date: event.target.value})} required className='input-date' type="date" />
        <TextareaAutosize value={publicationObj.details} onChange={event => setPublicationObj({...publicationObj, details: event.target.value})} minRows={4} maxRows={6} required pattern='^\S+(?: \S+)*\s?$' title='Please enter text without leading or trailing spaces' className='autoSizeTextArea' type='text' placeholder='Publication details'/>
        <button type="submit">Save Info</button>
        </form>
        <br />
    </div>
  )
}

export default Publications