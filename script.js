  document.addEventListener('DOMContentLoaded', function() {
            // Initial cart state
            const items = [
                { name: 'Wireless Headphones', price: 59.99, quantity: 1 },
                { name: 'Smart Watch', price: 89.99, quantity: 1 },
                { name: 'Phone Case', price: 19.99, quantity: 1 }
            ];
            
            let discountApplied = false;
            let currentDiscount = 0;
            let currentDiscountPercentage = 0;
            
            // DOM elements
            const quantityElements = document.querySelectorAll('.quantity');
            const minusButtons = document.querySelectorAll('.minus-btn');
            const plusButtons = document.querySelectorAll('.plus-btn');
            const removeButtons = document.querySelectorAll('.remove-btn');
            const subtotalElement = document.getElementById('subtotal');
            const totalElement = document.getElementById('total');
            const discountValueElement = document.getElementById('discount-value');
            const promoInput = document.getElementById('promo-code');
            const applyPromoButton = document.getElementById('apply-promo');
            const promoMessage = document.getElementById('promo-message');
            
            // Initialize cart
            updateCart();
            
            // Event listeners for quantity buttons
            minusButtons.forEach((button, index) => {
                button.addEventListener('click', () => {
                    if (items[index].quantity > 1) {
                        items[index].quantity--;
                        updateCart();
                    }
                });
            });
            
            plusButtons.forEach((button, index) => {
                button.addEventListener('click', () => {
                    items[index].quantity++;
                    updateCart();
                });
            });
            
            // Event listeners for remove buttons
            removeButtons.forEach((button, index) => {
                button.addEventListener('click', () => {
                    items.splice(index, 1);
                    updateCart();
                    // Rebind events after DOM update
                    setTimeout(bindEvents, 0);
                });
            });
            
            // Apply promo code
            applyPromoButton.addEventListener('click', applyPromoCode);
            
            // Allow pressing Enter to apply promo code
            promoInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    applyPromoCode();
                }
            });
            
            function bindEvents() {
                // Rebind events after removing items
                const newMinusButtons = document.querySelectorAll('.minus-btn');
                const newPlusButtons = document.querySelectorAll('.plus-btn');
                const newRemoveButtons = document.querySelectorAll('.remove-btn');
                
                newMinusButtons.forEach((button, index) => {
                    button.addEventListener('click', () => {
                        if (items[index].quantity > 1) {
                            items[index].quantity--;
                            updateCart();
                        }
                    });
                });
                
                newPlusButtons.forEach((button, index) => {
                    button.addEventListener('click', () => {
                        items[index].quantity++;
                        updateCart();
                    });
                });
                
                newRemoveButtons.forEach((button, index) => {
                    button.addEventListener('click', () => {
                        items.splice(index, 1);
                        updateCart();
                        // Rebind events after DOM update
                        setTimeout(bindEvents, 0);
                    });
                });
            }
            
            function updateCart() {
                // Update quantities in UI
                quantityElements.forEach((element, index) => {
                    if (items[index]) {
                        element.textContent = items[index].quantity;
                    }
                });
                
                // Calculate totals
                const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                const shipping = 10.00;
                
                // Apply discount if any
                let discount = 0;
                if (discountApplied) {
                    discount = subtotal * currentDiscountPercentage;
                }
                
                const total = subtotal + shipping - discount;
                
                // Update UI
                subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
                discountValueElement.textContent = `-$${discount.toFixed(2)}`;
                totalElement.textContent = `$${total.toFixed(2)}`;
                
                // Save current discount for reapplication after cart updates
                currentDiscount = discount;
            }
            
            function applyPromoCode() {
                const code = promoInput.value.trim();
                
                // Reset message
                promoMessage.textContent = '';
                promoMessage.className = '';
                
                if (discountApplied) {
                    promoMessage.textContent = 'A promo code has already been applied.';
                    promoMessage.className = 'error-message';
                    return;
                }
                
                if (code === 'ostad10') {
                    discountApplied = true;
                    currentDiscountPercentage = 0.1;
                    promoMessage.textContent = '10% discount applied successfully!';
                    promoMessage.className = 'success-message';
                    updateCart();
                } else if (code === 'ostad50') {
                    discountApplied = true;
                    currentDiscountPercentage = 0.5;
                    promoMessage.textContent = '50% discount applied successfully!';
                    promoMessage.className = 'success-message';
                    updateCart();
                } else {
                    promoMessage.textContent = 'Invalid Promo Code';
                    promoMessage.className = 'error-message';
                }
            }
        });