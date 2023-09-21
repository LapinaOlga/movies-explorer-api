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
    const definition = { ...this.getDefinition(), ...data };
    // const definitionKeys = Object.keys(definition);

    // const promises = [];
    //
    // for (let i = 0; i < definitionKeys.length; i += 1) {
    //   const definitionKey = definitionKeys[i];
    //   const definitionValue = definition[definitionKey];
    //
    //   if (typeof definitionValue === 'function') {
    //     promises.push(
    //       new Promise((resolve, reject) => {
    //         const result = definitionValue();
    //
    //         if (result instanceof Promise) {
    //           result
    //             .then((res) => {
    //               definition[definitionKey] = res;
    //               resolve(res);
    //             })
    //             .catch(reject);
    //         } else {
    //           definition[definitionKey] = result;
    //           resolve(result);
    //         }
    //       }),
    //     );
    //   }
    // }
    //
    // await Promise.all(promises);

    return definition;
  }
}

module.exports.Factory = Factory;
