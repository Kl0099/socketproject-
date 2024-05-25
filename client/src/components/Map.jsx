import React, { useEffect, useState } from "react";
import Leaflet from "./Leaflet";
import io from "socket.io-client";

const Map = () => {
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [id, setid] = useState(null);
  const [array, setArray] = useState([
    {
      latitude: 23.0260736,
      longitude: 72.5745664,
    },
  ]);
  let [currentlatitude, setcurrentlatitude] = useState(23.0227968);
  let [currentlangitude, setcurrentlangitude] = useState(72.5778432);
  // const endpoint = "http://localhost:3000"; // Make sure the endpoint is correct
  // const endpoint = 'http://192.168.1.10:3000';  mobile endpoints
  const endpoint = import.meta.env.VITE_SOCKET_ENDPOINT;

  useEffect(() => {
    const newSocket = io(endpoint);
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Connected to backend");
    });

    newSocket.on("usercoordinates", (data) => {
      console.log("Data from user: ", data);
      setMessage(data);

      setArray((prevArray) => [...prevArray, data]);
    });

    return () => {
      newSocket.close();
    };
  }, [endpoint]);

  useEffect(() => {
    setMessage({
      longitude: longitude,
      latitude: latitude,
    });
  }, [latitude, longitude]);
  useEffect(() => {
    console.log("array of coorsd : ", array);
  }, [array]);

  const shareBackend = () => {
    if (socket) {
      socket.emit("coordinates", message);
    }
  };

  const sharecurrentlocation = () => {
    const id = navigator.geolocation.watchPosition(
      (e) => {
        console.log(e.coords.latitude, e.coords.longitude);
        alert("hellow");
        alert(e.coords.latitude, e.coords.longitude);
        console.log("speed : ", e.coords.speed);
        // aler("speed : ", e.coords.speed);
        setcurrentlatitude(e.coords.latitude);
        setcurrentlangitude(e.coords.longitude);
      },
      (error) => {
        console.error(error);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000,
      }
    );
    // navigator.geolocation.getCurrentPosition((e) => {
    //   console.log(e);
    // });
    // console.log("watch id : ", id);
  };
  const clearecurrentposition = () => {
    console.log(navigator.geolocation.clearWatch());
  };

  const hiibutton = () => {
    navigator.geolocation.getCurrentPosition((e) => {
      alert(
        "latitude : " +
          e.coords.latitude +
          ", longitude : " +
          e.coords.longitude
      );
    });
    // alert("hii button");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div>
        <button onClick={shareBackend}>Share Location</button>
        <button onClick={() => sharecurrentlocation}>
          Share current location
        </button>
        <button onClick={clearecurrentposition}>clear current location</button>
        <button onClick={hiibutton}>hii button</button>
      </div>
      <div>
        <Leaflet
          array={array}
          setlangitude={setLongitude}
          setlatitude={setLatitude}
          currentlangitude={currentlangitude}
          currentlatitude={currentlatitude}
        />
      </div>
    </div>
  );
};

export default Map;
