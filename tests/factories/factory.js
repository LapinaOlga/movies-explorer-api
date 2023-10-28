class Factory {
  // eslint-disable-next-line
  getDefinition() {
    throw new Error('Definition is undefined');
  }

  // eslint-disable-next-line
  getModel() {
    throw new Error('Factory model is undefined');
  }

  async createOne(data = {}) {
    const definition = await this.makeOne(data);
    const result = await this.getModel().create(definition);

    return result;
  }

  async makeOne(data = {}) {
    return { ...this.getDefinition(), ...data };
  }
}

module.exports.Factory = Factory;
