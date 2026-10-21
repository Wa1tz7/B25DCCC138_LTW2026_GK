const Home = ({ contacts }) => {
  const total = contacts.length;
  const favorites = contacts.reduce(
    (sum, { favorite }) => (favorite ? sum + 1 : sum),
    0
  );
  const gmail = contacts.filter(({ email }) =>
    email.toLowerCase().endsWith("@gmail.com")
  ).length;

  return (
    <div>
      <h1>Danh bạ</h1>
      <p>{`Tổng số liên hệ: ${total}`}</p>
      <p>{`Số liên hệ yêu thích: ${favorites}`}</p>
      <p>{`Số liên hệ dùng Gmail: ${gmail}`}</p>
    </div>
  );
};

export default Home;