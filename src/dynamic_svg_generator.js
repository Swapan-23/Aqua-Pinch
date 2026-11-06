/**
 * AQUA PINCH: Dynamic Network SVG Generator Node
 * Parses numerical outputs and LLM routing matrix to generate
 * an orthogonally routed industrial water network diagram.
 */

const pythonData = $('Pinch Cal').first().json;
const ops = pythonData.operations_data || [];
const totalFreshwater = pythonData.min_freshwater_requirement_t_hr;

let anthropicText = "";
const allItems = $input.all();
allItems.forEach(item => {
  const data = item.json;
  if (data.text || data.output) {
    anthropicText = data.text || data.output;
  }
});

let routing = { freshwater_splits: [], reuse_streams: [], wastewater_streams: [] };
const jsonMatch = anthropicText.match(/```json\s*([\s\S]*?)\s*```/);
if (jsonMatch && jsonMatch[1]) {
  try {
    routing = JSON.parse(jsonMatch[1]);
  } catch(e) {}
}

const numOps = ops.length;
const W = Math.max(1100, numOps * 260);
const H = 750;

function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

function drawBox(x, y, w, h, lines, fill, stroke, color) {
  let out = `<rect x="${x - w/2}" y="${y - h/2}" width="${w}" height="${h}" rx="10" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`;
  const lh = 18;
  const startY = y - (lines.length - 1) * (lh / 2);
  lines.forEach((l, i) => {
    out += `<text x="${x}" y="${startY + i * lh}" text-anchor="middle" font-family="Arial, sans-serif" font-size="13" fill="${color}" font-weight="bold">${esc(l)}</text>`;
  });
  return out;
}

let svgElements = '';
svgElements += `<text x="${W/2}" y="35" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="#1e293b">Dynamic Proposed Water Allocation Network</text>`;
svgElements += drawBox(W/2, 90, 180, 50, ['Freshwater Supply', `${totalFreshwater} t/hr`], '#e0f2fe', '#0284c7', '#0369a1');

const finalSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${svgElements}</svg>`;
return [{ json: { svg: finalSvg } }];
