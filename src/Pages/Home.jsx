import React, { useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import Cookies from "js-cookie"

const Home = () => {

    const [personalInfoError, setPersonalInfoError] = useState(false)
    const [personalInfoSuccess, setPersonalInfoSuccess] = useState(false)

    const [formObj, setFormObj] = useState({
        firstName: Cookies.get("firstName") || "",
        lastName: Cookies.get("lastName")  || "",
        Profession: Cookies.get("profession")  || "",
        Country: Cookies.get("country")  || "",
        Province: Cookies.get("province")  || "",
        City: Cookies.get("city")  || "",
        Suburb: Cookies.get("suburb")  || "",
        ZipCode: Cookies.get("zipCode")  || "",
        Email: Cookies.get("email")  || "",
        Phone: Cookies.get("phone")  || "",
        intro: Cookies.get("intro")  || ""
    })

    const personalFormHandler = (event) => {
        event.preventDefault()

        if(!formObj.firstName.trim() || !formObj.lastName.trim() || !formObj.Profession.trim() || !formObj.Country.trim() || !formObj.Province.trim() ||
           !formObj.City.trim() || !formObj.Suburb.trim() || !formObj.ZipCode.trim() || !formObj.Email.trim() || !formObj.Phone.trim() || !formObj.intro.trim()){
            setPersonalInfoError("All fields in this form are required!")
        }else{
            Cookies.set("firstName", formObj.firstName.trim(), {expires: 90})
            Cookies.set("lastName", formObj.lastName.trim(), {expires: 90})
            Cookies.set("profession", formObj.Profession.trim(), {expires: 90})
            Cookies.set("country", formObj.Country.trim(), {expires: 90})
            Cookies.set("province", formObj.Province.trim(), {expires: 90})
            Cookies.set("city", formObj.City.trim(), {expires: 90})
            Cookies.set("suburb", formObj.Suburb.trim(), {expires: 90})
            Cookies.set("zipCode", formObj.ZipCode.trim(), {expires: 90})
            Cookies.set("email", formObj.Email.trim(), {expires: 90})
            Cookies.set("phone", formObj.Phone.trim(), {expires: 90})
            Cookies.set("intro", formObj.intro.trim(), {expires: 90})
            setPersonalInfoError("")
            setPersonalInfoSuccess("Personal Information Saved Successfully!")
            setTimeout(() => {
                setPersonalInfoSuccess(false)
            }, 5000)
        }
    }

  return (
    <div>
        {/* PERSONAL FORM */}
        <form onSubmit={personalFormHandler} className="personal-form">
        <h2 style={{marginTop: "-0.5em", textAlign: "center"}}>Personal Information</h2>
        {personalInfoError ? <small style={{margin: "-6px", color: "red", textAlign: "center"}}>{personalInfoError}</small> : <></>}
        {personalInfoSuccess ? <small style={{margin: "-6px", color: "green", textAlign: "center"}}>{personalInfoSuccess}</small> : <></>}
        <input required pattern='^\S+(?: \S+)*\s?$' title='Please enter text without leading or trailing spaces' value={formObj.firstName} onChange={event => setFormObj({...formObj, firstName: event.target.value})} type="text" placeholder="First Name(s)" autoFocus/>
        <input required pattern='^\S+(?: \S+)*\s?$' title='Please enter text without leading or trailing spaces' value={formObj.lastName} onChange={event => setFormObj({...formObj, lastName: event.target.value})} type="text" placeholder="Family Name"/>
        <input required pattern='^\S+(?: \S+)*\s?$' title='Please enter text without leading or trailing spaces' value={formObj.Profession} onChange={event => setFormObj({...formObj, Profession: event.target.value})} type="text" placeholder="Profession"/>
        <input required pattern='^\S+(?: \S+)*\s?$' title='Please enter text without leading or trailing spaces' value={formObj.Country} onChange={event => setFormObj({...formObj, Country: event.target.value})} type="text" placeholder="Country"/>
        <input required pattern='^\S+(?: \S+)*\s?$' title='Please enter text without leading or trailing spaces' value={formObj.Province} onChange={event => setFormObj({...formObj, Province: event.target.value})} type="text" placeholder="Province/State"/>
        <input required pattern='^\S+(?: \S+)*\s?$' title='Please enter text without leading or trailing spaces' value={formObj.City} onChange={event => setFormObj({...formObj, City: event.target.value})} type="text" placeholder="City"/>
        <input required pattern='^\S+(?: \S+)*\s?$' title='Please enter text without leading or trailing spaces' value={formObj.Suburb} onChange={event => setFormObj({...formObj, Suburb: event.target.value})} type="text" placeholder="Suburb"/>
        <input required pattern='^\S+(?: \S+)*\s?$' title='Please enter text without leading or trailing spaces' value={formObj.ZipCode} onChange={event => setFormObj({...formObj, ZipCode: event.target.value})} type="text" placeholder="Zip Code"/>
        <input required pattern='^\S+(?: \S+)*\s?$' title='Please enter text without leading or trailing spaces' value={formObj.Email} onChange={event => setFormObj({...formObj, Email: event.target.value})} type="email" placeholder="Email"/>
        <input required pattern='^\S+(?: \S+)*\s?$' title='Please enter text without leading or trailing spaces' value={formObj.Phone} onChange={event => setFormObj({...formObj, Phone: event.target.value})} type="tel" placeholder="Phone"/>
        <TextareaAutosize minRows={4} maxRows={6} required pattern='^\S+(?: \S+)*\s?$' title='Please enter text without leading or trailing spaces' value={formObj.intro} onChange={event => setFormObj({...formObj, intro: event.target.value})} className='autoSizeTextArea' type='text' placeholder='Quick Intro'/>
        <button type="submit">Save Info</button>
        </form>
        <br />
    </div>
  )
}

export default Home