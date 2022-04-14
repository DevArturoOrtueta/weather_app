import React, {useState, useEffect} from 'react';



function App() {

  const [data, setData] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/weather?lat=8&lon=-80&appid=${process.env.REACT_APP_API_KEY}`);
      const data = await response.json();
      setData(data);
      console.log(data);
    }
    getData();
  }, [])
  
  return (
    
     <>
      <h1>{data.name}</h1>
     </>
    
  );
}

export default App;
