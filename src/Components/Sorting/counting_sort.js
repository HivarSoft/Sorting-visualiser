
let counting_sort = (divs, div_sizes, enableButtons, delay_time, arsize, canvasH) => {
  let c_delay = 0;

  function div_update(div, height, color) {
    window.setTimeout(function () {
      div.style.height     = (height / 100) * canvasH + "px";
      div.style.background = color;
    }, (c_delay += delay_time));
  }

  // Find max value
  let max = div_sizes[0];
  for (let i = 1; i < arsize; i++) {
    if (div_sizes[i] > max) max = div_sizes[i];
    div_update(divs[i], div_sizes[i], "#f59e0b"); // scan phase
  }

  // Build count array (values are 10–110 range)
  let count = new Array(max + 1).fill(0);
  for (let i = 0; i < arsize; i++) {
    count[div_sizes[i]]++;
    div_update(divs[i], div_sizes[i], "#7c3aed"); // counting phase
  }

  // Reconstruct sorted array with animations
  let idx = 0;
  for (let val = 0; val <= max; val++) {
    while (count[val] > 0) {
      div_sizes[idx] = val;
      div_update(divs[idx], div_sizes[idx], "#ef4444");
      div_update(divs[idx], div_sizes[idx], "#10b981");
      idx++;
      count[val]--;
    }
  }

  setTimeout(() => {
    enableButtons();
  }, c_delay);
};

export default counting_sort;
