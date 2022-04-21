import React, {useState, useEffect} from 'react';





function App() {

  const [data, setData] = useState([]);
  const [lat, getLat] = useState(0);
  const [lon, getLon] = useState(0);
  const [direction, setDirections] = useState('');
  const [loading, setLoading] = useState(false);
  
  
    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else { 
        console.log("Geolocation is not supported by this browser.");
      }
    }

    function showPosition(position) {
      getLat(position.coords.latitude);
      getLon(position.coords.longitude);
    }
    
  useEffect(() => {

    

    async function getData() {
      
      const response = await fetch(`${process.env.REACT_APP_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}&units=metric`);
      const data = await response.json();
      setData(data);
      setLoading(true);
      console.log(data);
    }

    async function getDirection(data){

      if(data.wind.deg >= 348.75 && data.wind.deg <= 360 || data.wind.deg >= 0 && data.wind.deg <= 11.25){
        return setDirections("N");
      }else if(data.wind.deg >= 11.25 && data.wind.deg <= 33.75){
        return setDirections("NNE");
      }else if(data.wind.deg >= 33.75 && data.wind.deg <= 56.25){
        return setDirections("NE");
      }else if(data.wind.deg >= 56.25 && data.wind.deg <= 78.75){
        return setDirections("ENE");
      }else if(data.wind.deg >= 78.75 && data.wind.deg <= 101.25){
        return setDirections("E");
      }else if(data.wind.deg >= 101.25 && data.wind.deg <= 123.75){
        return setDirections("ESE");
      }else if(data.wind.deg >= 123.75 && data.wind.deg <= 146.25){
        return setDirections("SE");
      }else if(data.wind.deg >= 146.25 && data.wind.deg <= 168.75){
        return setDirections("SSE");
      }else if(data.wind.deg >= 168.75 && data.wind.deg <= 191.25){
        return setDirections("S");
      }else if(data.wind.deg >= 191.25 && data.wind.deg <= 213.75){
        return setDirections("SSW");
      }else if(data.wind.deg >= 213.75 && data.wind.deg <= 236.25){
        return setDirections("SW");
      }else if(data.wind.deg >= 236.25 && data.wind.deg <= 258.75){
        return setDirections("WSW");
      }else if(data.wind.deg >= 258.75 && data.wind.deg <= 281.25){
        return setDirections("W");
      }else if(data.wind.deg >= 281.25 && data.wind.deg <= 303.75){
        return setDirections("WNW");
      }else if(data.wind.deg >= 303.75 && data.wind.deg <= 326.25){
        return setDirections("NW");
      }else if(data.wind.deg >= 326.25 && data.wind.deg <= 348.75){
        return setDirections("NNW");
      }else{
        return 'No data'
      }
    }

    

    
    getLocation();
    getData();
    getDirection(data);
    
  }, [loading]);

  
  const BodyItem = () => {
    return (
      <div className='container'>
      <h1>{data.sys.country + ', ' + data.name}</h1>
      <div className='data-panel'>
        <img src={`http://openweathermap.org/img/w/`+ data.weather[0].icon + ".png"} alt="Image"></img>
        <p>{data.weather[0]?.description}</p>
        <p className='temp-text'>{(data.main.temp).toFixed(0) + ' °C'}</p>
      </div>

      <div className='wind-panel'>
          <label>Wind</label>
          <div className='wind-data-panel'>
            <div className='wind-speed-panel'>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.38 8.57L19.15 10.42C19.7432 11.6031 20.0336 12.9148 19.9952 14.2377C19.9568 15.5606 19.5908 16.8533 18.93 18H5.06999C4.21116 16.5101 3.85528 14.7831 4.05513 13.0751C4.25497 11.367 4.9999 9.76882 6.17947 8.51743C7.35904 7.26603 8.91046 6.42804 10.6037 6.1277C12.297 5.82735 14.042 6.08063 15.58 6.85L17.43 5.62C15.5465 4.41222 13.3123 3.871 11.0849 4.08294C8.85744 4.29487 6.76543 5.2477 5.14348 6.78901C3.52153 8.33033 2.46335 10.3711 2.13821 12.5848C1.81306 14.7986 2.23974 17.0574 3.34999 19C3.5245 19.3023 3.77508 19.5536 4.07682 19.7291C4.37856 19.9045 4.72096 19.9979 5.06999 20H18.92C19.2724 20.0014 19.6189 19.9096 19.9245 19.734C20.2301 19.5584 20.4838 19.3052 20.66 19C21.5814 17.4039 22.0438 15.5843 21.9961 13.742C21.9485 11.8996 21.3926 10.1063 20.39 8.56L20.38 8.57Z" fill="black"/>
                <path d="M10.59 15.41C10.7757 15.596 10.9963 15.7435 11.2391 15.8441C11.4819 15.9448 11.7422 15.9966 12.005 15.9966C12.2678 15.9966 12.5281 15.9448 12.7709 15.8441C13.0137 15.7435 13.2342 15.596 13.42 15.41L19.08 6.92001L10.59 12.58C10.404 12.7658 10.2565 12.9863 10.1559 13.2291C10.0552 13.4719 10.0034 13.7322 10.0034 13.995C10.0034 14.2578 10.0552 14.5181 10.1559 14.7609C10.2565 15.0037 10.404 15.2243 10.59 15.41Z" fill="black"/>
              </svg>
              <p>{data.wind.speed + 'mpH'}</p>
            </div>
            <div className='wind-direction-panel'>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM6.5 17.5L14.01 14.01L17.5 6.5L9.99 9.99L6.5 17.5ZM12 10.9C12.61 10.9 13.1 11.39 13.1 12C13.1 12.61 12.61 13.1 12 13.1C11.39 13.1 10.9 12.61 10.9 12C10.9 11.39 11.39 10.9 12 10.9Z" fill="black"/>
              </svg>
              <p>{direction}</p>
            </div>
            <div className='wind-gust-panel'>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.5 17C14.5 18.65 13.15 20 11.5 20C9.85 20 8.5 18.65 8.5 17H10.5C10.5 17.55 10.95 18 11.5 18C12.05 18 12.5 17.55 12.5 17C12.5 16.45 12.05 16 11.5 16H2V14H11.5C13.15 14 14.5 15.35 14.5 17ZM19 6.5C19 4.57 17.43 3 15.5 3C13.57 3 12 4.57 12 6.5H14C14 5.67 14.67 5 15.5 5C16.33 5 17 5.67 17 6.5C17 7.33 16.33 8 15.5 8H2V10H15.5C17.43 10 19 8.43 19 6.5ZM18.5 11H2V13H18.5C19.33 13 20 13.67 20 14.5C20 15.33 19.33 16 18.5 16V18C20.43 18 22 16.43 22 14.5C22 12.57 20.43 11 18.5 11Z" fill="black"/>
            </svg>
            <p>{data.wind.gust + ' m/s'}</p>
          </div>
        </div>
      </div>

      <div className='humidity-feeling-panel'>
        
        <div className='humidity-panel'>
          <label>Humidity</label>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.67 6.55 4 10.48 4 13.8C4 18.78 7.8 22 12 22C16.2 22 20 18.78 20 13.8C20 10.48 17.33 6.55 12 2ZM12 20C8.65 20 6 17.43 6 13.8C6 11.46 7.95 8.36 12 4.66C16.05 8.36 18 11.45 18 13.8C18 17.43 15.35 20 12 20ZM7.83 14C8.2 14 8.5 14.26 8.57 14.62C8.98 16.84 10.85 17.6 12.21 17.49C12.64 17.47 13 17.81 13 18.24C13 18.64 12.68 18.97 12.28 18.99C10.15 19.12 7.66 17.9 7.09 14.87C7.01 14.42 7.37 14 7.83 14Z" fill="black"/>
          </svg>
          <p>{data.main.humidity + ' %'}</p>
        </div>

        <div className='feeling-panel'>
          <label>Feeling</label>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 13V5C15 3.34 13.66 2 12 2C10.34 2 9 3.34 9 5V13C7.79 13.91 7 15.37 7 17C7 19.76 9.24 22 12 22C14.76 22 17 19.76 17 17C17 15.37 16.21 13.91 15 13ZM11 5C11 4.45 11.45 4 12 4C12.55 4 13 4.45 13 5H12V6H13V8H12V9H13V11H11V5Z" fill="black"/>
          </svg>
          <p className='feeling-text'>{(data.main.feels_like).toFixed(0) + ' °C'}</p>
        </div>
      </div>
      </div>
     
    )
  }

  
  
  return (
    <div>
     {loading ? <BodyItem /> : <div className='div-loading'> <img src={`../assets/images/alrededor-del-mundo.gif`}></img></div>}
    </div>
  );
}

export default App;
