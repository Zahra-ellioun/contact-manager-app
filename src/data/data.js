let books = [
  {
    name: "آئین زندگی",
    number: 21,
    amount: "50,000",
    due: "1401/01/12",
  },
  {
    name: "زمان حال",
    number: 22,
    amount: "65,000",
    due: "1400/12/22",
  },
  {
    name: "مدیریت زمان",
    number: 23,
    amount: "42,000",
    due: "1400/08/03",
  },
  {
    name: "اثر مرکب",
    number: 24,
    amount: "75,000",
    due: "1399/01/12",
  },
  {
    name: "انگیزه",
    number: 25,
    amount: "52,000",
    due: "1401/02/14",
  },
];

export const getBooks = () => {
  return books;
};

export const getBook = (bookName) => {
  return books.find((book) => book.name === bookName);
};

export const deleteBook = (number) => {
  books = books.filter((book) => book.number !== number);
  console.log(books);
};
