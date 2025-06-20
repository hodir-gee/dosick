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

    // ✅ GPT 응답 전체를 화면에 그대로 출력
    resultBox.innerHTML = `
      <div class="text-left text-xs whitespace-pre-wrap">
        <strong>📦 전체 응답 (모바일 확인용):</strong><br>
        ${JSON.stringify(result, null, 2).replace(/\n/g, "<br>").replace(/ /g, "&nbsp;")}
      </div>
    `;

  } catch (error) {
    resultBox.innerHTML = `<p class="text-red-500">에러 발생: ${error.message}</p>`;
  }
});

function generatePrompt({ keywords, season, place, style }) {
  const base = `
너는 패션 기획전 이름을 제안하는 작명가야.

사용자가 입력한 조건은 다음과 같아:
- 키워드: ${keywords}
- 장소 및 시즌: ${season} 시즌 ${place}
- 작명 스타일: ${style}
`;

  const styleInstruction = {
    '직관적': `이름은 직관적이고 실용적인 방향으로 지어줘.
사용자들이 한눈에 어떤 기획전인지 알 수 있도록 명확하게 표현해.`,
    '감각적': `이름은 감각적이고 트렌디한 인상을 주되, 너무 낯설지는 않게 해줘.
젊은 타겟에게 어필할 수 있는 세련된 단어를 사용해.`,
    '창의적': `이름은 상징적이고 창의적인 방향으로 제안해줘.
은유나 시적인 언어, 감각적인 조합을 자유롭게 활용해도 좋아.`,
  };

  return `${base}

요청:
- ${styleInstruction[style]}
- 1~2단어의 한글 또는 영어 이름을 3개 제안해줘.
- 각 이름마다 짧은 설명을 붙여줘.`;
}
