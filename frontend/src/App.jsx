import { useState } from "react";
import axios from "axios";

function App() {
    const [query, setQuery] = useState("");
    const [data, setData] = useState([]);
    const [error, setError] = useState("");

    const executeQuery = async () => {
        setError("");
        try {
            const response = await axios.post("http://localhost:5000/query", { query });
            setData(response.data.data);
        } catch (err) {
            setError(err.response?.data?.error || "Something went wrong");
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-4 text-center">🎬 Cineplex DB Dashboard</h1>

            <textarea
                rows="3"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Write your SQL query here..."
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                onClick={executeQuery}
                className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
            >
                Execute
            </button>

            {error && <p className="text-red-500 mt-4">{error}</p>}

            {data.length > 0 && (
                <div className="overflow-x-auto mt-6">
                    <table className="min-w-full border border-gray-200 rounded-lg shadow-sm">
                        <thead className="bg-blue-600 text-white">
                        <tr>
                            {Object.keys(data[0]).map((key) => (
                                <th key={key} className="py-3 px-4 text-left border-b border-gray-300">
                                    {key}
                                </th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {data.map((row, idx) => (
                            <tr
                                key={idx}
                                className={`border-b border-gray-300 ${idx % 2 === 0 ? "bg-gray-100" : "bg-white"}`}
                            >
                                {Object.values(row).map((value, i) => (
                                    <td key={i} className="py-3 px-4">
                                        {String(value)}
                                    </td>
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

export default App;
