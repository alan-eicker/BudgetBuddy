import { useState } from 'react';

const useVerifyToken = () => {
  const [isValid, setIsValid] = useState(true);

  return { isValid };
};

export default useVerifyToken;
