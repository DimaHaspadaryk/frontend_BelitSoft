import { useState } from "react";
import RepoList from "./components/RepoList";
import styles from "./App.module.css";

function App() {
    const [org, setOrg] = useState("");
    const [sort, setSort] = useState("STARS"); // Установим значение по умолчанию
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
        <div className={styles.container}>
            <h1 className={styles.header}>GitHub Repositories Viewer</h1>

            <div className={styles.controls}>
                <label className={styles.label}>
                    Repository Name:&nbsp;
                    <input
                        value={org}
                        onChange={(e) => setOrg(e.target.value)}
                        className={styles.input}
                    />
                </label>

                <label className={styles.label}>
                    Sort by:&nbsp;
                    <select
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        className={styles.input}
                    >
                        <option value="STARS">Stars</option>
                        <option value="UPDATED">Updated</option>
                    </select>
                </label>

                <label className={styles.label}>
                    Limit:&nbsp;
                    <input
                        type="number"
                        min="1"
                        max="20"
                        value={limit}
                        onChange={(e) => setLimit(e.target.value)}
                        className={`${styles.input} ${styles.limitInput}`}
                    />
                </label>

                <button
                    onClick={loadRepos}
                    className={styles.button}
                >
                    Load
                </button>
            </div>

            {searching && <p>Searching...</p>}
            {error && <p className={styles.error}>{error}</p>}

            {!searching && !error && (
                <>
                    <h2 className={styles.subHeader}>
                        Found repositories: {repos.length}
                    </h2>
                    <RepoList repos={repos} />
                </>
            )}
        </div>
    );
}

export default App;
