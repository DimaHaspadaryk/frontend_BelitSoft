import { useState } from "react";
import RepoList from "./components/RepoList";

function App() {
    const [org, setOrg] = useState("spring-projects");
    const [sort, setSort] = useState("stars");
    const [limit, setLimit] = useState(5);
    const [repos, setRepos] = useState([]);
    const [searching, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const loadRepos = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`/api/org/${org}/repos?limit=${limit}&sort=${sort}`);
            if (!response.ok) throw new Error("Ошибка загрузки");
            const data = await response.json();
            setRepos(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
            <h1>GitHub Repos Viewer</h1>
            <div style={{ marginBottom: "20px" }}>
                <input
                    value={org}
                    onChange={(e) => setOrg(e.target.value)}
                />

                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                >
                    <option value="stars">Stars</option>
                    <option value="updated">Updated</option>
                </select>

                <input
                    type="number"
                    min="1"
                    max="20"
                    value={limit}
                    onChange={(e) => setLimit(e.target.value)}
                />

                <button onClick={loadRepos}>Load</button>
            </div>

            {searching && <p> Searching...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {!searching && !error && <RepoList repos={repos} />}
        </div>
    );
}

export default App;