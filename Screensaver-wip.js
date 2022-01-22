class Screensaver {
    #el;
    #bounds;
    #offset;
    #speed = .25;

    #anim;
    constructor(elem, bounds) {
        this.#el = elem;
        const rect = elem.getBoundingClientRect();
        this.#bounds = {
            top: bounds.top - rect.height,
            left: bounds.left - rect.width,
        };
        this.#offset = {
            top: rect.height,
            left: rect.width,
        }
    }

    async start() {
        let curr = this.seedScreen();
        this.#el.style.top = curr.top + 'px';
        this.#el.style.left = curr.left + 'px';
        this.#el.classList.remove('hidden');


        // const next = this.getNextPosition(curr, curr.angle);

        // await this.moveElement(curr, next);
        let angle = curr.angle;

        while (1) {
            const next = this.getNextPosition(curr, angle);
            await this.moveElement(curr, next);


            angle = this.getNextAngle(curr, next);
            curr = next;
            console.log(angle);
            console.log(curr);
        }

        // await this.moveElement({top: '0', left: '0'}, {top: '650', left: '650'})
        // console.log('all done');
    }

    seedScreen() {
        // return {
            // angle: this.getRandomInt(100, 170),
            // angle: this.getRandomInt(10, 80),
            // top: this.getRandomInt(0, this.#bounds.top),
            // left: this.getRandomInt(0, this.#bounds.left),
        // }
        // return {
        //     angle: 36,
        //     top: 449,
        //     left: 927,
        // }
        // return {
        //     // angle: 66.8 + 180,
        //     // angle: 23.2 + 90,
        //     angle: 260,
        //     top: 0,
        //     left: 1050,
        // }
        return {
            angle: 70,
            top: 450,
            left: 0,
        }
        // return {
        //     top: 260,
        //     left: 1050,
        //     angle: 290
        // }
        // return {
        //     angle: 260,
        //     top: 0,
        //     left: 1050,
        // }
        // return {
        //     angle: 290,
        //     top: 450,
        //     left: 1050,
        // }


    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }

    getNextPosition(pos, angle) {
        let newPos
        if (angle < 90 || angle > 270) {
            newPos = {
                top: 0,
                left: pos.left + this.calcLeft(pos.top, angle)
            }
        } else {
            newPos = {
                top: this.#bounds.top,
                left: pos.left - this.calcLeft(this.#bounds.top - pos.top, angle)
            }
        }

        if (newPos.left >= 0 && newPos.left <= this.#bounds.left) {
            return newPos;
        } else {
            // return newPos;
            const test = this.fitPositionToBounds(pos, newPos, angle);
            console.log(test);
            return test;
        }
    }

    getNextAngle(curr) {
        const next = 180 - curr

        return next

        // console.log(angle)
        // const next = angle + 90
        // if (angle < 90) {
        //     const diff = 90 - angle
        //     return 90 + diff
        // } else if (angle < 180) {
        //     const diff = 180 - angle
        //     return 40
        //     // console.log(diff)
        //     // return 180 + diff
        //     // return 270 - diff
        //     // return 350
        // }
        // if (angle < 90) {
        //     return angle + 90
        // } else if (angle < 180) {
        //     return angle + 90
        // } else if (angle < 270) {
        //     return angle + 90
        // } else {
        //     return angle - 180
        // }
        // if (angle < 90) {
        //     return angle - 90
        // } else if (angle < 180) {
        //     return angle + 180
        // } else if (angle < 270) {
        //     return angle
        // }

        return next
        // return next < 180 ? next + 90 : next - 90
    }

    fitPositionToBounds(currPos, newPos, angle) {
        console.log(newPos)
        let y;

        if (angle < 180) {
            y = this.#bounds.left - currPos.left;
        } else {
            y = currPos.left;
        }

        const ratio = y / Math.abs(currPos.left - newPos.left);

        if (angle < 90) {
            return {
                // top: Math.floor(Math.abs(currPos.top - newPos.top) * ratio + (this.#offset.top / 2)),
                top: Math.abs(currPos.top - newPos.top) * ratio,
                // top: newPos.top * ratio,
                left: this.#bounds.left,
            }
        } else if (angle < 180) {
            return {
                top: Math.floor(Math.abs(currPos.top - newPos.top) * ratio),
                left: this.#bounds.left,
            }
        } else if (angle < 270) {
            return {
                top: Math.floor(Math.abs(currPos.top - newPos.top) * ratio),
                left: 0
            }
        } else {
            return {
                top: Math.floor(Math.abs(currPos.top - newPos.top) * ratio + (this.#offset.top / 2)),
                left: 0
            }
        }
    }

    calcLeft(length, angle) {
        return Math.round(
            (Math.sin(this.toRadians(angle)) * length) / Math.sin(this.toRadians(90 - angle))
        )
    }

    toRadians (angle) {
        return angle * (Math.PI / 180);
    }

    moveElement(currPos, newPos) {
        const anim = this.#el.animate([
            {top: currPos.top + 'px', left: currPos.left + 'px'},
            {top: newPos.top + 'px', left: newPos.left + 'px'}
        ], {
            duration: 2000,
            fill: 'forwards',
        });

        anim.play();

        return anim.finished
    }
}
