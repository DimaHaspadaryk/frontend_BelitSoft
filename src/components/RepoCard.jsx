function RepoCard({ repo }) {
    const dateObject = new Date(repo.updated_at);

    const formattedDate = dateObject.toLocaleDateString('en-EN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });

    return (
        <div
            style={{
                border: "1px solid #e1e4e8",
                borderRadius: 12,
                padding: "20px",
                marginBottom: "16px",
                backgroundColor: "#f9f9f9",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            }}
        >
            <h3 style={{ color: "#000000", marginBottom: 10 }}>
                <strong>Repository:</strong> {repo.name}
            </h3>
            <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                    color: "#0969da",
                    textDecoration: "none",
                    fontWeight: "500",
                }}
            >
                View on GitHub
            </a>
            <p style={{ marginTop: 10 }}>
                <strong>Forks:</strong> {repo.forks_count}
            </p>
            <p>
                <strong>Stars:</strong> {repo.stargazers_count}
            </p>
            <p>
                <strong>Last update:</strong>{" "}
                <time dateTime={repo.updated_at}>{formattedDate}</time>
            </p>
        </div>
    );
}
export default RepoCard;
