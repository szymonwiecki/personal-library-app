const GOOGLE_API = 'https://www.googleapis.com/books/v1/volumes';

const buildQuery = (input) => {
  const words = input.trim().toLowerCase().split(/\s+/);

  if (words.length === 1) {
    return `intitle:${words[0]}+inauthor:${words[0]}`;
  }

  const titlePart = words[0];
  const authorPart = words.slice(1).join(' ');
  return `intitle:${titlePart}+inauthor:${authorPart}`;
};

export const searchBooks = async (input) => {
  const q = buildQuery(input);

  const params = new URLSearchParams({
    q,
    orderBy: 'relevance',
    printType: 'books',
    langRestrict: 'pl',
    maxResults: '10',
  });

  const res = await fetch(`${GOOGLE_API}?${params.toString()}`);
  const data = await res.json();

  return (
    data.items?.map(item => {
      const info = item.volumeInfo;

      return {
        id: item.id,
        title: info.title,
        author: info.authors?.[0] || 'Unknown',
        description: info.description || 'Brak opisu',
        publishedDate: info.publishedDate || '',
        publisher: info.publisher || '',
        thumbnail: info.imageLinks?.thumbnail || '',
      };
    }) || []
  );
};
