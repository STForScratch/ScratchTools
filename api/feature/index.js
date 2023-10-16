import { default as self } from "./self.js";
import { default as traps } from "./traps.js";
import { default as auth } from "./auth.js";

export default function (data) {
  var feature = new Feature(data);
  feature.self = self(data.id);
  feature.traps = traps()
  feature.auth = auth()
  return feature;
}
