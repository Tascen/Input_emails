export default function Btn(props = {}): HTMLElement | null {
  let node = document.createElement("BUTTON"),
    textnode = document.createTextNode(props.title || "Button");

  node.onclick = props.onClick_callback;
  node.appendChild(textnode);
  return node;
}
