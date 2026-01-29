import BookItem from './BookItem';

const BookList = ({
  books,
  onDelete,
  onUpdate,
  onToggleFavorite,
  onNotesUpdate
}) => {
  if (!books.length) {
    return <p>📭 Brak książek</p>;
  }

  return (
    <div>
      {books.map((book) => (
        <BookItem
          key={book._id}
          book={book}
          onDelete={onDelete}
          onUpdate={onUpdate}
          onToggleFavorite={onToggleFavorite}
          onNotesUpdate={onNotesUpdate}
        />
      ))}
    </div>
  );
};

export default BookList;