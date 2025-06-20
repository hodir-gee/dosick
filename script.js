const result = await response.json();
const message = result.choices?.[0]?.message?.content || "No result";

const cleanData = message
  .replace(/\n/g, "<br>")
  .replace(/ {2}/g, "&nbsp;&nbsp;");

resultBox.innerHTML = `
  <div class="text-left text-sm leading-relaxed whitespace-pre-wrap">
    ${cleanData}
  </div>
`;
