export function MessageBubble({ content, isUser }: any) {
  return (
    <div
      style={{
        textAlign: isUser ? "right" : "left",
        margin: "10px 0",
      }}
    >
      <span
        style={{
          background: isUser ? "#2563eb" : "#e5e7eb",
          color: isUser ? "white" : "black",
          padding: "8px 12px",
          borderRadius: 10,
          display: "inline-block",
        }}
      >
        {content}
      </span>
    </div>
  );
}
