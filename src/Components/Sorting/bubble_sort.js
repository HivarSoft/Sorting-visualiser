
const C = {
  default:  "linear-gradient(to top, #7c3aed, #06b6d4)",
  compare:  "#06b6d4",
  swap:     "#ef4444",
  sorted:   "#10b981",
  pivot:    "#f59e0b",
};

let bubble_sort = (divs, div_sizes, enableButtons, delay_time, arsize, canvasH) => {
  let c_delay = 0;

  function div_update(div, height, color) {
    window.setTimeout(() => {
      div.style.height     = (height / 100) * canvasH + "px";
      div.style.background = color;
    }, (c_delay += delay_time));
  }

  for (let i = 0; i < arsize - 1; i++) {
    for (let j = 0; j < arsize - i - 1; j++) {
      div_update(divs[j], div_sizes[j], C.compare);

      if (div_sizes[j] > div_sizes[j + 1]) {
        div_update(divs[j],     div_sizes[j],     C.swap);
        div_update(divs[j + 1], div_sizes[j + 1], C.swap);

        let temp        = div_sizes[j];
        div_sizes[j]    = div_sizes[j + 1];
        div_sizes[j + 1] = temp;

        div_update(divs[j],     div_sizes[j],     C.swap);
        div_update(divs[j + 1], div_sizes[j + 1], C.swap);
      }
      div_update(divs[j], div_sizes[j], C.default);
    }
    div_update(divs[arsize - 1 - i], div_sizes[arsize - 1 - i], C.sorted);
  }
  div_update(divs[0], div_sizes[0], C.sorted);

  setTimeout(() => enableButtons(), c_delay);
};

export default bubble_sort;
