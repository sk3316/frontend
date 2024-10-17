"use client";  // Add this at the top

import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

export default function Home() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState<{ numbers: string[], alphabets: string[], highest_lowercase_alphabet: string[] } | null>(null);
  const [selectedFields, setSelectedFields] = useState<string[]>([]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/bfhl', JSON.parse(jsonInput));
      setResponse(res.data);
    } catch (error) {
      console.error('Invalid JSON or server error');
    }
  };

  const handleFieldChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { options } = e.target;
    const selected: string[] = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    setSelectedFields(selected);
  };

  return (
    <div>
      <h1>BFHL Dev Challenge</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Enter JSON data"
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          rows={5}
        />
        <br />
        <button type="submit">Submit</button>
      </form>

      {response && (
        <>
          <h2>Response</h2>
          <select multiple onChange={handleFieldChange}>
            <option value="numbers">Numbers</option>
            <option value="alphabets">Alphabets</option>
            <option value="highest_lowercase_alphabet">Highest Lowercase Alphabet</option>
          </select>

          <div>
            {selectedFields.includes('numbers') && response?.numbers && (
              <div>
                <h3>Numbers</h3>
                <pre>{JSON.stringify(response.numbers, null, 2)}</pre>
              </div>
            )}
            {selectedFields.includes('alphabets') && response?.alphabets && (
              <div>
                <h3>Alphabets</h3>
                <pre>{JSON.stringify(response.alphabets, null, 2)}</pre>
              </div>
            )}
            {selectedFields.includes('highest_lowercase_alphabet') && response?.highest_lowercase_alphabet && (
              <div>
                <h3>Highest Lowercase Alphabet</h3>
                <pre>{JSON.stringify(response.highest_lowercase_alphabet, null, 2)}</pre>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
