//open and close cart
const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector("#cart-close");

cartIcon.addEventListener('click', () => {
    cart.classList.add("active");
});

closeCart.addEventListener('click', () => {
    cart.classList.remove("active");
});

class ShoppingCart {
    constructor() {
        this.itemsAdded = [];
    }
    start() {
        this.addEvents();
    }
    update() {
        this.addEvents();
        this.updateTotal();
    }
    addEvents() {
        // Remove cart items
        let cartRemove_btns = document.querySelectorAll('.cart-remove');
        cartRemove_btns.forEach(btn => {
            btn.addEventListener("click", this.handleRemoveCartItems.bind(this));
        });
        // Change item quantity
        let cartQuantity_inputs = document.querySelectorAll('.cart-quantity');
        cartQuantity_inputs.forEach(input => {
            input.addEventListener("change", this.handleChangeItemQuantity.bind(this));
        });
        // Add items to cart
        let addCart_btns = document.querySelectorAll(".add-cart");
        addCart_btns.forEach(btn => {
            btn.addEventListener("click", this.handleAddCartItems.bind(this));
        });
        // Buy now
        const buy_btn = document.querySelector(".btn-buy");
        if (buy_btn) {
            buy_btn.addEventListener("click", this.handleBuyNow.bind(this));
        }
    }
    handleAddCartItems(event) {
        var _a, _b, _c;
        let product = event.currentTarget.parentElement;
        if (!product)
            return;
        let title = (_a = product.querySelector(".product-title")) === null || _a === void 0 ? void 0 : _a.innerHTML;
        let price = (_b = product.querySelector(".product-price")) === null || _b === void 0 ? void 0 : _b.innerHTML;
        let imgSrc = (_c = product.querySelector(".product-img")) === null || _c === void 0 ? void 0 : _c.getAttribute("src");
        if (!title || !price || !imgSrc)
            return;
        let newToAdd = {
            title,
            price,
            imgSrc,
        };
        if (this.itemsAdded.find((el) => el.title == newToAdd.title)) {
            alert("Item Exists");
            return;
        }
        this.itemsAdded.push(newToAdd);
        let cartBoxElement = this.cartBoxComponent(title, price, imgSrc);
        let newNode = document.createElement("div");
        newNode.innerHTML = cartBoxElement;
        const cartContent = document.querySelector(".cart-content");
        if (cartContent) {
            cartContent.appendChild(newNode);
        }
        this.update();
    }
    handleRemoveCartItems(event) {
        let cartBox = event.currentTarget.parentElement;
        if (!cartBox)
            return;
        cartBox.remove();
        let titleElement = cartBox.querySelector('.cart-product-title');
        if (!titleElement)
            return;
        let title = titleElement.innerHTML;
        this.itemsAdded = this.itemsAdded.filter((el) => el.title !== title);
        this.update();
    }
    handleChangeItemQuantity(event) {
        let input = event.currentTarget;
        if (!input)
            return;
        if (isNaN(parseInt(input.value)) || parseInt(input.value) < 1) {
            input.value = "1";
        }
        input.value = Math.floor(parseInt(input.value)).toString();
        this.update();
    }
    handleBuyNow() {
        if (this.itemsAdded.length <= 0) {
            alert("You have to place an order. \n Select an item.");
            return;
        }
        const cartContent = document.querySelector(".cart-content");
        if (cartContent) {
            cartContent.innerHTML = "";
        }
        alert("Your order has been placed successfully :)");
        this.itemsAdded = [];
        this.update();
    }
    updateTotal() {
        let cartBoxes = document.querySelectorAll('.cart-box');
        const totalElement = document.querySelector('.total-price');
        if (!totalElement)
            return;
        let total = 0;
        cartBoxes.forEach(cartBox => {
            let priceElement = cartBox.querySelector('.cart-price');
            let quantityElement = cartBox.querySelector(".cart-quantity");
            if (!priceElement || !quantityElement)
                return;
            let price = parseFloat(priceElement.innerHTML.replace("$", ""));
            let quantity = parseInt(quantityElement.value, 10);
            total += price * quantity;
        });
        total = total.toFixed(2);
        totalElement.innerHTML = "$" + total;
    }
    cartBoxComponent(title, price, imgSrc) {
        return `
      <div class="cart-box">
        <img src=${imgSrc} alt="" class="cart-img" />
        <div class="detail-box">
          <div class="cart-product-title">${title}</div>
          <div class="cart-price">${price}</div>
          <input type="number" value="1" class="cart-quantity" />
        </div>
        <i class="bx bxs-trash-alt cart-remove"></i>
      </div>`;
    }
}
// Usage
const shoppingCart = new ShoppingCart();
shoppingCart.start();


























