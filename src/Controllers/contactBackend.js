
const previewResumeFrontend = async (certificate, city, country, email, firstName, intro, languages, lastName, links, phone, profession, province, publications, school, skill, suburb, WorkExperience, zipCode) => {
    //https://resume-generator-backend-e1tk.onrender.com
    const response = await fetch("https://resume-generator-backend-e1tk.onrender.com/generate-file", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({certificate, city, country, email, firstName, intro, languages, lastName, links, phone, profession, province, publications, school, skill, suburb, WorkExperience, zipCode})
    })
    const data = await response.json()
    if(!response.ok){
        throw Error(data.error)
    }
    return data
}

export {previewResumeFrontend}