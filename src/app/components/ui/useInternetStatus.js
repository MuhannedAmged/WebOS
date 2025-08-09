import { useState, useEffect } from "react";

const useInternetStatus = () => {
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    const checkOnlineStatus = () => {
      setIsOnline(navigator.onLine);
    };

    checkOnlineStatus();

    const interval = setInterval(checkOnlineStatus, 5000);

    return () => clearInterval(interval);
  }, []);

  return isOnline;
};

export default useInternetStatus;
