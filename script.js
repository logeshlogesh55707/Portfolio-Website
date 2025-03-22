$(document).ready(function() {

  // Sticky header
  $(window).scroll(function() {
    if ($(this).scrollTop() > 1) {
      $(".header-area").addClass("sticky");
    } else {
      $(".header-area").removeClass("sticky");
    }

    // Update the active section in the header
    updateActiveSection();
  });

  // Smooth scroll for navigation links with dynamic offset
  $(".header ul li a").click(function(e) {
    e.preventDefault();

    var target = $(this).attr("href");

    // If already on the active section, do nothing
    if ($(target).hasClass("active-section")) {
      return;
    }

    var offset = target === "#home" ? 0 : $(target).offset().top - 40;

    $("html, body").animate(
      {
        scrollTop: offset
      },
      500, // Adjust this value for smoother or faster scroll
      "easeInOutExpo" // Add an easing effect for smoother animation
    );

    $(".header ul li a").removeClass("active");
    $(this).addClass("active");
  });

  // Initial content reveal using ScrollReveal
  ScrollReveal({
    distance: "100px",
    duration: 2000,
    delay: 200,
    reset: true // Elements will animate each time they come into view
  });

  ScrollReveal().reveal(".header a, .profile-photo, .about-content, .education", {
    origin: "left",
    interval: 200 // Staggering the reveal for smoother animations
  });
  ScrollReveal().reveal(".header ul, .profile-text, .about-skills, .internship", {
    origin: "right",
    interval: 200
  });
  ScrollReveal().reveal(".project-title, .contact-title", {
    origin: "top"
  });
  ScrollReveal().reveal(".projects, .contact", {
    origin: "bottom"
  });

  // Animate profile photo hover with bounce effect
  $(".profile-photo img").hover(function() {
    $(this).addClass("animated bounce"); // Using bounce animation on hover
  }, function() {
    $(this).removeClass("animated bounce");
  });

  // Animate the contact form submission with fade out effect
  const scriptURL = 'https://docs.google.com/forms/d/e/1FAIpQLSdWQhZyjg6bxa-ZTX7f2E9J-bcFdYVxoU4qCELsnpAN7LsPng/viewform?usp=sf_link';
  const form = document.forms['submitToGoogleSheet'];
  const msg = document.getElementById("msg");

  form.addEventListener('submit', e => {
    e.preventDefault();
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
      .then(response => {
        msg.innerHTML = "Message sent successfully!";
        $(msg).fadeIn(); // Fade in the success message
        setTimeout(function() {
          $(msg).fadeOut(); // Fade out after 5 seconds
          form.reset();
        }, 5000);
      })
      .catch(error => console.error('Error!', error.message));
  });

  // Dynamically highlight the active section in the header
  function updateActiveSection() {
    var scrollPosition = $(window).scrollTop();

    // Checking if scroll position is at the top of the page
    if (scrollPosition === 0) {
      $(".header ul li a").removeClass("active");
      $(".header ul li a[href='#home']").addClass("active");
      return;
    }

    // Iterate through each section and update the active class in the header
    $("section").each(function() {
      var target = $(this).attr("id");
      var offset = $(this).offset().top;
      var height = $(this).outerHeight();

      if (
        scrollPosition >= offset - 40 &&
        scrollPosition < offset + height - 40
      ) {
        $(".header ul li a").removeClass("active");
        $(".header ul li a[href='#" + target + "']").addClass("active");
      }
    });
  }

  // Responsive navigation for mobile
  $(".menu_icon").click(function() {
    $(".header ul").slideToggle();
  });

  // Close navigation on mobile when a link is clicked
  $(".header ul li a").click(function() {
    if ($(window).width() < 768) {
      $(".header ul").slideUp();
    }
  });

  // Smooth scroll easing effect for navigation and link clicks
  jQuery.extend(jQuery.easing, {
    easeInOutExpo: function (x, t, b, c, d) {
      if (t == 0) return b;
      if (t == d) return b + c;
      if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
      return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    }
  });

});
