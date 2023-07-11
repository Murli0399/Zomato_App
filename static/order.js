const form = document.getElementById("order-form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const customerName = document.getElementById("customer-name").value;
  const dishId = parseInt(document.getElementById("dish-id").value);
  const quantity = parseInt(document.getElementById("quantity").value);

  const order = {
    customer_name: customerName,
    items: [
      {
        dish_id: dishId,
        quantity: quantity,
      },
    ],
  };

  fetch("https://zmtapp.onrender.com/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // Log the response data
      alert("Order placed successfully");
      form.reset();
    })
    .catch((error) => {
      console.error(error);
      alert("Error placing the order");
    });
});
