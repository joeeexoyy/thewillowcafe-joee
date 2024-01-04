let cart = [];

function addToCart(itemName, itemPrice) {
    const quantity = prompt(`Enter quantity for ${itemName}:`, 1);

    if (quantity !== null && quantity !== "" && !isNaN(quantity) && quantity > 0) {
        cart.push({ name: itemName, price: itemPrice, quantity: parseInt(quantity) });
        updateCart();
    } else {
        alert("Invalid quantity. Please enter a valid number greater than 0.");
    }
}

function updateCart() {
    const cartItems = document.getElementById("cartItems");
    const totalAmount = document.getElementById("totalAmount");

    // Clear previous items
    cartItems.innerHTML = "";

    // Populate cart items
    let total = 0;
    cart.forEach(item => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `<span>${item.name} x${item.quantity}</span><span>${(item.price * item.quantity).toFixed(2)} rm</span>`;
        cartItems.appendChild(listItem);
        total += item.price * item.quantity;
    });

    // Update total amount
    totalAmount.textContent = total.toFixed(2);
}

function editCart() {
    const overlay = document.getElementById("overlay");
    const cartEditForm = document.getElementById("cartEditForm");

    // Display the overlay and edit form
    overlay.style.display = "flex";
    cartEditForm.innerHTML = generateEditFormHTML();

    // Add event listener to close the overlay when clicking outside the form
    overlay.addEventListener("click", function (event) {
        if (event.target === overlay) {
            closeCartEditForm();
        }
    });
}

function generateEditFormHTML() {
    let formHTML = `<h2>Edit Cart</h2>`;
    
    cart.forEach((item, index) => {
        formHTML += `
            <div class="edit-form-item">
                <span>${item.name}</span>
                <label for="quantity${index}">Quantity:</label>
                <input type="number" id="quantity${index}" name="quantity${index}" min="1" value="${item.quantity}">
            </div>
        `;
    });

    formHTML += `
        <div class="edit-form-item">
            <button onclick="updateCartFromForm()">Update Cart</button>
            <button onclick="closeCartEditForm()">Cancel</button>
        </div>
    `;

    return formHTML;
}

function updateCartFromForm() {
    for (let i = 0; i < cart.length; i++) {
        const quantityInput = document.getElementById(`quantity${i}`);
        const newQuantity = parseInt(quantityInput.value);

        if (!isNaN(newQuantity) && newQuantity > 0) {
            cart[i].quantity = newQuantity;
        } else {
            alert("Invalid quantity. Please enter a valid number greater than 0.");
            return;
        }
    }

    updateCart();
    closeCartEditForm();
}

function closeCartEditForm() {
    const overlay = document.getElementById("overlay");

    // Hide the overlay and edit form
    overlay.style.display = "none";
}
