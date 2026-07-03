const C = {
  default: "linear-gradient(to top, #7c3aed, #06b6d4)",
  compare: "#06b6d4",
  swap:    "#ef4444",
  sorted:  "#10b981",
  key:     "#f59e0b",
};

let insertion_sort = (divs, div_sizes, enableButtons, delay_time, arsize, canvasH) => {
  let c_delay = 0;

  function div_update(div, height, color) {
    window.setTimeout(() => {
      div.style.height     = (height / 100) * canvasH + "px";
      div.style.background = color;
    }, (c_delay += delay_time));
  }

  for (let j = 0; j < arsize; j++) {
    div_update(divs[j], div_sizes[j], C.key);

    let key = div_sizes[j];
    let i   = j - 1;

    while (i >= 0 && div_sizes[i] > key) {
      div_update(divs[i],     div_sizes[i],     C.swap);
      div_update(divs[i + 1], div_sizes[i + 1], C.swap);

      div_sizes[i + 1] = div_sizes[i];

      div_update(divs[i],     div_sizes[i],     C.swap);
      div_update(divs[i + 1], div_sizes[i + 1], C.swap);
      div_update(divs[i + 1], div_sizes[i + 1], i === j - 1 ? C.key : C.default);
      i--;
    }
    div_sizes[i + 1] = key;

    for (let k = 0; k <= j; k++) {
      div_update(divs[k], div_sizes[k], C.sorted);
    }
  }

  setTimeout(() => enableButtons(), c_delay);
};

export default insertion_sort;
