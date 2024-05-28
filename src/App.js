import './App.css';
import { EmployeeData } from './EmployeeData.js';
import { useEffect, useState } from 'react';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

function App() {

  const [data, setData] = useState([])
  const [FirstName, setFirstName] = useState('')
  const [LastName, setLastName] = useState('')
  const [Age, setAge] = useState(0)
  const [id, setId] = useState(0)
  const [isUpdated, setIsUpdated] = useState(false)
  const [query, setQuery] = useState("")

  useEffect(() => {
    setData(EmployeeData);
  }, []);

  const handleEdit = (id) => {

    const dt = data.filter((item) => item.id === id)
    console.log(dt)
    console.log("good morning")
    setIsUpdated(true)
    setId(id)
    setFirstName(dt[0].FirstName)
    setLastName(dt[0].LastName)
    setAge(dt[0].Age)
  }

  const handleDelete = (id) => {
    if (id > 0) {
      if (window.confirm('Are you sure you want to delete?')) {
        const dt = data.filter((item) => item.id !== id)
        console.log(dt.length)
        setData(dt)
      }
    }
  }

  const handleSave = () => {
    let error = ''

    if (FirstName === "") {
      error += 'First Name is required, '
    }
    if (LastName === "") {
      error += "last Name is required, "
    }
    if (Age <= 0) {
      error += "age is require"
    }
    if (error === "") {
      const newObject = {
        id: Math.floor((Math.random() * 100) + 2),
        FirstName,
        LastName,
        Age
      }
      const dt = [...data, newObject]
      // dt.push(newObject)
      setData(dt)
      handleClear()
    } else {
      alert(error)
    }
  }

  const handleUpdate = () => {
    const index = data.map((item) => {
      return item.id
    }).indexOf(id)

    const dt = [...data]
    dt[index].FirstName = FirstName
    dt[index].LastName = LastName
    dt[index].Age = Age
    handleClear();
  }

  const handleClear = () => {
    setFirstName('')
    setLastName('')
    setAge(0)
    setIsUpdated(false)
  }

  const handleDownload = () => {
    const doc = new jsPDF()
    autoTable(doc,{ html: '#table' })
    doc.save('data.pdf')
  }

  return (
    <div className="App">
      <div className='d-flex justify-content-center align-items-center mt-3 main'>
        <div>
          <lable>search:- </lable>
          <input type='text' placeholder='search...' className='search' onChange={(e) => setQuery(e.target.value)} />&nbsp;&nbsp;
        </div>
        <div>
          <lable>FirstName:- </lable>
          <input type='text' placeholder='enter First Name' onChange={(e) => setFirstName(e.target.value)} value={FirstName} />&nbsp;&nbsp;
        </div>
        <div>
          <lable>LastName:- </lable>
          <input type='text' placeholder='enter Last Name' onChange={(e) => setLastName(e.target.value)} value={LastName} />&nbsp;&nbsp;
        </div>
        <div>
          <lable>Age:- </lable>
          <input type='text' placeholder='enter Age' onChange={(e) => setAge(e.target.value)} value={Age} />&nbsp;&nbsp;
        </div>
        <div>
          {
            !isUpdated ? (<button className='btn btn-primary' onClick={() => handleSave()}>save</button>) : (<button className='btn btn-primary' onClick={() => handleUpdate()} >Update</button>)
          }
          <button className='btn btn-warning ms-3' onClick={() => handleClear()}>clear</button>
          <button className='btn btn-primary ms-3' onClick={() => handleDownload()}>download</button>
        </div>
      </div>

      <table className='table table-hover mt-3' id='table' border="1px solid black" width="100%">
        <thead>
          <tr>
            <th>Sr. No</th>
            <th>Id</th>
            <th>FirstName</th>
            <th>LastName</th>
            <th>Age</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            data.filter((employee) => employee.FirstName.toLowerCase().includes(query) || employee.LastName.toLowerCase().includes(query)).map((employee, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{employee.id}</td>
                  <td>{employee.FirstName}</td>
                  <td>{employee.LastName}</td>
                  <td>{employee.Age}</td>
                  <td>
                    <span className='hello' onClick={() => handleEdit(employee.id)}><i class="fa-solid fa-pen-to-square"></i></span>
                    {/* <button className='btn btn-primary' onClick={() => handleEdit(employee.id)} >Edit</button>&nbsp;&nbsp; */}
                    <span className='ms-4 hello' onClick={() => handleDelete(employee.id)} ><i class="fa-solid fa-trash"></i></span>
                    {/* <button className='btn btn-danger' onClick={() => handleDelete(employee.id)}>Delete</button> */}
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  );
}

export default App;
