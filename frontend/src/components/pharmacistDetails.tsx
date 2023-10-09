const PharmacistDetails = ({ pharmacist }) => {

    return (
      <div className="workout-details">
        <p><strong>name : </strong>{pharmacist.name}</p>
        <p><strong>Email : </strong>{pharmacist.email}</p>
        <p><strong>Username : </strong>{pharmacist.username}</p>
        <p><strong>Password : </strong>{pharmacist.password}</p>
        <p><strong>Date of Birth : </strong>{pharmacist.dateOfBirth}</p>
        <p><strong>Hourly Rate : </strong>{pharmacist.hourlyRate}</p>
        <p><strong>Affiliation : </strong>{pharmacist.affilation}</p>
        <p><strong>Status : </strong>{pharmacist.status}</p>
        <p><strong>Major : </strong>{pharmacist.educationalBackground.major}</p>
        <p><strong>University : </strong>{pharmacist.educationalBackground.university}</p>
        <p><strong>Graduation Year : </strong>{pharmacist.educationalBackground.graduationYear}</p>
        <p><strong>Degree : </strong>{pharmacist.educationalBackground.degree}</p>
        
        <p> <strong>Applied at :</strong>{pharmacist.createdAt}</p>

      </div>
    )
  }
  
  export default PharmacistDetails



  