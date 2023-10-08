import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function AddStudent() {
    const [userInput,setUserInput] = useState({
        name: '',
        dob:"",
        student_Class:"",
        division:"",
        gender:''
    })

    const [errors, setErrors] = useState({
        name: '',
        dob: '',
        student_Class: '',
        division: '',
        gender: ''
      });

    const [isLoading,setIsLoading] = useState(false)
    const [StudentData,setStudentData] = useState([])

   const handleSubmit = (e) =>{
    e.preventDefault();
    const validationErrors = validateInputs(userInput);
    if (Object.keys(validationErrors).length === 0) {
      console.log(userInput);
      axios.post("http://localhost:8080/student/create",userInput,{
        headers: {
            "Content-Type": "application/json",
          },
      }).then(()=>{
        setIsLoading(true)
        getStudentsData()
      }).catch((err)=>{
        console.log(err.response.data.message)
      })
    } else {
      // There are validation errors, update the state with the error messages
      setErrors(validationErrors);
    }
   }
  const sortByname = (data) => {
    const sortedStudents = data.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });
    setStudentData(sortedStudents);
  };
  const getStudentsData = ()=>{
    axios.get("http://localhost:8080/student/getAllStudents").then((res)=>{
        sortByname(res.data);
        setIsLoading(false)
    })
  }

  useEffect(()=>{
    setIsLoading(true)
    getStudentsData()
  },[])

  // Validation function
  const validateInputs = (data) => {
    const errors = {};

    // Validate name (required)
    if (!data.name.trim()) {
      errors.name = 'Name is required';
    }

    // Validate date of birth (required)
    if (!data.dob) {
      errors.dob = 'Date of birth is required';
    }

    // Validate class (required)
    if (!data.student_Class) {
      errors.student_Class = 'Class is required';
    }

    if(data.student_Class == '-1'){
        errors.student_Class = 'Class is required';
    }

    // Validate division (required)
    if (!data.division) {
      errors.division = 'Division is required';
    }
    if(data.division == '-1'){
        errors.division = 'Division is required';
    }

    // Validate gender (required)
    if (!data.gender) {
      errors.gender = 'Gender is required';
    }

    return errors;
  };
 
     //handle field changes
  const handleChange = (input) => (e) => {
    setUserInput({ ...userInput, [input]: e.target.value });
    // Clear the error message when the user starts typing
    setErrors({ ...errors, [input]: '' });
  };

  return (
    <div>
        
      <div className="container">
        <h1>Add Student</h1>
        <br/>
        <form onSubmit={handleSubmit} >
            <div className='row'>
            <div className='col'>
            <label htmlFor="name" className="form-label">Full Name</label>
            <input type="text" id="name" className={`form-control ${errors.name ? 'is-invalid':""}`} name='name' 
            onChange={handleChange("name")} 
            onKeyDown={(e) => {
                const validCharacters = /^[A-Za-z \s]*$/;
                if (!validCharacters.test(e.key)) {
                  e.preventDefault();
                  // here it checks if the input value contains only letters and spaces
                }
              }}
            />
            {errors.name &&
            <div id="validationServerUsernameFeedback" className="invalid-feedback">
                {errors.name}
             </div>
            }
            </div>
            <div className='col'>
            <label htmlFor="dob" className="form-label">Date of birth</label>
            <input type="date" id="dob" className={`form-control ${errors.dob ? 'is-invalid':""}`} name='dob' onChange={handleChange("dob")}/>
            {errors.dob &&
            <div id="validationServerUsernameFeedback" className="invalid-feedback">
                {errors.dob}
             </div>
            }
            </div>
            </div>
            <div className='row'>
            <div className='col'>
            <label htmlFor="student_Class" className="form-label">Class</label>
            <select className={`form-select ${errors.student_Class ? 'is-invalid':""}`} onChange={handleChange("student_Class")} id='student_Class'>
                <option value="-1">Choose a Class</option>
                <option value="I">I</option>
                <option value="II">II</option>
                <option value="III">III</option>
                <option value="IV">IV</option>
                <option value="V">v</option>
                <option value="VI">VI</option>
                <option value="VII">VII</option>
                <option value="VIII">VIII</option>
                <option value="IX">IX</option>
                <option value="X">X</option>
                <option value="X11">X11</option>
                <option value="X12">X12</option>
            </select>
            {errors.student_Class &&
            <div  className="invalid-feedback">
                {errors.student_Class}
             </div>
            }
            </div>
            
            <div className='col'>
            <label htmlFor="division" className="form-label">Division</label>
            <select className={`form-select ${errors.division ? 'is-invalid':""}`} onChange={handleChange("division")} id='division'>
                <option value="-1">Choose a Division</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
            </select>
            {errors.division &&
            <div  className="invalid-feedback">
                {errors.division}
             </div>
            }
            </div>
            </div>
            <div className="row mt-3">
            <div className='col'>
            <p>Gender</p>
            <div className="form-check form-check-inline">
                <input className={`form-check-input ${errors.gender ? 'is-invalid':""}`} type="radio"  name="gender" id="gendermale" onChange={handleChange("gender")}
                value="Male"
                checked={userInput.gender === "Male"}/>
                <label className="form-check-label" htmlFor="gendermale">
                    Male
                </label>
                </div>
                <div className="form-check form-check-inline">
                <input className={`form-check-input ${errors.gender ? 'is-invalid':""}`} type="radio" name="gender" id="genderfemale" onChange={handleChange("gender")}
                value="Female"
                checked={userInput.gender === "Female"}/>
                <label className="form-check-label" htmlFor="genderfemale">
                    Female
                </label>
                </div>
                <div className="form-check form-check-inline">
                <input className={`form-check-input ${errors.gender ? 'is-invalid':""}`} type="radio" name="gender" id="genderOthers" onChange={handleChange("gender")}
                value="Others"
                checked={userInput.gender === "Others"}/>
                <label className="form-check-label" htmlFor="genderOthers">
                    Others
                </label>
                
                </div>
            </div>
            
            <div className='col mt-3'>
                <button  className="btn btn-primary float-end" type='submit'>Add Student</button>
            </div>
            </div>
        </form>
        </div>
        {!isLoading ? <>
        <div className='container mt-5 table-reponsive'>
          <table className='table table-hover w-100'>
            <thead>
              <tr>
              <th>Sl. no</th>
              <td>Student Id</td>
              <th>Full Name</th>
              <th>Date of birth</th>
              <th>Class</th>
              <th>Division</th>
              <th>Gender</th>
            </tr>
            </thead>
            <tbody>
            {StudentData.length == 0 ?
            <tr>
            <td colSpan={6} className='text-center'>No Data available</td>
            </tr>
            :
            StudentData.map((data,index)=>(
              <tr key={data.id}>
                <td>{index+1}</td>
                <td>{data.student_id}</td>
                <td>{data.name}</td>
                <td>{data.dob}</td>
                <td>{data.student_Class}</td>
                <td>{data.division}</td>
                <td>{data.gender}</td>
              </tr>
            ))
            }
            </tbody>
          </table>
        </div>
        </>
        : <div className='text-center'>Loading....</div>}
    </div>
  )
}
