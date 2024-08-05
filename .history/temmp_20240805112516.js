import React, { useEffect } from 'react';

const App = () => {
  useEffect(() => {
    const controller = new AbortController();

    fetch('https://api.example.com/data', { signal: controller.signal })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => {
        if (error.name === 'AbortError') {
          console.log('Fetch aborted');
        } else {
          console.error('Fetch error:', error);
        }
      });

    // Cleanup function to abort the fetch on component unmount
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div>
      <h1>My App</h1>
    </div>
  );
};

export default App;
