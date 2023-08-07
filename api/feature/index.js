import { default as self } from "./self.js";
import { default as traps } from "./traps.js";

export default function (data) {
  var feature = new Feature(data);
  feature.self = self(data.id);
  feature.traps = traps()
  return feature;
}
