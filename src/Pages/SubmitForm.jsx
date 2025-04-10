import React, { useState } from 'react'
import Cookies from "js-cookie"
import {BsFileEarmarkPdfFill} from "react-icons/bs"
import { previewResumeFrontend } from '../Controllers/contactBackend'
import download from "js-file-download"

const SubmitForm = () => {

    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    
    const downloadResume = async () => {
        setError("")
        setLoading("Please Wait...")
        const certificate = Cookies.get("certificate")
        const city = Cookies.get("city")
        const country = Cookies.get("country")
        const email = Cookies.get("email")
        const firstName = Cookies.get("firstName")
        const intro = Cookies.get("intro")
        const languages = Cookies.get("languages")
        const lastName = Cookies.get("lastName")
        const links = Cookies.get("links")
        const phone = Cookies.get("phone")
        const profession = Cookies.get("profession")
        const province = Cookies.get("province")
        const publications = Cookies.get("publications")
        const school = Cookies.get("school")
        const skill = Cookies.get("skill")
        const suburb = Cookies.get("suburb")
        const WorkExperience = Cookies.get("WorkExperience")
        const zipCode = Cookies.get("zipCode")
        try {
            if(!firstName || !lastName || !email || !phone || !profession || !country || !city || !province || !suburb || !zipCode){
                setLoading("")
                setError("To generate a simple resume you need a minimum of FirstName, LastName, Email, Phone, Profession, Country, Province/State, City, Suburb and ZipCode")
            }else{
                const response = await previewResumeFrontend(certificate, city, country, email, firstName, intro, languages, lastName, links, phone, profession, province, publications, school, skill, suburb, WorkExperience, zipCode)
                if(response.fileName){
                    const res = await fetch(`https://resume-generator-backend-e1tk.onrender.com/download?file=${response.fileName}`)
                    const blob = await res.blob()
                    download(blob, response.fileName)
                    setLoading("")

                    setSuccess("File Downloaded Successfully")
                    setTimeout(() => {
                        setSuccess("")
                    }, 6000)
                }
            }
        } catch (error) {
            setLoading("")
            setError(error.message)
        }
    }

  return (
    <div>
        <div style={{display: "flex", flexDirection: "column", marginBottom: "1em"}}>
            {loading && <p style={{color: "black", paddingLeft: "0.5em"}}>{loading}</p>}
            {success && <p style={{color: "green", paddingLeft: "0.5em"}}>{success}</p>}
            {error && <p style={{color: "red", paddingLeft: "0.5em"}}>{error}</p>}
            <button onClick={downloadResume}>Download PDF <BsFileEarmarkPdfFill/></button>
        </div>
    </div>
  )
}

export default SubmitForm