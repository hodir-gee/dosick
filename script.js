
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
    resultBox.innerHTML = '<p style="color:red">모든 항목을 입력하고 스타일을 선택해주세요.</p>';
    return;
  }

  resultBox.innerHTML = `<p>작명 요청 완료!<br><strong>키워드:</strong> ${keywords}<br><strong>계절:</strong> ${season}<br><strong>장소:</strong> ${place}<br><strong>스타일:</strong> ${selectedStyle}</p>`;
});
