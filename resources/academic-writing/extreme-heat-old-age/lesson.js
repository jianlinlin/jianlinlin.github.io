const clozeButton = document.querySelector("#check-cloze");
const clozeResult = document.querySelector("#cloze-result");

clozeButton?.addEventListener("click", () => {
  const fields = [...document.querySelectorAll("#cloze-practice .cloze-input")];
  let correct = 0;
  fields.forEach((field) => {
    const isCorrect = field.value.trim().toLocaleLowerCase() === field.dataset.answer;
    field.setAttribute("aria-invalid", String(!isCorrect));
    if (isCorrect) correct += 1;
  });
  if (clozeResult) clozeResult.textContent = `答对 ${correct} / ${fields.length} 题。`;
});
