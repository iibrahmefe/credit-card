// HTML tarafından gelen verileri değişkenlere aktarma
const cardNumber = document.getElementById("number");
const numberInp = document.getElementById("card_number");
const nameInp = document.getElementById("card_name");
const cardName = document.getElementById("name");
const cardMonth = document.getElementById("month");
const cardYear = document.getElementById("year");
const monthInp = document.getElementById("card_month");
const yearInp = document.getElementById("card_year");
const cardCvc = document.getElementById("cvc");
const cvcInp = document.getElementById("card_cvc");
const submitBtn = document.getElementById("submit_btn");
const completed = document.querySelector(".thank");
const form = document.querySelector("form");
const cardTypeDisplay = document.getElementById('card_type');

// Fonksiyonlar
function setCardInfo(e, element) {
  element.innerText = format(e.target.value);
}

function handleSubmit(e) {
  e.preventDefault();
  
  // Hata mesajlarını gizle
  document.querySelectorAll(".error-message").forEach(el => el.style.display = 'none');
  
  // İsim alanını kontrol et
  if (!nameInp.value) {
    nameInp.classList.add("error");
    document.getElementById("name-error").style.display = 'flex';
  } else {
    nameInp.classList.remove("error");
    document.getElementById("name-error").style.display = 'none';
  }

  // Kart numarasını kontrol et
  if (!numberInp.value) {
    numberInp.classList.add("error");
    document.getElementById("number-error").style.display = 'flex';
  } else if (numberInp.value.length < 16) {
    numberInp.classList.add("error");
    document.getElementById("number-error").style.display = 'flex';
  } else {
    numberInp.classList.remove("error");
    document.getElementById("number-error").style.display = 'none';
  }

  // Ayı kontrol et
  if (!monthInp.value || monthInp.value < 1 || monthInp.value > 12) {
    monthInp.classList.add("error");
    document.getElementById("month-error").style.display = 'flex';
  } else {
    monthInp.classList.remove("error");
    document.getElementById("month-error").style.display = 'none';
  }

  // Yılı kontrol et
  if (!yearInp.value || yearInp.value < 24 || yearInp.value > 99) {
    yearInp.classList.add("error");
    document.getElementById("year-error").style.display = 'flex';
  } else {
    yearInp.classList.remove("error");
    document.getElementById("year-error").style.display = 'none';
  }

  // CVC'yi kontrol et
  if (cvcInp.value.length !== 3) {
    cvcInp.classList.add("error");
    document.getElementById("cvc-error").style.display = 'flex';
  } else {
    cvcInp.classList.remove("error");
    document.getElementById("cvc-error").style.display = 'none';
  }

  // Girilen değerlerin kontrolü
  if (
    nameInp.value &&
    numberInp.value &&
    numberInp.value.length === 16 &&
    monthInp.value >= 1 && monthInp.value <= 12 &&
    yearInp.value >= 24 && yearInp.value <= 99 &&
    cvcInp.value.length === 3
  ) {
    completed.classList.remove("hidden"); // Teşekkür mesajını göster
    form.classList.add("hidden"); // Formu gizle
  }
}

function format(s) {
  return s.toString().replace(/\d{4}(?=.)/g, "$&");
}

// Kart türünü belirleme
function detectCardType(cardNumber) {
  if (cardNumber.startsWith('4')) {
    return 'Visa';
  } else if (cardNumber.startsWith('5')) {
    return 'MasterCard';
  } else {
    return '';
  }
}

function updateCardType() {
  const cardNumber = numberInp.value.trim();
  cardTypeDisplay.textContent = detectCardType(cardNumber);
}

// Event listener'lar
numberInp.addEventListener("input", (e) => {
  setCardInfo(e, cardNumber);
  updateCardType();
});
nameInp.addEventListener("input", (e) => setCardInfo(e, cardName));
monthInp.addEventListener("input", (e) => setCardInfo(e, cardMonth));
yearInp.addEventListener("input", (e) => setCardInfo(e, cardYear));
cvcInp.addEventListener("input", (e) => setCardInfo(e, cardCvc));
submitBtn.addEventListener("click", handleSubmit);

function refresh() {
  window.location.reload();
}

document.getElementById('refresh_btn').addEventListener('click', refresh);
