import React, { useState, useEffect } from 'react';

const SearchDropdown = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        setIsLoading(true);

        // Replace 'your-api-endpoint' with your actual API endpoint
        const response = await fetch(`https://api.example.com/search?term=${searchTerm}`);
        const data = await response.json();

        setOptions(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (searchTerm.trim() !== '') {
      fetchOptions();
    } else {
      setOptions([]);
    }
  }, [searchTerm]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {isLoading && <p>Loading...</p>}
      {!isLoading && options.length > 0 && (
        <ul>
          {options.map((option) => (
            <li key={option.id}>{option.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchDropdown;