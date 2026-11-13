(function () {
  let nextId = 0;

  window.turnstile = {
    render: function (element, options) {
      const id = `local-${++nextId}`;
      element.setAttribute("data-turnstile", "local");
      if (options && typeof options.callback === "function") {
        window.setTimeout(function () {
          options.callback("local-development-token");
        }, 0);
      }
      return id;
    },
    reset: function () {},
    remove: function (id) {
      const element = document.querySelector('[data-turnstile="local"]');
      if (element) {
        element.removeAttribute("data-turnstile");
      }
    },
  };
})();
