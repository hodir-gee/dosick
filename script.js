const styleButtons = document.querySelectorAll('.style-btn');
let selectedStyle = null;

styleButtons.forEach(button => {
  button.addEventListener('click', () => {
    styleButtons.forEach(btn => btn.classList.remove('bg-black', 'text-white'));
    button.classList.add('bg-black', 'text-white');
    selectedStyle = button.dataset.style;
  });
});

const generateButton = document.getElementById('generate');
const resultBox = document.getElementById('result');

generateButton.addEventListener('click', async () => {
  const keywords = document.getElementById('keywords').value.trim();
  const season = document.getElementById('season').value.trim();
  const place = document.getElementById('place').value.trim();

  if (!keywords || !season || !place || !selectedStyle) {
    resultBox.innerHTML = '<p class="text-red-500">모든 항목을 입력하고 스타일을 선택해주세요.</p>';
    return;
  }

  const prompt = generatePrompt({ keywords, season, place, style: selectedStyle });

  resultBox.innerHTML = '<p class="text-gray-500">작명 중입니다...⏳</p>';

  try {
    const response = await fetch('https://dark-forest-83f4.gr8-honour.workers.dev', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    const result = await response.json();

    // ✅ 응답 전체를 HTML에 그대로 출력 (디버깅용)
    resultBox.innerHTML = `
      <div class="text-left text-xs whitespace-pre-wrap">
        <strong>📦 전체 응답 (모바일 확인용):</strong><br>
        ${JSON.stringify(result, null, 2).replace(/\n/g, "<br>").re
