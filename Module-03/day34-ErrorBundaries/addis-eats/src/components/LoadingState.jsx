function LoadingState({ message = "Loading..." }) {
  return (
    <div className="status-message" role="status">
      <p>{message}</p>
    </div>
  );
}

export default LoadingState;