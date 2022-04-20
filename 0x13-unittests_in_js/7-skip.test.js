const { expect } = require('chai');

describe('Testing numbers', () => {
  it('10 is equal to 10', () => {
    expect(10 === 10).to.be.true;
  });

  it('31 is equal to 31', () => {
    expect(31 === 31).to.be.true;
  });

  it.skip('3 is equal to 6', () => {
    expect(3 === 6).to.be.true;
  });

  it('43 is equal to 43', () => {
    expect(43 === 43).to.be.true;
  });

  it('56 is equal to 56', () => {
    expect(56 === 56).to.be.true;
  });

  it('0 is equal to 0', () => {
    expect(0 === 0).to.be.true;
  });

  it('6 is equal to 6', () => {
    expect(6 === 6).to.be.true;
  });

  it('-1 is equal to -1', () => {
    expect(-1 === -1).to.be.true;
  });
});
