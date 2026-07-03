
const C = {
  default:  "linear-gradient(to top, #7c3aed, #06b6d4)",
  compare:  "#06b6d4",
  swap:     "#ef4444",
  sorted:   "#10b981",
  min:      "#f59e0b",
};

let selection_sort = (divs, div_sizes, enableButtons, delay_time, arsize, canvasH) => {
  let c_delay = 0;

  function div_update(div, height, color) {
    window.setTimeout(() => {
      div.style.height     = (height / 100) * canvasH + "px";
      div.style.background = color;
    }, (c_delay += delay_time));
  }

  for (let i = 0; i < arsize - 1; i++) {
    div_update(divs[i], div_sizes[i], C.min);
    let min_index = i;

    for (let j = i + 1; j < arsize; j++) {
      div_update(divs[j], div_sizes[j], C.compare);

      if (div_sizes[j] < div_sizes[min_index]) {
        if (min_index !== i) div_update(divs[min_index], div_sizes[min_index], C.default);
        min_index = j;
        div_update(divs[min_index], div_sizes[min_index], C.min);
      } else {
        div_update(divs[j], div_sizes[j], C.default);
      }
    }

    if (min_index !== i) {
      let temp            = div_sizes[i];
      div_sizes[i]        = div_sizes[min_index];
      div_sizes[min_index] = temp;

      div_update(divs[min_index], div_sizes[min_index], C.swap);
      div_update(divs[i],         div_sizes[i],         C.swap);
      div_update(divs[min_index], div_sizes[min_index], C.default);
    }
    div_update(divs[i], div_sizes[i], C.sorted);
  }
  div_update(divs[arsize - 1], div_sizes[arsize - 1], C.sorted);

  setTimeout(() => enableButtons(), c_delay);
};

export default selection_sort;
