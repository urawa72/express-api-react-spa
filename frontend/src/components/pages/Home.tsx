import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home: React.FC = () => {
  const [err, setErr] = useState<any>();
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get('http://localhost:3000/users');
        console.log(res);
      } catch (e) {
        console.log(e);
        setErr(e);
      }
    })();
  }, []);

  return (
    <div>
      <h2>Home</h2>
      {err?.message}
    </div>
  );
};

export default Home;
