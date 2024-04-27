import $ from "jquery";
$(function () {
  debugger;
  ("use strict");

  (function () {
    $(".nav .list li").on("click", "a", function () {
      $(this).parent().addClass("active").siblings().removeClass("active");
    });
    var openCategories = $(".nav #open-categories"),
      categories = $(".drop-down");

    openCategories.on("click", function () {
      $("#" + $(this).data("dropdown")).toggleClass("show");

      $(window).on("mouseup", function (e) {
        if (
          categories.hasClass("show") &&
          !categories.is(e.target) &&
          categories.has(e.target).length === 0 &&
          !openCategories.is(e.target)
        ) {
          console.log("d");
          categories.removeClass("show");
        }
      });
    });

    $(".nav .toggle-nav").on("click", function () {
      $("#" + $(this).data("toggle")).slideToggle(300);
    });
  })();
});
