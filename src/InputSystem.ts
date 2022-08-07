import { Vector2 } from "three";

export class InputSystem {
	keyboard: Map<string, boolean>;
	axis: Vector2;

	constructor(w: Window) {
		this.keyboard = new Map<string, boolean>();
		this.axis = new Vector2(0, 0);

		w.addEventListener("keydown", this.keyDown.bind(this));
		w.addEventListener("keyup", this.keyUp.bind(this));
	}

	private keyDown(event: KeyboardEvent) {
		// console.log("[Input] Down: " + event.key);
		this.keyboard.set(event.key, true);
		switch (event.key) {
			case 'd': this.axis.x = 1;
				break;
			case 'a': this.axis.x = -1;
				break;
			case 'w': this.axis.y = 1;
				break;
			case 's': this.axis.y = -1;
				break;
		}
	}

	private keyUp(event: KeyboardEvent) {
		// console.log("[Input] Up: " + event.key);
		this.keyboard.set(event.key, false);

		switch (event.key) {
			case 'd': this.axis.x = this.axis.x > 0 ? 0 : this.axis.x;
				break;
			case 'a': this.axis.x = this.axis.x < 0 ? 0 : this.axis.x;
				break;
			case 'w': this.axis.y = this.axis.y > 0 ? 0 : this.axis.y;
				break;
			case 's': this.axis.y = this.axis.y < 0 ? 0 : this.axis.y;
				break;
		}
	}
};
