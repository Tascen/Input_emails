export default function Text_block(text = "", warn = false, onRemove_callback = null): HTMLElement | null {
  let node = document.createElement("DIV"),
    textnode = document.createTextNode(text),
    icon = document.createElement("LABEL");

  icon.innerHTML = '<svg class="icon-cross" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8 0.8L7.2 0L4 3.2L0.8 0L0 0.8L3.2 4L0 7.2L0.8 8L4 4.8L7.2 8L8 7.2L4.8 4L8 0.8Z" style="fill: var(--color_1)"/></svg>';
  icon.onclick = onRemove_callback;

  node.appendChild(textnode);
  node.appendChild(icon);
  node.classList.add("text_block");
  warn ? node.classList.add("warn") : node.classList.remove("warn");
  return node;
}
