// Element references
const downloadBtn = document.querySelector(".download");
const darkInput = document.querySelector(".dark");
const lightInput = document.querySelector(".light");
const qrContainer = document.querySelector("#qr-code");
const qrTextInput = document.querySelector(".qr-text");
const shareBtn = document.querySelector(".share-btn");
const sizeSelector = document.querySelector(".sizes");

// Event listeners
darkInput.addEventListener("input", handleDarkColor);
lightInput.addEventListener("input", handleLightColor);
qrTextInput.addEventListener("input", handleQRText);
sizeSelector.addEventListener("change", handleSize);
shareBtn.addEventListener("click", handleShare);

// Defaults
const defaultUrl = "https://github.com/lopineda";
let colorLight = "#ffffff";
let colorDark = "#000000";
let text = defaultUrl;
let size = 400;

// Color handlers
function handleDarkColor(e) {
    colorDark = e.target.value;
    generateQRCode();
}

function handleLightColor(e) {  
    colorLight = e.target.value;
    generateQRCode();
}

// Text input handler
function handleQRText(e) {
    text = e.target.value || defaultUrl;
    generateQRCode();
}

// Size handler
function handleSize(e) {
    size = parseInt(e.target.value, 10);
    generateQRCode();
}

// Generate QR Code
async function generateQRCode() {
    qrContainer.innerHTML = "";
    new QRCode(qrContainer, {
    text,
    width: size,
    height: size,
    colorDark,
    colorLight,
    });
    downloadBtn.href = await resolveDataUrl();
}

// Share QR Code
async function handleShare() {
    setTimeout(async () => {
    try {
        const base64url = await resolveDataUrl();
        const blob = await (await fetch(base64url)).blob();
        const file = new File([blob], "QRCode.png", { type: blob.type });
        await navigator.share({ files: [file], title: text });
    } catch (error) {
        alert("Your browser doesn't support sharing.");
    }
    }, 100);
}

// Convert to Data URL
function resolveDataUrl() {
    return new Promise((resolve) => {
    setTimeout(() => {
        const img = qrContainer.querySelector("img");
        if (img?.currentSrc) {
        return resolve(img.currentSrc);
        }
        const canvas = qrContainer.querySelector("canvas");
        resolve(canvas.toDataURL());
    }, 50);
    });
}

// Init
generateQRCode();
