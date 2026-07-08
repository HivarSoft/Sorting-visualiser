import "./App.css";
import Header from "./Components/Header.jsx";
import Selection from "./Components/Selection.jsx";
import Sorting from "./Components/Sorting.jsx";
import { useState, useEffect, useRef, useCallback } from "react";
import bubble_sort    from "./Components/Sorting/bubble_sort.js";
import selection_sort from "./Components/Sorting/selection_sort.js";
import insertion_sort from "./Components/Sorting/insertion_sort.js";
import shell_sort     from "./Components/Sorting/shell_sort.js";
import merge_sort     from "./Components/Sorting/merge_sort.js";
import quick_sort     from "./Components/Sorting/quick_sort.js";
import heap_sorting   from "./Components/Sorting/heap_sort.js";
import counting_sort  from "./Components/Sorting/counting_sort.js";

const BAR_DEFAULT_COLOR = "linear-gradient(to top, #7c3aed, #06b6d4)";

let divs      = [];
let div_sizes = []; // values 10–100, treated as % of container height

function App() {
  const [algo, setAlgo]       = useState("bubble");
  const [arsize, setArsize]   = useState(50);
  const [alspeed, setAlspeed] = useState(3);
  const [running, setRunning] = useState(false);
  const contRef = useRef(null);

  // ── Compute bar dimensions from live container size ─────────────────────────
  const getBarDimensions = useCallback((size) => {
    const cont = contRef.current;
    if (!cont) return { w: 2, h: 340 };
    const { width, height } = cont.getBoundingClientRect();
    // Exact formula: total_width / total_bars — no margins, no gaps
    const w = Math.max(1, width / (size || divs.length || 1));
    return { w, h: height || 340 };
  }, []);

  // ── Re-apply width + height to every bar on resize ──────────────────────────
  const refreshBarStyles = useCallback(() => {
    if (!divs.length) return;
    const { w, h } = getBarDimensions(divs.length);
    divs.forEach((div, i) => {
      div.style.width  = w + "px";
      div.style.height = (div_sizes[i] / 100) * h + "px";
    });
  }, [getBarDimensions]);

  // ── ResizeObserver: re-scale bars whenever the container changes size ────────
  useEffect(() => {
    const cont = contRef.current;
    if (!cont) return;
    const ro = new ResizeObserver(() => refreshBarStyles());
    ro.observe(cont);
    return () => ro.disconnect();
  }, [refreshBarStyles]);

  // ── Generate array ───────────────────────────────────────────────────────────
  const generateArray = useCallback((size) => {
    const cont = contRef.current;
    if (!cont) return;
    cont.innerHTML = "";
    divs      = [];
    div_sizes = [];

    const { w, h } = getBarDimensions(size);

    for (let i = 0; i < size; i++) {
      div_sizes[i] = Math.floor(Math.random() * 88) + 10; // 10–98%
      divs[i]      = document.createElement("div");
      divs[i].style.cssText = [
        // width = parent_width / total_bars exactly, no margins
        `width:${w}px`,
        `height:${(div_sizes[i] / 100) * h}px`,
        `background:${BAR_DEFAULT_COLOR}`,
        "border-radius:2px 2px 0 0",
        "border:1px solid rgba(255,255,255,0.4)",
        "transition:height 0.04s ease, background 0.1s ease",
        "flex-shrink:0",       // prevent flex from resizing — we own the width
        "box-sizing:border-box",
      ].join(";");
      cont.appendChild(divs[i]);
    }
  }, [getBarDimensions]);

  useEffect(() => {
    // Wait one frame so the container has rendered and getBoundingClientRect works
    const id = requestAnimationFrame(() => generateArray(arsize));
    return () => cancelAnimationFrame(id);
  }, [arsize, generateArray]);

  // ── Disable / enable controls ────────────────────────────────────────────────
  const disableButtons = () => {
    setRunning(true);
    ["arr_size", "algo_speed", "a_generate", "al_btn", "algo_inp"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.disabled = true;
    });
  };

  const enableButtons = () => {
    setRunning(false);
    ["arr_size", "algo_speed", "a_generate", "al_btn", "algo_inp"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.disabled = false;
    });
  };

  // ── Speed mapping ────────────────────────────────────────────────────────────
  const getDelayTime = (speed, size) => {
    const multipliers = { 1: 1, 2: 10, 3: 100, 4: 1000, 5: 10000 };
    const mult = multipliers[parseInt(speed)] ?? 100;
    return 1000 / (Math.floor(size / 10) * mult);
  };

  // ── Run algorithm ────────────────────────────────────────────────────────────
  const AlgoRunner = () => {
    disableButtons();
    const delay      = getDelayTime(alspeed, arsize);
    const canvasH    = contRef.current?.getBoundingClientRect().height || 340;

    const map = {
      bubble:    () => bubble_sort(divs, div_sizes, enableButtons, delay, arsize, canvasH),
      selection: () => selection_sort(divs, div_sizes, enableButtons, delay, arsize, canvasH),
      insertion: () => insertion_sort(divs, div_sizes, enableButtons, delay, arsize, canvasH),
      shell:     () => shell_sort(divs, div_sizes, enableButtons, delay, arsize, canvasH),
      merge:     () => merge_sort(divs, div_sizes, enableButtons, delay, arsize, canvasH),
      quick:     () => quick_sort(divs, div_sizes, enableButtons, delay, arsize, canvasH),
      heap:      () => heap_sorting(divs, div_sizes, enableButtons, delay, arsize, canvasH),
      counting:  () => counting_sort(divs, div_sizes, enableButtons, delay, arsize, canvasH),
    };

    (map[algo] ?? map.bubble)();
  };

  return (
    <div className="min-h-screen grid-bg pb-10">
      <Header />

      <Selection
        arsize={arsize}
        alspeed={alspeed}
        setArsize={setArsize}
        setAlspeed={setAlspeed}
        genNewBtn_handle={() => generateArray(arsize)}
      />

      <Sorting algo={algo} setAlgo={setAlgo} AlgoRunner={AlgoRunner} />

      {/* ── Visualiser canvas ── */}
      <div className="mx-4 mt-4">
        <div className="glass-card p-4 glow-purple">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest font-mono">
              Visualiser
            </p>
            {running && (
              <div className="flex items-center gap-2 text-xs text-violet-400 font-mono">
                <span className="inline-block w-2 h-2 rounded-full bg-violet-400 animate-ping"></span>
                running…
              </div>
            )}
          </div>

          <div
            id="array_container"
            ref={contRef}
            style={{
              width: "100%",
              height: "clamp(180px, 40vh, 380px)",
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-end",
              overflow: "hidden",
              borderRadius: "10px",
              padding: "0",
              boxSizing: "border-box",
            }}
          />
        </div>
      </div>

      <footer className="mt-8 flex flex-col items-center gap-1 text-xs text-slate-500 font-mono">
        <p>
          Made with <span className="text-rose-400">♥</span> by{" "}
          <a href="https://hiteshk.dev" className="text-violet-400 hover:text-violet-300 transition-colors">
            @devhiteshk
          </a>
        </p>
        <a
          href="https://github.com/devhiteshk/Sorting-visualiser"
          className="text-slate-600 hover:text-slate-400 transition-colors"
        >
          github.com/devhiteshk/Sorting-visualiser
        </a>
      </footer>
    </div>
  );
}

export default App;
