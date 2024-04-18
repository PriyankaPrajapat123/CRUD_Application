import './App.css';
import React, { useState, useEffect } from 'react';
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import Form from './Componens/Form';
const postData = async (newData) => {
  console.log(newData);
  const data = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify(newData),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
  const jsonData = await data.json();
  console.log(jsonData)
  return jsonData;
}


function App() {
  const [title, setTitle] = useState('');
  const [desc, setBody] = useState('');
  const [data, setData] = useState(null);
  const [cancleButton, setCancleBtton] = useState(false);
  const [addButton, setAddButton] = useState(true);
  const [editButton, setEditButton] = useState(false);
  const [userId, setUserId] = useState(null)
  //fetch api
  async function fetchDataAndSetData() {
    const data = await fetch('https://jsonplaceholder.typicode.com/posts')
    const json = await data.json();
    setData(json);
  }
  useEffect(() => {
    fetchDataAndSetData();
  }, []);
  
  //add new data .............................................
  const addNewData = async () => {

    const newData = { title: title, body: desc, id: data.length + 1 };
    // Change this to your desired new data
    if (newData.title.length <= 0 || newData.body.length <= 0) {
      alert("please fill the detail")
    }
    else {
      const addedData = await postData(newData);
      setData([newData, ...data]);
      console.log(data)
      setTitle('');
      setBody('')
    }
  };
  //select item........
  function selectUser(title, desc, id) {
    setTitle(title);
    setBody(desc);
    setUserId(id)
    setAddButton(false);
    setEditButton(true);
    setCancleBtton(true);
  }
  //delete item...............................
  const handleDelete = (taskId) => {
    const updatedTasks = data.filter(task => task.id !== taskId);
    setData(updatedTasks);
  };
  //cancle  button.............................  
  const handleCancle = () => {
    setCancleBtton(false);
    setAddButton(true);
    setEditButton(false);
    setTitle('');
    setBody('')
  }
  async function handleEdit() {
    let newdata = { title: title, desc: desc };
    /* const data1 = await fetch(`https://jsonplaceholder.typicode.com/posts/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(newdata),
      headers: {
          'Content-type': 'application/json; charset=UTF-8',
      },
  })*/
    //setData([data2,...data])

    data.map((item) => {
      if (item.id == userId) {
        item.title = newdata.title;
        item.body = newdata.desc;
      }
    })

    setCancleBtton(false);
    setAddButton(true);
    setEditButton(false);
    setTitle('');
    setBody('')

  }

  return (
    <div className='form'>
      {data ? (
        <>
        <form>
          <div className='inputBox'>

            <h1>TO-DO-LIST</h1>
            <div className='mt-2'>
              Title:<input
                type="text"
                name="title" value={title}
                onChange={(e) => { setTitle(e.target.value) }}
                placeholder="Enter new data" required
              /></div>
            <div className='mt-2'>
              Desc: <input
                type="text"
                name="body"
                value={desc}
                onChange={(e) => { setBody(e.target.value) }}
                placeholder="Enter new data" required
              />
            </div>
            {addButton ? <button type="button" onClick={addNewData} >Add</button> : null}
            {cancleButton ? <><button onClick={handleEdit}>Edit</button> <button onClick={handleCancle}>Cancle</button></> : null}
          </div></form>
          <div className='tableBox'>
            <table>
              <tr>
                <th>Sno.</th>
                <th>Title</th>
                <th>Body</th>
                <th>Action</th>
              </tr>
              {data.map((val, key) => {
                return (
                  <tr key={key} >
                    <td>{key + 1}</td>
                    <td>{val.title}</td>
                    <td>{val.body}</td>
                    <td><button onClick={() => selectUser(val.title, val.body, val.id)}><FaPencilAlt /></button>
                      <button onClick={() => handleDelete(val.id)}><FaTrash /></button></td>
                  </tr>
                )
              })}

            </table></div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>

  );
} export default App;
