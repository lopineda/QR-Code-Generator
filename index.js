const download = document.querySelector('.download');
const dark = document.querySelector('.dark');
const light = document.querySelector('.light');
const qrContainer = document.querySelector('#qrCode');
const qrText = document.querySelector('.qe-text');
const shareBtn = document.querySelector('.share-btn');
const sizes = document.querySelector('.sizes');

dark.addEventListener('input', handleDarkColor);
light.addEventListener('input', handleLightColor);
qrText.addEventListener('input', handleQRText);
sizes.addEventListener('input', handleSize);
shareBtn.addEventListener('click', handleShare)

const defaultUrl = ''
let colorlight = '#fff',
    colordark = '000',
    text = defaultUrl,
    size = 300;

function handleDarkColor(e) {
  colorDark = e.target.value;
  generateQRCode;
}

function handleLightColor(e) {
  colorlight = e.target.value;
  generateQRCode();
}

function handleQRText(e) {
    const value = e.target.value;
    text = value;
    if (!value) {
        text = defaultUrl;
    }
  generateQRCode();
}