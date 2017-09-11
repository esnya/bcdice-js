describe('Opal', () => {
    const func = Object.keys(Function.prototype);
    const b = Object.keys(Boolean.prototype);

    require('./opal');

    it('keeps Function.prototype', () => {
        expect(Object.keys(Function.prototype)).toEqual(func);
    });

    it('keeps Boolean.prototype', () => {
        expect(Object.keys(Boolean.prototype)).toEqual(b);
    });
});
