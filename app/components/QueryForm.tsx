'use client';

import { useState } from 'react';

export default function QueryForm() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult([]);

    try {
      const response = await fetch('/api/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();
      if (data.success) {
        setResult(data.data);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Something went wrong!');
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center">
      <form onSubmit={handleSubmit} className="w-full max-w-lg p-4 bg-white shadow-md rounded-lg">
        <textarea
          className="w-full p-2 border rounded"
          rows={4}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter SQL Query (e.g., SELECT * FROM users)"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 mt-2 rounded hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? 'Running...' : 'Submit Query'}
        </button>
      </form>

      {error && <p className="mt-4 text-red-500">{error}</p>}

      {result && (
        <div className="mt-6 w-full max-w-2xl bg-white p-4 shadow-md rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Query Results</h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                {Object.keys(result[0] || {}).map((key) => (
                  <th key={key} className="border p-2">{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {result.map((row: any, index: number) => (
                <tr key={index} className="border">
                  {Object.values(row).map((value, i) => (
                    <td key={i} className="border p-2">{value as React.ReactNode}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
