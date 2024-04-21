import React, { useState } from 'react';
import './firebaseConfig'; 
import { getFirestore, addDoc, collection, getDocs } from "firebase/firestore";

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [question, setQuestion] = useState('');
  const [showDatabase, setShowDatabase] = React.useState(false);

  let [storedValues, setStoredValues] = useState([]);

  const db = getFirestore();

  const saveDataToFirestore = async () => {

    if (name.trim() === '' || email.trim() === '' || question.trim() === '') {
      alert('Please fill in all fields before sending.');
      return;
    }
    console.log('Saving data:', { name: name, email: email, question: question });
    setStoredValues([...storedValues, { name: name, email: email, question: question }]);
    setName('');
    setEmail('')
    setQuestion('');


    const docRef = await addDoc(collection(db, "myCollection"), {
      name: name,
      email: email,
      question: question,
    });
    alert("Document written to Database");
  };

  const fetchDataFromFirestore = async () => {
    setShowDatabase(true);
    const querySnapshot = await getDocs(collection(db, "myCollection"));
    const temporaryArr = [];
    querySnapshot.forEach((doc) => {
      temporaryArr.push(doc.data());
    });
    setStoredValues(temporaryArr);
  };

  return (

    <div className="App">
      <h1>Contact Form</h1>
      <div>
        <label>Name:</label>
        <input
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Question:</label>
        <textarea
          type="textarea"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
      </div>

      <button onClick={saveDataToFirestore}>Send</button> <br /><br />

      <button onClick={fetchDataFromFirestore}>Show Database</button> <br /><br />

      {showDatabase && (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Question</th>
            </tr>
          </thead>
          <tbody>
            {storedValues.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.question}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}



export default App;




