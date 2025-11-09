import RepoCard from "./RepoCard";

function RepoList({ repos }) {
    if (repos.length === 0) {
        return <p>No repositories found.</p>;
    }

    return (
        <div style={{ display: "grid", gap: "10px" }}>
            {repos.map((repo) => (
                <RepoCard key={repo.name} repo={repo} />
            ))}
        </div>
    );
}

export default RepoList;
