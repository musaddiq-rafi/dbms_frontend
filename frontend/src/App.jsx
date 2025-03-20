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
        <div className="container" style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
            <h1>Cineplex DB Dashboard</h1>
            <textarea
                rows="3"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Write your SQL query here..."
                style={{ width: "100%", padding: "10px" }}
            />
            <button onClick={executeQuery} style={{ marginTop: "10px", padding: "10px", background: "blue", color: "white" }}>
                Execute
            </button>

            {error && <p style={{ color: "red" }}>{error}</p>}

            {data.length > 0 && (
                <table border="1" style={{ marginTop: "20px", width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                    <tr>
                        {Object.keys(data[0]).map((key) => (
                            <th key={key} style={{ padding: "10px", background: "#ddd" }}>{key}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((row, idx) => (
                        <tr key={idx}>
                            {Object.values(row).map((value, i) => (
                                <td key={i} style={{ padding: "10px" }}>{String(value)}</td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default App;
