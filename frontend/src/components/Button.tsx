import "./button.css";

function Button({ children }: { children: string }) {
  return <div className="btn-action">{children}</div>;
}

export default Button;
