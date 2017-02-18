'use strict';

/**
 * single-layer [Perceptron Classifier](http://en.wikipedia.org/wiki/Perceptron)
 */
export default class Perceptron {
    constructor() {
        this._bias = 1;
        this._weights = [];
    }

    /**
     * predict result from input data.
     *
     * @param input - input value to predict [1, 1]
     * @returns {number}
     */
    predict(input) {
        if (!input) throw new Error('Missing parameter input.');

        let score = 0;
        this._weights.map((weight, i) => {
            score += weight * input[i];
        });

        return (score + this._bias) > 0 ? 1 : 0;
    }

    /**
     * train data to adjust weight for future prediction.
     *
     * @param data - Contain input - output values { in: [1, 1], out: 1 }
     */
    train(data) {
        if (!data.in) throw new Error('Missing parameter input.');

        this._weights = this._weights.length ? this._weights : data.in;

        const prediction = this.predict(data.in);

        /* adjust weight if it's wrong prediction */
        if (prediction !== data.out) {
            const gradient = data.out - prediction;
            this._weights = this._weights.map((weight, i) => {
                weight += gradient * data.in[i];
                return weight
            });
            this._bias += gradient;
        }

        return this;
    }
}