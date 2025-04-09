import React, { useEffect, useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import Cookies from "js-cookie"
import {FaEdit} from "react-icons/fa"
import {MdDelete} from "react-icons/md"

const Certifications = () => {

    const [schoolError, setSchoolError] = useState(false)
    const [schoolSuccess, setSchoolSuccess] = useState(false)
    const [showEduArr, setShowEduArr] = useState([])
    const [updateEducation, setUpdateEducation] = useState(false)

    const [certificationObj, setCertificationObj] = useState({
        name: "",
        dateIssued: "",
        expiryDate: "", 
        details: ""
    }) 

    const [editCertificationObj, setEditCertificationObj] = useState({
        name: "",
        dateIssued: "",
        expiryDate: "", 
        details: ""
    }) 

    const schoolArr = Cookies.get("certificate")
    useEffect(() => {
        if(Cookies.get("certificate")){
            const schoolStringArr = Cookies.get("certificate")
            const actualArr = JSON.parse(schoolStringArr)
            setShowEduArr(actualArr)
        }
    }, [schoolArr])

    const certificationHandler = (event) => {
        event.preventDefault()

        if(!certificationObj.name.trim() || !certificationObj.dateIssued.trim() || !certificationObj.details.trim()){
            setSchoolError("All fields in this form except \"Date Expire\" are required!")
            }else{
                if(!Cookies.get("certificate")){
                    const genericArray = []
                    genericArray.push({
                        name: certificationObj.name.trim(), 
                        dateIssued: certificationObj.dateIssued.trim(), 
                        expiryDate: certificationObj.expiryDate.trim() || "Lifetime Certificate", 
                        details: certificationObj.details.trim()
                    })
                    Cookies.set("certificate", JSON.stringify(genericArray), {expires: 90})
                }else{
                    const storedStringArray = Cookies.get("certificate")
                    const storedActualArray = JSON.parse(storedStringArray)
                    storedActualArray.push({
                        name: certificationObj.name.trim(), 
                        dateIssued: certificationObj.dateIssued.trim(), 
                        expiryDate: certificationObj.expiryDate.trim() || "Lifetime Certificate", 
                        details: certificationObj.details.trim()
                    })
                    Cookies.set("certificate", JSON.stringify(storedActualArray), {expires: 90})
                }
                setSchoolError("")
                certificationObj.name = ""
                certificationObj.dateIssued = ""
                certificationObj.expiryDate = ""
                certificationObj.details = ""
                setSchoolSuccess("Certificate/Licence Information Saved Successfully!")
                setTimeout(() => {
                    setSchoolSuccess(false)
                }, 6000)
        }
    }

    const [objToBeEditedIndex, setObjToBeEditedIndex] = useState(null) 
    const submitEditedEducation = (event) => {
        event.preventDefault()
        const storedStringArray = Cookies.get("certificate")
        const storedActualArray = JSON.parse(storedStringArray)
        storedActualArray[objToBeEditedIndex] = {
            name: editCertificationObj.name,
            dateIssued: editCertificationObj.dateIssued,
            expiryDate: editCertificationObj.expiryDate,
            details: editCertificationObj.details
        }
        Cookies.set("certificate", JSON.stringify(storedActualArray), {expires: 90})
        setUpdateEducation(false)
    }

    const editEducation = (index) => {
        setObjToBeEditedIndex(index)
        setUpdateEducation(true)
        const storedStringArray = Cookies.get("certificate")
        const storedActualArray = JSON.parse(storedStringArray)
        const filteredArr = storedActualArray.filter((obj, i, array) => array[i] === array[index])
        setEditCertificationObj(filteredArr[0])
    }
        
    const deleteEducation = (index) => {
        const storedStringArray = Cookies.get("certificate")
        const storedActualArray = JSON.parse(storedStringArray)
        const filteredArr = storedActualArray.filter((obj, i, array) => array[i] !== array[index])
        Cookies.set("certificate", JSON.stringify(filteredArr), {expires: 90})
        setShowEduArr(filteredArr)
    }

  return (
    <div>
        {Cookies.get("certificate") && showEduArr.length > 0 && showEduArr.map((schoolObj, index) => {
                    return(
                        <div key={index} className='shown-experience'>
                            
                            <div className='company-name-action-buttons'>
                                <strong>{schoolObj.name}</strong>
                                <span className="action-buttons">
                                    <FaEdit className='btn-action' onClick={() => editEducation(index)}/>
                                    <MdDelete className='btn-action' onClick={() => deleteEducation(index)}/>
                                </span>
                            </div>
                            <p>Date Issued: {Number(schoolObj.dateIssued.split("-")[2])} {((schoolObj.dateIssued.split("-")[1] === "01") && "January") || 
                                     ((schoolObj.dateIssued.split("-")[1] === "02") && "February") || 
                                     ((schoolObj.dateIssued.split("-")[1] === "03") && "March") || 
                                     ((schoolObj.dateIssued.split("-")[1] === "04") && "April") ||
                                     ((schoolObj.dateIssued.split("-")[1] === "05") && "May") ||
                                     ((schoolObj.dateIssued.split("-")[1] === "06") && "June") || 
                                     ((schoolObj.dateIssued.split("-")[1] === "07") && "July") ||
                                     ((schoolObj.dateIssued.split("-")[1] === "08") && "August") ||
                                     ((schoolObj.dateIssued.split("-")[1] === "09") && "September") || 
                                     ((schoolObj.dateIssued.split("-")[1] === "10") && "October") ||
                                     ((schoolObj.dateIssued.split("-")[1] === "11") && "November") ||
                                     ((schoolObj.dateIssued.split("-")[1] === "12") && "December")} {schoolObj.dateIssued.split("-")[0]}<br/>Date Expire: {(schoolObj.expiryDate !== "Lifetime Certificate") && Number(schoolObj.expiryDate.split("-")[2])} {
                                     ((schoolObj.expiryDate.split("-")[1] === "01") && "January") ||
                                     ((schoolObj.expiryDate.split("-")[1] === "02") && "February") || 
                                     ((schoolObj.expiryDate.split("-")[1] === "03") && "March") || 
                                     ((schoolObj.expiryDate.split("-")[1] === "04") && "April") ||
                                     ((schoolObj.expiryDate.split("-")[1] === "05") && "May") ||
                                     ((schoolObj.expiryDate.split("-")[1] === "06") && "June") || 
                                     ((schoolObj.expiryDate.split("-")[1] === "07") && "July") ||
                                     ((schoolObj.expiryDate.split("-")[1] === "08") && "August") ||
                                     ((schoolObj.expiryDate.split("-")[1] === "09") && "September") || 
                                     ((schoolObj.expiryDate.split("-")[1] === "10") && "October") ||
                                     ((schoolObj.expiryDate.split("-")[1] === "11") && "November") ||
                                     ((schoolObj.expiryDate.split("-")[1] === "12") && "December")
                                    } {schoolObj.expiryDate.split("-")[0]}</p>
                            <p>{schoolObj.details}</p>
                        </div>
                    )
                })}

        {/* EDIT CERTIFICATION FORM */}
        {updateEducation && 
        <form onSubmit={submitEditedEducation} className="edit-work-exp">
            <div className="inner">
                <h2 style={{marginTop: "-0.5em", textAlign: "center"}}>Edit Certificates/Licences</h2>
                {/* {workExperienceError ? <small style={{margin: "-6px", color: "red", textAlign: "center"}}>{workExperienceError}</small> : <></>} */}
                <input value={editCertificationObj.name} onChange={event => setEditCertificationObj({...editCertificationObj, name: event.target.value})} required pattern='^\S+(?: \S+)*$' title='Please enter text without leading or trailing spaces' type="text" placeholder="Certificate Name"/>
                <label>Date Issued</label>
                <input value={editCertificationObj.dateIssued} onChange={event => setEditCertificationObj({...editCertificationObj, dateIssued: event.target.value})} required className='input-date' type="date" />
                <label>Date Expire</label>
                <input value={editCertificationObj.expiryDate} onChange={event => setEditCertificationObj({...editCertificationObj, expiryDate: event.target.value})} className='input-date' type="date" />
                <TextareaAutosize value={editCertificationObj.details} onChange={event => setEditCertificationObj({...editCertificationObj, details: event.target.value})} minRows={4} maxRows={6} required pattern='^\S+(?: \S+)*$' title='Please enter text without leading or trailing spaces' className='autoSizeTextArea' type='text' placeholder='Give details about the certificate/licence'/>
                <div className="edit-work-experience-btns">
                    <button type="submit">Save Info</button>
                    <button style={{backgroundColor: "red"}} onClick={() => {
                        setUpdateEducation(false)
                    }}>Dismiss</button>
                </div>
            </div>
        </form>}

        {/* CERTIFICATION FORM */}
        <form onSubmit={certificationHandler} className="personal-form">
        <h2 style={{marginTop: "-0.5em", textAlign: "center"}}>Certificates/Licences</h2>
        {schoolError ? <small style={{margin: "-6px", color: "red", textAlign: "center"}}>{schoolError}</small> : <></>}
        {schoolSuccess ? <small style={{margin: "-6px", color: "green", textAlign: "center"}}>{schoolSuccess}</small> : <></>}
        <input value={certificationObj.name} onChange={event => setCertificationObj({...certificationObj, name: event.target.value})} required pattern='^\S+(?: \S+)*$' title='Please enter text without leading or trailing spaces' type="text" placeholder="Certificate Name"/>
        <label>Date Issued</label>
        <input value={certificationObj.dateIssued} onChange={event => setCertificationObj({...certificationObj, dateIssued: event.target.value})} required className='input-date' type="date" />
        <label>Date Expire (optional)</label>
        <input value={certificationObj.expiryDate} onChange={event => setCertificationObj({...certificationObj, expiryDate: event.target.value})} className='input-date' type="date" />
        <TextareaAutosize value={certificationObj.details} onChange={event => setCertificationObj({...certificationObj, details: event.target.value})} minRows={4} maxRows={6} required pattern='^\S+(?: \S+)*$' title='Please enter text without leading or trailing spaces' className='autoSizeTextArea' type='text' placeholder='Give details about the certificate/licence'/>
        <button type="submit">Save Info</button>
        </form>
        <br />
    </div>
  )
}

export default Certifications