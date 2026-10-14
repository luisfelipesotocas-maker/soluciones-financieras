const amount = document.getElementById("amount");
const rate = document.getElementById("rate");
const term = document.getElementById("term");
const rateValue = document.getElementById("rateValue");
const payment = document.getElementById("payment");
const total = document.getElementById("total");
const interest = document.getElementById("interest");
const simulatorWhatsapp = document.getElementById("simulatorWhatsapp");

const money = n => new Intl.NumberFormat("es-CO", {
  style: "currency", currency: "COP", maximumFractionDigits: 0
}).format(Math.round(n));

function calculate() {
  const P = Math.max(Number(amount.value) || 0, 0);
  const annual = Number(rate.value) / 100;
  const n = Number(term.value);
  const monthly = Math.pow(1 + annual, 1 / 12) - 1;

  let cuota = 0;
  if (monthly === 0) cuota = P / n;
  else cuota = P * (monthly * Math.pow(1 + monthly, n)) / (Math.pow(1 + monthly, n) - 1);

  const totalPaid = cuota * n;
  const interestPaid = Math.max(totalPaid - P, 0);

  rateValue.textContent = `${Number(rate.value).toFixed(2)}%`;
  payment.textContent = money(cuota);
  total.textContent = money(totalPaid);
  interest.textContent = money(interestPaid);

  const msg = `Hola, quiero consultar una simulación de crédito en Soluciones Financieras. Monto: ${money(P)}. Tasa de referencia: ${Number(rate.value).toFixed(2)}% E.A. Plazo: ${n} meses. Cuota estimada: ${money(cuota)}.`;
  simulatorWhatsapp.href = `https://wa.me/573172426159?text=${encodeURIComponent(msg)}`;
}

[amount, rate, term].forEach(el => el.addEventListener("input", calculate));
calculate();

document.getElementById("leadForm").addEventListener("submit", e => {
  e.preventDefault();
  const data = new FormData(e.target);
  const msg = `Hola, soy ${data.get("nombre")}. Quiero recibir asesoría sobre ${data.get("producto")}. Mi WhatsApp es ${data.get("telefono")}. Monto aproximado: ${data.get("monto") || "No especificado"}.`;
  window.open(`https://wa.me/573172426159?text=${encodeURIComponent(msg)}`, "_blank");
});
