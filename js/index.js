//select elements
let navBar = $("nav.navbar"),
  upToHomeIcon = $("a.upToHome i"),
  myData = null,
  popup = $(".popup");

//progress
$(window).on("scroll", function () {
  let scrollTop = $(window).scrollTop();
  let MainHeight = $(document).height() - $(window).height();
  let progress = (scrollTop / MainHeight) * 100;
  $(".scroll-progress").css("width", progress + "%");
});

//dark mode
document.addEventListener("DOMContentLoaded", function () {
  let savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    $("body").addClass("dark-mode");
    $(".theme-btn").addClass("dark");
    $("#about").addClass("dark");
  }

  $(".theme-btn").on("click", function () {
    $(this).toggleClass("dark");
    $("body").toggleClass("dark-mode");
    $("#about").toggleClass("dark-mode");

    if ($("body").hasClass("dark-mode")) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  });
});

//navBar scrolled
$(window).on("scroll", function () {
  let startOfSection = $(window).scrollTop() + $(".navbar").outerHeight();

  //add scrolled class
  $("nav").toggleClass("scrolled", window.scrollY >= 10);

  //move active
  $(".nav-link").each(function () {
    let section = $($(this).attr("href"));

    if (section.offset().top <= startOfSection && section.offset().top + section.outerHeight() > startOfSection) {
      $(".nav-link.active").removeClass("active");
      $(this).addClass("active");
    }
  });
});

//up to home
toggleUpArrow();
document.addEventListener("scroll", toggleUpArrow);

//call getData function
getData();
getSectorsData();
getLangData();

//close popup
popup.click(closePopup);

//stop propagation
$(".box").on("click", function (e) {
  e.stopPropagation();
});

//search sector
$("#sectorSearch").on("input", function () {
  let value = $(this).val().toLowerCase();

  $("#sectorsPopup .row > div").each(function () {
    $(this).toggle($(this).text().toLowerCase().includes(value));
  });

  $(".no-results").toggle($("#sectorsPopup .row > div:visible").length === 0);
});

//search languages
$("#langSearch").on("input", function () {
  let value = $(this).val().toLowerCase();

  $("#langPopup li").each(function () {
    $(this).toggle($(this).text().toLowerCase().includes(value));
  });

  $(".lang-empty").toggle($("#langPopup li:visible").length === 0);
});

//link owlCarousel
$(".sectorsPart2 .owl-carousel").owlCarousel({
  loop: true,
  margin: 15,
  nav: false,
  dots: true,
  autoplay: true,
  autoplayTimeout: 2500,
  autoplaySpeed: 1000,
  smartSpeed: 1000,
  autoplayHoverPause: true,
  responsive: {
    0: {
      items: 2,
    },
    576: {
      items: 3,
    },
    768: {
      items: 4,
    },
    992: {
      items: 5,
    },
  },
});

window.addEventListener("DOMContentLoaded", function () {
  let loadingPage = document.querySelector(".loadingPage");
  loadingPage.classList.add("hide");

  setTimeout(function () {
    loadingPage.classList.add("d-none");
  }, 1000);
});
