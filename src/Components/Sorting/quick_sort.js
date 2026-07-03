
const C = {
  default:  "linear-gradient(to top, #7c3aed, #06b6d4)",
  compare:  "#06b6d4",
  swap:     "#ef4444",
  sorted:   "#10b981",
  pivot:    "#f59e0b",
};

let quick_sort = (divs, div_sizes, enableButtons, delay_time, arsize, canvasH) => {
  let c_delay = 0;

  function div_update(div, height, color) {
    window.setTimeout(() => {
      div.style.height     = (height / 100) * canvasH + "px";
      div.style.background = color;
    }, (c_delay += delay_time));
  }

  qs(0, arsize - 1);

  function qs(start, end) {
    if (start < end) {
      const piv_pos = partition(start, end);
      qs(start, piv_pos - 1);
      qs(piv_pos + 1, end);
    }
  }

  function partition(start, end) {
    let i   = start + 1;
    const piv = div_sizes[start];
    div_update(divs[start], div_sizes[start], C.pivot);

    for (let j = start + 1; j <= end; j++) {
      if (div_sizes[j] < piv) {
        div_update(divs[j], div_sizes[j], C.compare);
        div_update(divs[i], div_sizes[i], C.swap);
        div_update(divs[j], div_sizes[j], C.swap);

        let temp    = div_sizes[i];
        div_sizes[i] = div_sizes[j];
        div_sizes[j] = temp;

        div_update(divs[i], div_sizes[i], C.swap);
        div_update(divs[j], div_sizes[j], C.swap);
        div_update(divs[i], div_sizes[i], C.default);
        div_update(divs[j], div_sizes[j], C.default);
        i++;
      }
    }

    // Place pivot
    div_update(divs[start],  div_sizes[start],  C.swap);
    div_update(divs[i - 1],  div_sizes[i - 1],  C.swap);

    let temp        = div_sizes[start];
    div_sizes[start] = div_sizes[i - 1];
    div_sizes[i - 1] = temp;

    div_update(divs[start],  div_sizes[start],  C.swap);
    div_update(divs[i - 1],  div_sizes[i - 1],  C.swap);

    for (let t = start; t < i; t++) {
      div_update(divs[t], div_sizes[t], C.sorted);
    }

    return i - 1;
  }

  setTimeout(() => enableButtons(), c_delay);
};

export default quick_sort;
