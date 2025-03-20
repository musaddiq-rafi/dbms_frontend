'use client';

import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';


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
      const response = await fetch('http://localhost:3000/api/query', {
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
      <div className="flex flex-col items-center w-full max-w-2xl">
        <Card className="p-4 w-full">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Textarea
                className="w-full"
                rows={4}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter SQL Query (SELECT only)"
            />
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Running...' : 'Submit Query'}
            </Button>
          </form>
        </Card>

        {error && <p className="mt-4 text-red-500">{error}</p>}

        {result.length > 0 && (
            <Card className="mt-6 w-full">
              <h2 className="text-lg font-semibold mb-2">Query Results</h2>
              <div className="overflow-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                  <tr className="bg-gray-200">
                    {Object.keys(result[0]).map((key) => (
                        <th key={key} className="border p-2">{key}</th>
                    ))}
                  </tr>
                  </thead>
                  <tbody>
                  {result.map((row, index) => (
                      <tr key={index} className="border">
                        {Object.values(row).map((value, i) => (
                            <td key={i} className="border p-2">{value as React.ReactNode}</td>
                        ))}
                      </tr>
                  ))}
                  </tbody>
                </table>
              </div>
            </Card>
        )}
      </div>
  );
}
