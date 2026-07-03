
const C = {
  default:  "linear-gradient(to top, #7c3aed, #06b6d4)",
  compare:  "#06b6d4",
  swap:     "#ef4444",
  sorted:   "#10b981",
  root:     "#f59e0b",
};

let heap_sorting = (divs, div_sizes, enableButtons, delay_time, arsize, canvasH) => {
  let c_delay = 0;

  function div_update(div, height, color) {
    window.setTimeout(() => {
      div.style.height     = (height / 100) * canvasH + "px";
      div.style.background = color;
    }, (c_delay += delay_time));
  }

  function swap(i, j) {
    div_update(divs[i], div_sizes[i], C.swap);
    div_update(divs[j], div_sizes[j], C.swap);

    let temp    = div_sizes[i];
    div_sizes[i] = div_sizes[j];
    div_sizes[j] = temp;

    div_update(divs[i], div_sizes[i], C.swap);
    div_update(divs[j], div_sizes[j], C.swap);
    div_update(divs[i], div_sizes[i], C.default);
    div_update(divs[j], div_sizes[j], C.default);
  }

  function max_heapify(n, i) {
    let largest = i;
    const l = 2 * i + 1;
    const r = 2 * i + 2;

    if (l < n && div_sizes[l] > div_sizes[largest]) {
      if (largest !== i) div_update(divs[largest], div_sizes[largest], C.compare);
      largest = l;
      div_update(divs[largest], div_sizes[largest], C.root);
    }

    if (r < n && div_sizes[r] > div_sizes[largest]) {
      if (largest !== i) div_update(divs[largest], div_sizes[largest], C.compare);
      largest = r;
      div_update(divs[largest], div_sizes[largest], C.root);
    }

    if (largest !== i) {
      swap(i, largest);
      max_heapify(n, largest);
    }
  }

  // Build heap
  for (let i = Math.floor(arsize / 2) - 1; i >= 0; i--) {
    max_heapify(arsize, i);
  }

  // Extract elements
  for (let i = arsize - 1; i > 0; i--) {
    swap(0, i);
    div_update(divs[i], div_sizes[i], C.sorted);
    max_heapify(i, 0);
  }
  div_update(divs[0], div_sizes[0], C.sorted);

  setTimeout(() => enableButtons(), c_delay);
};

export default heap_sorting;
