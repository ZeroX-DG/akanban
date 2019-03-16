export function distance(element1: HTMLElement, element2: HTMLElement) {
  const rect1 = element1.getBoundingClientRect();
  const rect2 = element2.getBoundingClientRect();
  const center1 = rect1.left + rect1.width / 2;
  const center2 = rect2.left + rect2.width / 2;
  return Math.abs(center2 - center1);
}

export interface DragableOption {
  onDrag?(element: HTMLElement): void;
  onDrop?(element: HTMLElement): void;
}

export function makeDragable(element: HTMLElement, option?: DragableOption) {
  let pos1 = 0;
  let pos2 = 0;
  let pos3 = 0;
  let pos4 = 0;
  element.onmousedown = dragMouseDown;
  function dragMouseDown(e: MouseEvent) {
    e = e || (window.event as MouseEvent);
    e.preventDefault();
    e.stopPropagation();
    pos3 = e.clientX;
    pos4 = e.clientY;
    element.style.width = `${element.clientWidth}px`;
    element.style.height = `${element.clientHeight}px`;
    element.style.position = 'absolute';
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e: MouseEvent) {
    e = e || (window.event as MouseEvent);
    e.preventDefault();
    e.stopPropagation();
    if (element.dataset.pinned === 'true') {
      return;
    }
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    const y = element.offsetTop - pos2;
    const x = element.offsetLeft - pos1;
    element.style.top = y + 'px';
    element.style.left = x + 'px';
    const hasOnDrag = option && typeof option.onDrag === 'function';
    if (hasOnDrag) {
      option.onDrag(element);
    }
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
    element.style.position = '';
    element.style.width = '100%';
    element.style.height = 'auto';
    element.style.top = '';
    element.style.left = '';
    const hasOnDrop = option && typeof option.onDrop === 'function';
    if (hasOnDrop) {
      option.onDrop(element);
    }
  }
}
