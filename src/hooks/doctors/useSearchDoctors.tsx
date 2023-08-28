import { doctorService } from '@/services';
import { useState } from 'react';

const useSearchDoctors = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const searchDoctors = async () => {
    setLoading(true);
    try {
      const response = await doctorService.search();
      return response;
    } finally {
      setLoading(false);
    }
  };

  return { loading, searchDoctors };
};

export default useSearchDoctors;
