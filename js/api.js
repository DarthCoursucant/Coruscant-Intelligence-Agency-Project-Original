
const apiKey = 'amebuj';

async function fetchData() {
  const options = {
    headers: {
      'x-api-key': apiKey,
      'Content-Type': 'application/json'
    }
  };

  const response = await fetch("https://v2.api.noroff.dev/blog/posts/amebuj", options);

  if (response.ok) {
    const data = await response.json();
    console.log(data);
  } else {
    console.error('Failed to fetch data. Status:', response.status);
  }
}
{
  "name": "amebuj" // Optional
}

fetchData();
