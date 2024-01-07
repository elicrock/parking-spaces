import axios from 'axios';

const NOMINATIM_BASE_URL = 'https://nominatim.openstreetmap.org';

const searchAddress = async address => {
  const encodedAddress = encodeURIComponent(address);
  const response = await axios.get(`${NOMINATIM_BASE_URL}/search?format=json&q=${encodedAddress}&addressdetails=1`);
  return response.data || [];
};

export { searchAddress };
