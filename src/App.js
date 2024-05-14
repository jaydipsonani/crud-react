import logo from './logo.svg';
import './App.css';
import { EmployeeData } from './EmployeeData.js';
import { useEffect, useState } from 'react';

function App() {

  const [data, setData] = useState([])
  const [FirstName, setFirstName] = useState('')
  const [LastName, setLastName] = useState('')
  const [Age, setAge] = useState(0)
  const [id, setId] = useState(0)
  const [isUpdated, setIsUpdated] = useState(false)

  useEffect(() => {
    setData(EmployeeData);
  }, []);

  const handleEdit = (id) => {
    // alert(id)
    const dt = data.filter((item) => item.id === id)
    console.log(dt)
    // if (dt !== undefined) {
      setIsUpdated(true)
      setId(id);
      setFirstName(dt[0].FirstName)
      setLastName(dt[0].LastName)
      setAge(dt[0].Age)
    // }
  }

  const handleDelete = (id) => {
    if (id > 0) {
      if (window.confirm('Are you sure you want to delete?')) {
        const dt = data.filter((item) => item.id !== id)
        console.log(dt.length)
        setData(dt)
      }
    }

    // alert(id)
  }

  const handleSave = () => {
    let error = ''

    if(FirstName === "")
      {
        error += 'First Name is required, '
      }
    if(LastName === "")
      {
        error += "last Name is required, "
      }
    if(Age <=0)
      {
        error += "age is require"
      }
    if(error ===""){
      const dt = [...data]
      const newObject = {
        id: Math.floor((Math.random() * 100) + 1),
        FirstName: FirstName,
        LastName: LastName,
        Age: Age
      }
      dt.push(newObject)
      setData(dt)
      handleClear()
    }else
    {
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


  return (
    <div className="App">
      <div className='d-flex justify-content-center align-items-center mt-3'>
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
          !isUpdated ? (<button className='btn btn-primary' onClick={() => handleSave()}>save</button>):( <button className='btn btn-primary' onClick={() => handleUpdate()} >Update</button>) 
        }
          <button className='btn btn-warning ms-3' onClick={() => handleClear()}>clear</button>
        </div>
      </div>

      <table className='table table-hover mt-3' border="1px solid black" width="100%">
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
            data.map((employee, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{employee.id}</td>
                  <td>{employee.FirstName}</td>
                  <td>{employee.LastName}</td>
                  <td>{employee.Age}</td>
                  <td>
                    <button className='btn btn-primary' onClick={() => handleEdit(employee.id)} >Edit</button>&nbsp;&nbsp;
                    
                    <button className='btn btn-danger' onClick={() => handleDelete(employee.id)}>Delete</button>
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
