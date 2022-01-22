class Screen {
    #el;
    #bounds;
    constructor(elem, bounds) {
        this.#el = elem;
        const rect = elem.getBoundingClientRect();
        this.#bounds = {
            x: bounds.left - rect.width,
            y: bounds.top - rect.height,
        };
    }

    async start() {
        let pos = {
            x: this.getRandomInt(100, this.#bounds.x - 100),
            y: this.getRandomInt(100, this.#bounds.y - 100),
        }

        let delta = {
            x: 5,
            y: 5
            // x: this.getRandomInt(1, 10),
            // y: this.getRandomInt(1, 10)
        }

        while (1) {
            const coll = this.isColliding(pos)
            delta = this.getDelta(delta, coll)
            pos = await this.moveElement(pos, delta)
        }
    }

    getDelta(delta, coll) {
        const newDelta = {
            x: delta.x,
            y: delta.y
        }

        // hitting left side
        if (coll.x === -1) {
            newDelta.x = -newDelta.x
        } else if (coll.x === 1) {
            newDelta.x = -newDelta.x
        }

        // hitting top
        if (coll.y === -1) {
            newDelta.y = -newDelta.y
        } else if (coll.y === 1) {
            newDelta.y = -newDelta.y
        }

        return newDelta
    }

    isColliding(pos) {
        const coll = {
            x: 0,
            y: 0,
        }

        if (pos.x <= 0 + 10) {
            coll.x = -1
        } else if (pos.x >= this.#bounds.x - 10) {
            coll.x = 1
        }

        if (pos.y <= 0 + 10) {
            coll.y = -1
        } else if (pos.y >= this.#bounds.y - 10) {
            coll.y = 1
        }

        return coll
    }

    async moveElement(pos, delta) {
        const newPos = {
            x: pos.x + delta.x,
            y: pos.y + delta.y
        }

        const anim = this.#el.animate([
            {top: pos.y + 'px', left: pos.x + 'px'},
            {top: newPos.y + 'px', left: newPos.x + 'px'}
        ], {
            duration: 15,
            fill: 'forwards',
        });

        anim.play();

        await anim.finished
        return Promise.resolve(newPos)
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }
}