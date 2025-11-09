import { useState } from "react";
import RepoList from "./components/RepoList";

function App() {
    const [org, setOrg] = useState("");
    const [sort, setSort] = useState("");
    const [limit, setLimit] = useState(5);
    const [repos, setRepos] = useState([]);
    const [searching, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const loadRepos = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`/api/org/${org}/repos?limit=${limit}&sort=${sort}`);
            if (!response.ok) throw new Error("Failed to load repositories");
            const data = await response.json();
            setRepos(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: "20px", fontFamily: "Segoe UI, sans-serif" }}>
            <h1 style={{ color: "#1f2937" }}>GitHub Repositories Viewer</h1>

            <div
                style={{
                    marginBottom: "20px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    flexWrap: "wrap",
                }}
            >
                <label>
                    Repository Name:&nbsp;
                    <input
                        value={org}
                        onChange={(e) => setOrg(e.target.value)}
                        style={{
                            padding: "6px 10px",
                            borderRadius: "6px",
                            border: "1px solid #ccc",
                        }}
                    />
                </label>

                <label>
                    Sort by:&nbsp;
                    <select
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        style={{
                            padding: "6px 10px",
                            borderRadius: "6px",
                            border: "1px solid #ccc",
                        }}
                    >
                        <option value="stars">Stars</option>
                        <option value="updated">Updated</option>
                    </select>
                </label>

                <label>
                    Limit:&nbsp;
                    <input
                        type="number"
                        min="1"
                        max="20"
                        value={limit}
                        onChange={(e) => setLimit(e.target.value)}
                        style={{
                            padding: "6px 10px",
                            width: "60px",
                            borderRadius: "6px",
                            border: "1px solid #ccc",
                        }}
                    />
                </label>

                <button
                    onClick={loadRepos}
                    style={{
                        padding: "6px 14px",
                        backgroundColor: "#2563eb",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontWeight: 500,
                    }}
                >
                    Load
                </button>
            </div>

            {searching && <p>Searching...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {!searching && !error && (
                <>
                    <h2 style={{ color: "#374151" }}>
                        Found repositories: {repos.length}
                    </h2>
                    <RepoList repos={repos} />
                </>
            )}
        </div>
    );

}

export default App;