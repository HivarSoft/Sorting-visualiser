
const C = {
  default:  "linear-gradient(to top, #7c3aed, #06b6d4)",
  compare:  "#06b6d4",
  swap:     "#ef4444",
  sorted:   "#10b981",
  mid:      "#f59e0b",
};

let merge_sort = (divs, div_sizes, enableButtons, delay_time, arsize, canvasH) => {
  let c_delay = 0;

  function div_update(div, height, color) {
    window.setTimeout(() => {
      div.style.height     = (height / 100) * canvasH + "px";
      div.style.background = color;
    }, (c_delay += delay_time));
  }

  merge_partition(0, arsize - 1);

  function merge_partition(start, end) {
    if (start < end) {
      const mid = Math.floor(start + (end - start) / 2);
      div_update(divs[mid], div_sizes[mid], C.mid);
      merge_partition(start, mid);
      merge_partition(mid + 1, end);
      do_merge(start, mid, end);
    }
  }

  function do_merge(start, mid, end) {
    let p = start, q = mid + 1, k = 0;
    const arr = [];

    for (let i = start; i <= end; i++) {
      if (p > mid) {
        arr[k++] = div_sizes[q];
        div_update(divs[q], div_sizes[q], C.swap);
        q++;
      } else if (q > end) {
        arr[k++] = div_sizes[p];
        div_update(divs[p], div_sizes[p], C.swap);
        p++;
      } else if (div_sizes[p] <= div_sizes[q]) {
        arr[k++] = div_sizes[p];
        div_update(divs[p], div_sizes[p], C.compare);
        p++;
      } else {
        arr[k++] = div_sizes[q];
        div_update(divs[q], div_sizes[q], C.compare);
        q++;
      }
    }

    for (let j = 0; j < k; j++) {
      div_sizes[start + j] = arr[j];
      div_update(divs[start + j], div_sizes[start + j], C.sorted);
    }
  }

  setTimeout(() => enableButtons(), c_delay);
};

export default merge_sort;
