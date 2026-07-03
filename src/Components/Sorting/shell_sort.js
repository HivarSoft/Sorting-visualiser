
let shell_sort = (divs, div_sizes, enableButtons, delay_time, arsize, canvasH) => {
  let c_delay = 0;

  function div_update(div, height, color) {
    window.setTimeout(function () {
      div.style.height     = (height / 100) * canvasH + "px";
      div.style.background = color;
    }, (c_delay += delay_time));
  }

  // Shell sort using Knuth's gap sequence
  let gap = 1;
  while (gap < Math.floor(arsize / 3)) {
    gap = gap * 3 + 1;
  }

  while (gap >= 1) {
    for (let i = gap; i < arsize; i++) {
      let key = div_sizes[i];
      div_update(divs[i], div_sizes[i], "#f59e0b"); // highlight current

      let j = i;
      while (j >= gap && div_sizes[j - gap] > key) {
        div_update(divs[j - gap], div_sizes[j - gap], "#ef4444");
        div_update(divs[j], div_sizes[j], "#ef4444");

        div_sizes[j] = div_sizes[j - gap];

        div_update(divs[j], div_sizes[j], "#ef4444");
        div_update(divs[j - gap], div_sizes[j - gap], "#7c3aed");

        j -= gap;
      }
      div_sizes[j] = key;
      div_update(divs[j], div_sizes[j], "#06b6d4");
    }

    // Mark pass as done
    for (let k = 0; k < arsize; k++) {
      if (gap === 1) {
        div_update(divs[k], div_sizes[k], "#10b981");
      }
    }

    gap = Math.floor(gap / 3);
  }

  setTimeout(() => {
    enableButtons();
  }, c_delay);
};

export default shell_sort;
