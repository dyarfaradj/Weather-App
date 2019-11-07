import { EventEmitter } from "events";

class WeatherAppStore extends EventEmitter {
  constructor() {
    super();
    this.weather = [
      {
        id: "3"
      },
      {
        id: "3"
      }
    ];
  }
}
