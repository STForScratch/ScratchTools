class Feature {
  constructor(data) {
    var finalFeature = null;
    ScratchTools.Features.data.forEach(function (el) {
      if ((el.id || el.file) === data.id) {
        finalFeature = el;
      }
    });
    this.data = finalFeature;
    this.getLocale = function (string) {
      if (this.data.translations) {
        return this.data.localesData[string];
      } else {
        throw new Error("Feature does not have locales set up.");
      }
    };
    this.getActiveUserstyles = function () {
      var styles = document.head.querySelectorAll(
        `link[data-feature=${this.data.id || this.data.file}]`
      );
      var stylesData = [];
      styles.forEach(function (el) {
        stylesData.push({
          element: el,
          file: el.href.split(`/features/${data.id}`)[1],
          fullPath: el.href,
        });
      });
      return stylesData;
    };
    this.addEventListener = function (event, callback) {
      if (event === "disabled") {
        if (this.data.dynamic) {
          allDisableFunctions[this.data.id || this.data.file] = callback;
        } else {
          console.error(
            `'${
              this.data.id || this.data.file
            }' is not dynamic. The disable function will not be triggered.`
          );
        }
      } else if (event === "enabled") {
        if (this.data.dynamic) {
          allEnableFunctions[this.data.id || this.data.file] = callback;
        } else {
          console.error(
            `'${
              this.data.id || this.data.file
            }' is not dynamic. The enable function will not be triggered.`
          );
        }
      } else if (event === "settingChange") {
        allSettingChangeFunctions[this.data.id || this.data.file] = callback;
      } else if (event === "iceCream") {
        console.log("Yummy!");
      } else {
        console.error("ScratchTools feature event not found.");
      }
    };
    this.getSettings = function (key) {
      var settings = {};
      this.data.options?.forEach(function (el) {
        if (ScratchTools.Storage[el.id]) {
          settings[el.id] = ScratchTools.Storage[el.id];
        }
      });
      if (key) {
        return settings[key];
      } else {
        return settings;
      }
    };
    if (finalFeature.version !== 2) {
      console.warn(
        `'${finalFeature.file}' does not use Feature v2. It is recommended that you use the newest version.`
      );
    }
  }
}
