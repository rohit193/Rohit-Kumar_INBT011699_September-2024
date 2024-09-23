// script.js
document.querySelectorAll('.product-card button').forEach(button => {
    button.addEventListener('click', () => {
        alert('Product added to cart!');
        // Add logic to update cart array or display
    });
});
$(document).ready(function(){
    $(".owl-carousel").owlCarousel({
      loop: true,
      margin: 10,
      nav: false,
      items: 1,
      autoplay: true,          
      autoplayTimeout: 3000,   
      autoplayHoverPause: true 
    });
  });

