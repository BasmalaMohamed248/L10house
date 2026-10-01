//up to home
function toggleUpArrow() {
  if (window.scrollY > 100) {
    upToHomeIcon.removeClass("scrolled");
  } else {
    upToHomeIcon.addClass("scrolled");
  }
}

//get data in services
async function getData() {
  let myResponse = await fetch(`https://semicode.tech/api/v1/l10nhouse/services`);
  myData = await myResponse.json(); //await means don't go to the next line before this line happen

  console.log(myData);

  showData(myData); //show data in services

  styleL10NHouse(); //change all L10N House to green and orange color
}

//showData in services
function showData(data) {
  let dataRow = $("#services .row.insertInIt");
  dataRow.html("");

  data.forEach((service, i) => {
    let animClass = i % 2 === 0 ? "animate__fadeInLeft" : "animate__fadeInRight";

    dataRow.append(`
      <div class="col-lg-6 mb-4 wow animate__animated ${animClass}" data-wow-duration="1.5s" data-wow-delay="${i * 0.4}s">
        <div class="item">
          <div class="box px-3 py-4 m-3 ">
            <img src="./images/${service.icon}" alt="" class="img-fluid" />
            <h3 class="my-4">${service.title}</h3>
            <p>${service.description.slice(0, 150)}...<span class="greenColor fw-bold more" onclick="showService(${i})">Read More</span></p>
          </div>
        </div>
      </div>
    `);
  });

  new WOW({ animateClass: "animate__animated" }).init();
}

//change all L10N House to green,orange
function styleL10NHouse() {
  let l10HouseEle = $("*:contains('L10N House')");

  l10HouseEle
    .filter(function () {
      return $(this).children(":contains('L10N House')").length === 0;
    })

    //each such as forLoop
    .each(function () {
      $(this).html($(this).html().replaceAll("L10N House", `<span class="greenColor fw-bold">L10N</span> <span class="orangeColor fw-bold">House</span>`));
    });
}

//open popup
function openPopup(popupName) {
  $(`.popup[data-popup-name='${popupName}']`).fadeIn(1000, function () {
    if (popupName == "lang") {
      $(this).find(".box").addClass("show");
    }
  });
  $("body").css("overflow", "hidden");
}

//close popup

function closePopup() {
  $("body").css("overflow", "auto");
  $(".popup .box").removeClass("show");

  let popupLang = $(".popup[data-popup-name='lang']");

  if (popupLang.is(":visible")) {
    // the language popup wait for the box to slide out
    setTimeout(() => popupLang.fadeOut(1000), 500);
  } else {
    // the other popups close without delay
    $(".popup").fadeOut(1000);
  }
}

//show service
function showService(serviceIndex) {
  let service = myData[serviceIndex];
  let sectionsHtml = "";

  if (service.sections && service.sections.length > 0) {
    service.sections.forEach((section) => {
      if (!section || !section.points) return;

      let lis = "";
      section.points.forEach((point) => {
        lis += `<li>${point}</li>`;
      });

      sectionsHtml += `
        <section class="first mt-5">
          <h4 class="mb-3 fw-bold">${section.title}</h4>
          <ol>${lis}</ol>
        </section>
      `;
    });
  }

  $(`.popup[data-popup-name='service'] .box .body`).html(`
    <h3 class="mb-5">${service.title}</h3>
    <div class="row mt-5">
      <div class="col-lg-6">
        <div class="item">
          <p>${service.description}</p>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="item photoItem">
          <img src="images/${service.img}" class="img-fluid rounded-4" />
        </div>
      </div>
    </div>
    ${sectionsHtml}
  `);

  styleL10NHouse(`.popup[data-popup-name='service'] .box .body`);
  openPopup("service");
}

// function of openVideo popup
function openVideo() {
  let youtubeIcon = $("#services .part2 i");
  let popupVideo = $("#services .part2 .popup");

  youtubeIcon.click(function () {
    popupVideo.css("display", "flex").hide().fadeIn(500);
  });
}
openVideo();

function closeVideo() {
  let popupVideo = $("#services .part2 .popup");

  popupVideo.click(function () {
    popupVideo.fadeOut(500);
  });
}
closeVideo();

//get data in sectors
async function getSectorsData() {
  let myResponse = await fetch(`https://semicode.tech/api/v1/l10nhouse/sectors`);
  sectorData = await myResponse.json(); //(await)dont go to the next line before that line happen

  console.log(sectorData);

  showSectorsData(sectorData);

  styleL10NHouse();
}

function showSectorsData(data) {
  let dataRow = $("#sectorsPopup .row.insertInIt");

  data.forEach((sector) => {
    dataRow.append(`
      <div class="col-md-3 mb-4">
        <div class="item">
          <div class="part p-4 py-2">
            <img src="./images/sec/${sector.icon}" class="img-fluid" />
            <p>${sector.name}</p>
          </div>
        </div>
      </div>
    `);
  });
}

//get lang data
async function getLangData() {
  let myResponse = await fetch(`https://semicode.tech/api/v1/l10nhouse/languages`);
  langData = await myResponse.json();

  console.log(langData);

  showLangData(langData);

  styleL10NHouse();
}

//show lang data
function showLangData(data) {
  let dataRow = $("#langPopup .body");
  dataRow.html("");

  //loop on all data
  data.forEach((lang) => {
    let lis = "";
    lang.languages.forEach((L) => {
      //loop on lis
      lis += `<li><i class="fa-regular fa-circle-dot"></i>${L}</li>`;
    });

    dataRow.append(`
      <section>
        <h2>${lang.continent}</h2>
        <ul class="list-unstyled">${lis}</ul>
      </section>
    `);
  });
}
