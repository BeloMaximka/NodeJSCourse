const my_form = document.getElementById("my_form");

const sendData = (data) => {
  console.log("+");
  fetch("http://localhost:3000", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

my_form.addEventListener("submit", (e) => {
  e.preventDefault();
  const form_data = new FormData(e.target);
  const data = Object.fromEntries(form_data);
  sendData(data);
});