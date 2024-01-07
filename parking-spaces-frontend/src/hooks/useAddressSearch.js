import { useState, useCallback } from 'react';
import { debounce } from 'lodash';
import { searchAddress } from '../Api/apiNominatim';

const useAddressSearch = (selectedAddressFromHint, onCoordinatesFetched) => {
  const [isHintAddress, setHintAddress] = useState([]);
  const [showHint, setShowHint] = useState(true);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchAddress = useCallback(
    debounce(async address => {
      try {
        setShowHint(true);
        const data = await searchAddress(address);

        if (data.length > 0) {
          const selectedResult = data.find(result => result.display_name === selectedAddressFromHint);
          if (selectedResult) {
            const { lat, lon } = selectedResult;
            onCoordinatesFetched(lat, lon);
            setShowHint(false);
          }
        }

        if (data.length > 0) {
          const addresses = data.map(result => result.display_name);
          setHintAddress(addresses);
        } else {
          setHintAddress([]);
        }
      } catch (err) {
        console.error(err);
      }
    }, 500),
    [selectedAddressFromHint],
  );

  return { isHintAddress, showHint, setShowHint, fetchAddress };
};

export default useAddressSearch;
