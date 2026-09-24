function EmptyState({ title = "Nothing found", message }) {
  return (
    <section className="empty-state">
      <h2>{title}</h2>
      {message && <p>{message}</p>}
    </section>
  );
}

export default EmptyState;