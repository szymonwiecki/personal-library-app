const GOOGLE_API = 'https://www.googleapis.com/books/v1/volumes';


  export const searchBooks = async (query) => {
    const params = new URLSearchParams({
      q: `intitle:${query}`,
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
