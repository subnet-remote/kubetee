export function AlphaText({ text }: { text: string }) {
  const index = text.indexOf("α");
  if (index === -1) return <>{text}</>;

  return (
    <>
      {text.slice(0, index)}
      <span className="normal-case">α</span>
      {text.slice(index + 1)}
    </>
  );
}
