import React, { useState } from "react";

const appId = process.env.REACT_APP_ALGOLIA_APP_ID;
const apiKey = process.env.REACT_APP_ALGOLIA_SEARCH_KEY;
const indexName = process.env.REACT_APP_ALGOLIA_INDEX;

interface MovieCastMember {
  name: string;
  character: string;
}

interface MovieCrewMember {
  name: string;
  job: string;
}

interface AlgoliaHit {
  objectID: string;
  backdrop_path: string;
  poster_path: string;
  title: string;
  original_title: string;
  overview: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  cast: MovieCastMember[];
  crew: MovieCrewMember[];
  genres: string[];
}

export default function Search() {
  const [query, setQuery] = useState("");
  const [hits, setHits] = useState<AlgoliaHit[]>([]);

  async function performSearch(q: string) {
    console.log("Performing search for:", q);
    if (!appId || !apiKey || !indexName) {
      console.error("Algolia configuration is missing");
      console.error("App ID:", appId);
      console.error("API Key:", apiKey);
      console.error("Index Name:", indexName);
      return;
    }

    const url = `https://${appId}-dsn.algolia.net/1/indexes/${indexName}/query`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Algolia-API-Key": apiKey,
        "X-Algolia-Application-Id": appId,
      },
      body: JSON.stringify({ query: q }),
    });

    const data = await res.json();
    setHits(data.hits || []);
  }

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      <input
        type="text"
        value={query}
        onChange={(e) => {
          const value = e.target.value;
          setQuery(value);
          performSearch(value);
        }}
        placeholder="Search movies..."
        style={{
          width: "100%",
          padding: "12px",
          fontSize: "16px",
          marginBottom: "20px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />
      <div style={{ display: "grid", gap: "20px" }}>
        {hits.map((hit) => (
          <div
            key={hit.objectID}
            style={{
              border: "1px solid #eee",
              borderRadius: "8px",
              overflow: "hidden",
              backgroundColor: "white",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <div style={{ display: "flex" }}>
              {hit.poster_path && (
                <img
                  src={hit.poster_path}
                  alt={hit.title}
                  style={{
                    width: "200px",
                    height: "300px",
                    objectFit: "cover",
                  }}
                />
              )}
              <div style={{ padding: "20px" }}>
                <h2 style={{ margin: "0 0 10px 0", fontSize: "24px" }}>
                  {hit.title}
                </h2>
                <p style={{ margin: "0 0 15px 0", color: "#666" }}>
                  {hit.overview}
                </p>

                <div style={{ marginBottom: "15px" }}>
                  <strong>Release Date:</strong>{" "}
                  {new Date(hit.release_date).toLocaleDateString()}
                  <br />
                  <strong>Rating:</strong> {hit.vote_average.toFixed(1)}/10 (
                  {hit.vote_count} votes)
                  <br />
                  <strong>Genres:</strong> {hit.genres.join(", ")}
                </div>

                <div style={{ marginBottom: "15px" }}>
                  <strong>Cast:</strong>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "10px",
                      marginTop: "5px",
                    }}
                  >
                    {hit.cast.slice(0, 5).map((actor, index) => (
                      <span
                        key={index}
                        style={{
                          backgroundColor: "#f0f0f0",
                          padding: "4px 8px",
                          borderRadius: "4px",
                          fontSize: "14px",
                        }}
                      >
                        {actor.name} as {actor.character}
                      </span>
                    ))}
                  </div>
                </div>

                {hit.crew.length > 0 && (
                  <div>
                    <strong>Director:</strong>{" "}
                    {hit.crew.find((c) => c.job === "Director")?.name}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
