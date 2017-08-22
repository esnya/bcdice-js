describe('Opal', () => {
    it('keeps Function.prototype', () => {
        const prev = Object.keys(Function.prototype);

        require('../lib/opal');

        expect(Object.keys(Function.prototype)).toEqual(prev);
    });
});
