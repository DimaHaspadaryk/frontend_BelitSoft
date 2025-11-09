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
        <div style={{ border: "1px solid #ccc", borderRadius: 8, padding: 10 }}>
            <h3>
                <p>Name of repository: {repo.name}</p>
                <a href = {repo.html_url}>GitHub</a>
                <p>Number of Forks: {repo.forks_count}</p>
                <p>Number of Stargazers: {repo.stargazers_count}</p>
                <p>Update at <time dateTime={repo.updated_at}>{formattedDate}</time></p>
            </h3>
        </div>
    );
}
export default RepoCard;
