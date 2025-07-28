import React, { useState } from 'react';

const appId = process.env.REACT_APP_ALGOLIA_APP_ID;
const apiKey = process.env.REACT_APP_ALGOLIA_SEARCH_KEY;
const indexName = process.env.REACT_APP_ALGOLIA_INDEX;

interface AlgoliaHit {
  objectID: string;
  [key: string]: any;
}

export default function Search() {
  const [query, setQuery] = useState('');
  const [hits, setHits] = useState<AlgoliaHit[]>([]);

  async function performSearch(q: string) {
    if (!appId || !apiKey || !indexName) {
      return;
    }

    const url = `https://${appId}-dsn.algolia.net/1/indexes/${indexName}/query`;

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Algolia-API-Key': apiKey,
        'X-Algolia-Application-Id': appId,
      },
      body: JSON.stringify({ query: q }),
    });

    const data = await res.json();
    setHits(data.hits || []);
  }

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => {
          const value = e.target.value;
          setQuery(value);
          performSearch(value);
        }}
        placeholder="Search"
      />
      <ul>
        {hits.map((hit) => (
          <li key={hit.objectID}>{JSON.stringify(hit)}</li>
        ))}
      </ul>
    </div>
  );
}
