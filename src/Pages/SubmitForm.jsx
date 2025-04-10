import React, { useState } from 'react'
import Cookies from "js-cookie"
import {BsFileEarmarkPdfFill} from "react-icons/bs"
import { previewResumeFrontend } from '../Controllers/contactBackend'
import download from "js-file-download"

const SubmitForm = () => {

    const [error, setError] = useState(false)
    const [pdfUrl, setPdfUrl] = useState(false)
    const [loading, setLoading] = useState(false)
    
    const previewResume = async () => {
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
                setError("")
                const response = await previewResumeFrontend(certificate, city, country, email, firstName, intro, languages, lastName, links, phone, profession, province, publications, school, skill, suburb, WorkExperience, zipCode)
                if(response.success){
                    //window.open("http://localhost:8000/display-file", "_blank")
                    setPdfUrl("https://resume-generator-backend-e1tk.onrender.com/display-file")
                }
                if(response.fileName){
                    console.log(response.fileName)
                    Cookies.set("ActualFile", response.fileName, {expires: 90})
                }
                setLoading("")
            }
        } catch (error) {
            setLoading("")
            setError(error)
        }
    }

    const downloadResume = async () => {
        setLoading("Please Wait...")
        try {
            const fileName = Cookies.get("ActualFile")
            if(!fileName){
                setLoading("")
                setError("Please Generate & View Resume First!")
            }else{
                const response = await fetch(`https://resume-generator-backend-e1tk.onrender.com/download?file=${fileName}`)
                const blob = await response.blob()
                download(blob, fileName)
                setLoading("")
            }
        } catch (error) {
            setLoading("")
            setError(error.message)
        }
    }

  return (
    <div>
        <div style={{display: "flex", flexDirection: "column", marginBottom: "1em"}}>
            {loading && <small style={{color: "black", textAlign: "center"}}>{loading}</small>}
            {error ? <small style={{color: "red", textAlign: "center"}}>{error}</small> : <></>}
            {pdfUrl && <iframe className='edit-work-exp' src={`https://docs.google.com/gview?url=${pdfUrl}&embedded=true`} title='view-pdf' height={500} width="100%"></iframe>}
            {pdfUrl && <button onClick={() => setPdfUrl(false)} className='dismiss-pdf'>X</button>}
            <div>
                <button onClick={downloadResume}>Download PDF <BsFileEarmarkPdfFill/></button>
                <button onClick={previewResume} style={{backgroundColor: "maroon"}}>Generate & View</button>
            </div>
        </div>
    </div>
  )
}

export default SubmitForm