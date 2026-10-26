/**
 * Arma el guion de la narración a partir de js/data/slides.js
 * y lo imprime como JSON: [{ id, text }, …].
 *
 * Uso: node tools/narration/script.mjs
 */
import { slides } from "../../js/data/slides.js";
import { pronunciations } from "./pronunciations.mjs";

function toPlainText(html) {
  return html
    .replace(/<br\s*\/?>/gi, ". ")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function endWithPause(text) {
  return /[.…!?»:]$/.test(text) ? text : `${text}.`;
}

function applyPronunciations(text) {
  return pronunciations.reduce(
    (result, [written, spoken]) => result.replaceAll(written, spoken),
    text
  );
}

function buildText(slide) {
  const parts = [];
  if (slide.kicker && slide.speakKicker !== false) parts.push(slide.kicker);
  if (slide.title) parts.push(slide.title);
  if (slide.narration) parts.push(...slide.narration);

  const text = parts.map((part) => endWithPause(toPlainText(part))).join("\n");
  return applyPronunciations(text);
}

const script = slides.map((slide, index) => ({
  id: `slide-${index + 1}`,
  text: buildText(slide)
}));

process.stdout.write(JSON.stringify(script, null, 2));
