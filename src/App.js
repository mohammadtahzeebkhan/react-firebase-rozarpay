import { useCallback,useState,useEffect } from "react";
import useRazorpay from "react-razorpay";
// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { ref, onValue, off,set } from 'firebase/database';
 
const firebaseConfig = {
  apiKey: "AIzaSyD__gAD9BNfr1Nc2-z37Izr_7ckHe6mrec",
  authDomain: "hackathon2021-4eef5.firebaseapp.com",
  databaseURL: "https://hackathon2021-4eef5-default-rtdb.firebaseio.com",
  projectId: "hackathon2021-4eef5",
  storageBucket: "hackathon2021-4eef5.appspot.com",
  messagingSenderId: "918863596011",
  appId: "1:918863596011:web:17a9331a7122e204d7f1ae",
  measurementId: "G-38EVVJS5DN"
};
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);




export default function App() {
  const Razorpay = useRazorpay();

  const handlePayment = useCallback(() => {
    const options = {
      key: "rzp_test_9uzFaRoEwyoZoP",
      amount: 3000 * 100,
      currency: "INR",
      name: "VENDING MACHINE",
      description: "Test Transaction",
      image:
        "https://en.wikipedia.org/wiki/Pizza#/media/File:Pizza-3007395.jpg",
      handler: (res) => {
        console.log(res);
      },
      prefill: {
        name: "Mohammad Tahzeeb Khan",
        email: "mohammadtahzeebkhan@gmail.com",
        contact: "+917486882890"
      },
      notes: {
        address: "Razorpay Corporate Office"
      },
      theme: {
        color: "#3399cc"
      }
    };

    const rzpay = new Razorpay(options);
    rzpay.open();
  }, [Razorpay]);

  const [data, setData] = useState(null);
  const writeData = () => {
    const dataRef = ref(database, '/Pump');
    set(dataRef, 'TAHZEEB')
      .then(() => {
        console.log("Data written successfully");
      })
      .catch((error) => {
        console.error("Error writing data: ", error);
      });
  };
  useEffect(() => {
    const dataRef = ref(database, '/Pump');
    console.log("dataRef",dataRef)
    const unsubscribe = onValue(dataRef, (snapshot) => {
      console.log("snapshot",snapshot)
      setData(snapshot.val());
    });

    // Cleanup subscription on unmount
    return () => off(dataRef, 'value', unsubscribe);
  }, []);

  return (
    <div className="App">
    <h1>DATA:{data}</h1>
      <button onClick={handlePayment}>Click</button>
      <button onClick={writeData}>Write Data</button>
    </div>
  );
}
