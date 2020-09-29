export const fetchTodo = (throwError: boolean = false): Promise<string> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (throwError) {
        return reject(new Error('Internet: afk, brb :((('))
      }
      return resolve('A todo ... from Internet :)))')
    }, 1000)
  })
